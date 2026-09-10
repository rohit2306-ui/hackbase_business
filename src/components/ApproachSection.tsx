import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const stages = [
  { num: '01', title: 'Understand', desc: 'We start with the problem, not the technology.' },
  { num: '02', title: 'Strategize', desc: 'Define the right product, workflow and technology approach.' },
  { num: '03', title: 'Design', desc: 'Translate complexity into intuitive systems.' },
  { num: '04', title: 'Build', desc: 'Engineer the product with quality and scalability in mind.' },
  { num: '05', title: 'Deploy', desc: 'Take the system from prototype to production.' },
  { num: '06', title: 'Scale', desc: 'Improve based on real-world usage.' },
];

export function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (val) => {
      const idx = Math.min(Math.floor(val * stages.length), stages.length - 1);
      setActiveStage(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={sectionRef} id="approach" className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div style={{ marginBottom: '64px' }}>
          <p className="eyebrow" style={{ marginBottom: '16px' }}>
            Approach
          </p>
          <h2 className="editorial-h2" style={{ maxWidth: '700px' }}>
            From ambiguity to execution.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start',
          }}
          className="approach-grid"
        >
          {/* Progress rail */}
          <div style={{ position: 'relative', paddingTop: '12px' }}>
            <div
              style={{
                position: 'absolute',
                left: '15px',
                top: '12px',
                bottom: '12px',
                width: '1px',
                background: 'var(--border)',
              }}
            />
            <motion.div
              style={{
                position: 'absolute',
                left: '15px',
                top: '12px',
                width: '1px',
                height: lineHeight,
                background: 'var(--accent)',
                transformOrigin: 'top',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {stages.map((stage, i) => (
                <div
                  key={stage.num}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '24px',
                    transition: 'opacity 400ms',
                    opacity: i <= activeStage ? 1 : 0.3,
                  }}
                >
                  <div
                    style={{
                      width: '31px',
                      height: '31px',
                      borderRadius: '50%',
                      border: `1px solid ${i <= activeStage ? 'var(--accent)' : 'var(--border)'}`,
                      background: i === activeStage ? 'var(--accent)' : 'var(--bg-alt)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      zIndex: 1,
                      transition: 'all 300ms',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        color: i === activeStage ? 'white' : 'var(--text-muted)',
                      }}
                    >
                      {stage.num}
                    </span>
                  </div>
                  <div style={{ paddingTop: '4px' }}>
                    <h3
                      style={{
                        fontSize: '1.125rem',
                        fontWeight: 500,
                        color: i === activeStage ? 'var(--text-primary)' : 'var(--text-secondary)',
                        marginBottom: '6px',
                        transition: 'color 300ms',
                      }}
                    >
                      {stage.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.5,
                      }}
                    >
                      {stage.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active stage display */}
          <div
            style={{
              position: 'sticky',
              top: '120px',
              padding: '48px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              minHeight: '300px',
            }}
            className="approach-detail"
          >
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p
                style={{
                  fontSize: '4rem',
                  fontWeight: 200,
                  color: 'var(--accent)',
                  lineHeight: 1,
                  marginBottom: '24px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {stages[activeStage].num}
              </p>
              <h3
                style={{
                  fontSize: '2rem',
                  fontWeight: 400,
                  marginBottom: '16px',
                  color: 'var(--text-primary)',
                }}
              >
                {stages[activeStage].title}
              </h3>
              <p
                style={{
                  fontSize: '1.0625rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '32px',
                }}
              >
                {stages[activeStage].desc}
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                }}
              >
                {stages.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === activeStage ? '24px' : '8px',
                      height: '3px',
                      borderRadius: '2px',
                      background: i === activeStage ? 'var(--accent)' : 'var(--border)',
                      transition: 'all 300ms',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .approach-grid {
            grid-template-columns: 1fr !important;
            gap: 40px;
          }
          .approach-detail {
            position: static !important;
            padding: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
