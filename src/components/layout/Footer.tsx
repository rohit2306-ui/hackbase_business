import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-alt)', paddingTop: 'var(--sp-8)', paddingBottom: 'var(--sp-6)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 'var(--sp-6)',
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Link
              to="/"
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: 'var(--text-primary)',
              }}
            >
              {siteConfig.brandName}
            </Link>
            <p
              style={{
                marginTop: '16px',
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                maxWidth: '300px',
                lineHeight: 1.6,
              }}
            >
              Strategy, technology and execution for organizations solving meaningful problems.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="eyebrow" style={{ marginBottom: '16px' }}>
              Services
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/services/healthcare" className="footer-link">
                  Healthcare
                </Link>
              </li>
              <li>
                <Link to="/services/startups" className="footer-link">
                  Startups
                </Link>
              </li>
              <li>
                <Link to="/services/technology" className="footer-link">
                  Technology
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="eyebrow" style={{ marginBottom: '16px' }}>
              Company
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/work" className="footer-link">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="eyebrow" style={{ marginBottom: '16px' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={`mailto:${siteConfig.businessEmail}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                }}
                className="footer-link"
              >
                <Mail size={14} />
                {siteConfig.businessEmail}
              </a>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <MapPin size={14} />
                India
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          className="footer-bottom"
        >
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        .footer-link {
          font-size: 0.875rem;
          color: var(--text-secondary);
          transition: color 200ms;
        }
        .footer-link:hover {
          color: var(--text-primary);
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
