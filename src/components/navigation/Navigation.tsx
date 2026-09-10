import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useScrolled } from '@/components/animations/Reveal';

const navLinks = [
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/work' },
  { label: 'Approach', path: '/#approach' },
  { label: 'About', path: '/about' },
];

export function Navigation() {
  const scrolled = useScrolled(20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 'var(--nav-height)',
          background: scrolled ? 'rgba(8, 9, 11, 0.85)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <nav
          className="container"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}
          aria-label="Main navigation"
        >
          <Link
            to="/"
            aria-label="HackBase home"
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            {siteConfig.logoUrl ? (
              <img src={siteConfig.logoUrl} alt="HackBase" style={{ height: '28px' }} />
            ) : (
              <span
                style={{
                  fontSize: '1.0625rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'var(--text-primary)',
                }}
              >
                {siteConfig.brandName}
              </span>
            )}
          </Link>

          <div
            className="nav-desktop"
            style={{ display: 'flex', alignItems: 'center', gap: '36px' }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="nav-link"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: 'var(--text-secondary)',
                  transition: 'color 200ms',
                  position: 'relative',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="btn btn-primary" style={{ padding: '8px 18px' }}>
              Start a Conversation
              <ArrowRight size={15} />
            </Link>
          </div>

          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            style={{
              display: 'none',
              padding: '8px',
              color: 'var(--text-primary)',
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'var(--bg)',
              paddingTop: 'var(--nav-height)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--text-primary)' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Link to="/contact" className="btn btn-primary" style={{ marginTop: '16px' }}>
                  Start a Conversation
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
}
