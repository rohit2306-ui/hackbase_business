import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
}

const nodes: Node[] = [
  { id: 'strategy', label: 'Strategy', x: 15, y: 25, baseX: 15, baseY: 25 },
  { id: 'product', label: 'Product', x: 45, y: 15, baseX: 45, baseY: 15 },
  { id: 'technology', label: 'Technology', x: 75, y: 28, baseX: 75, baseY: 28 },
  { id: 'data', label: 'Data', x: 28, y: 55, baseX: 28, baseY: 55 },
  { id: 'operations', label: 'Operations', x: 60, y: 50, baseX: 60, baseY: 50 },
  { id: 'outcomes', label: 'Outcomes', x: 85, y: 72, baseX: 85, baseY: 72 },
];

const connections: [string, string][] = [
  ['strategy', 'product'],
  ['product', 'technology'],
  ['strategy', 'data'],
  ['product', 'data'],
  ['technology', 'operations'],
  ['data', 'operations'],
  ['operations', 'outcomes'],
  ['technology', 'outcomes'],
];

export function HeroVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let raf: number;
    const animate = () => {
      setTick((t) => t + 1);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getNodePos = (node: Node, index: number) => {
    const t = tick * 0.008;
    const wobbleX = Math.sin(t + index * 1.3) * 1.5;
    const wobbleY = Math.cos(t + index * 0.9) * 1.2;

    const mouseInfluenceX = (mousePos.x - 0.5) * 4;
    const mouseInfluenceY = (mousePos.y - 0.5) * 3;
    const distFactor = 1 / (1 + index * 0.3);

    return {
      x: node.baseX + wobbleX + mouseInfluenceX * distFactor,
      y: node.baseY + wobbleY + mouseInfluenceY * distFactor,
    };
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '400px',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Grid background */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="grid" width="6.66" height="6.66" patternUnits="userSpaceOnUse">
            <path d="M 6.66 0 L 0 0 0 6.66" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.08" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>

      {/* Connection lines */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {connections.map(([from, to], i) => {
          const fromNode = nodes.find((n) => n.id === from)!;
          const toNode = nodes.find((n) => n.id === to)!;
          const fromIdx = nodes.indexOf(fromNode);
          const toIdx = nodes.indexOf(toNode);
          const fromPos = getNodePos(fromNode, fromIdx);
          const toPos = getNodePos(toNode, toIdx);

          return (
            <g key={`conn-${i}`}>
              <line
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke="rgba(59, 111, 224, 0.25)"
                strokeWidth="0.15"
              />
              <motion.circle
                r="0.4"
                fill="var(--accent)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  cx: [fromPos.x, toPos.x],
                  cy: [fromPos.y, toPos.y],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const pos = getNodePos(node, i);
        return (
          <div
            key={node.id}
            style={{
              position: 'absolute',
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: 'rgba(16, 18, 22, 0.9)',
              border: '1px solid var(--border)',
              borderRadius: '3px',
              backdropFilter: 'blur(8px)',
              whiteSpace: 'nowrap',
              transition: 'border-color 250ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent)',
                opacity: 0.8,
              }}
            />
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
              }}
            >
              {node.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
