import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { SEO } from '@/components/SEO';
import { Reveal } from '@/components/animations/Reveal';
import { usePublishedServices } from '@/hooks/usePublicData';

const fallbackServices = [
  {
    slug: 'healthcare',
    title: 'Technology for better healthcare operations.',
    category: 'Healthcare',
    description:
      'We design and build digital systems that simplify workflows, improve visibility and help healthcare organizations operate with greater precision.',
    capabilities: [
      'Healthcare Technology Consulting',
      'Digital Transformation',
      'Patient Workflow Systems',
      'Healthcare Dashboards',
      'Data & Reporting',
      'Custom Healthcare Software',
    ],
  },
  {
    slug: 'startups',
    title: 'From idea to scalable product.',
    category: 'Startups',
    description:
      'We help founders turn ambiguous ideas into focused products, strong technology foundations and execution-ready systems.',
    capabilities: [
      'Product Strategy',
      'MVP Development',
      'Product Architecture',
      'Technology Consulting',
      'Automation',
      'Product Engineering',
    ],
  },
  {
    slug: 'technology',
    title: 'Engineering built around your business.',
    category: 'Technology',
    description:
      'Custom digital platforms and business systems designed around the way your organization actually works.',
    capabilities: [
      'Web Applications',
      'Internal Tools',
      'Admin Platforms',
      'CRM Systems',
      'SaaS Products',
      'APIs & Backend Systems',
      'Cloud Infrastructure',
    ],
  },
];

export function ServicesPage() {
  const { services, loading } = usePublishedServices();

  const displayServices = loading
    ? fallbackServices
    : services.length > 0
      ? services
      : fallbackServices;

  return (
    <PublicLayout>
      <SEO
        title="Services — Healthcare, Startups & Technology | HackBase"
        description="Healthcare technology consulting, startup product development, and custom software engineering. Three disciplines, one operating model."
        canonicalPath="/services"
      />

      <section style={{ padding: '120px 0 80px' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: '20px' }}>
              Services
            </p>
            <h1 className="editorial-h1" style={{ marginBottom: '28px', maxWidth: '800px' }}>
              What we build, and who we build it for.
            </h1>
            <p className="body-lg" style={{ maxWidth: '560px' }}>
              Three connected disciplines — strategy, product, and engineering — applied to the
              problems that healthcare organizations and ambitious founders actually face.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: '80px' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {displayServices.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.08}>
                <Link
                  to={`/services/${service.slug}`}
                  style={{ display: 'block' }}
                  className="service-row"
                >
                  <div
                    style={{
                      padding: '48px 0',
                      borderTop: '1px solid var(--border)',
                      borderBottom: '1px solid var(--border)',
                      display: 'grid',
                      gridTemplateColumns: '120px 1fr 1fr 40px',
                      gap: '40px',
                      alignItems: 'start',
                      transition: 'padding 300ms',
                    }}
                    className="service-row-inner"
                  >
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        0{i + 1}
                      </span>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                        {service.category}
                      </p>
                    </div>

                    <div>
                      <h2
                        style={{
                          fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
                          fontWeight: 400,
                          lineHeight: 1.25,
                          color: 'var(--text-primary)',
                          marginBottom: '16px',
                          transition: 'color 250ms',
                        }}
                        className="service-row-title"
                      >
                        {service.title}
                      </h2>
                      <p className="body-md" style={{ maxWidth: '420px' }}>
                        {service.description}
                      </p>
                    </div>

                    <div>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {(service.capabilities || []).map((cap) => (
                          <li
                            key={cap}
                            style={{
                              fontSize: '0.8125rem',
                              color: 'var(--text-secondary)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-muted)', flexShrink: 0 }} />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '4px' }}>
                      <ArrowRight
                        size={20}
                        style={{ color: 'var(--text-muted)', transition: 'color 250ms, transform 250ms' }}
                        className="service-row-arrow"
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <style>{`
            .service-row:hover .service-row-inner {
              padding-left: 24px;
              padding-right: 24px;
              background: var(--surface);
            }
            .service-row:hover .service-row-title {
              color: var(--accent-hover);
            }
            .service-row:hover .service-row-arrow {
              color: var(--accent) !important;
              transform: translateX(4px);
            }
            @media (max-width: 900px) {
              .service-row-inner {
                grid-template-columns: 1fr !important;
                gap: 20px;
              }
            }
          `}</style>
        </div>
      </section>
    </PublicLayout>
  );
}
