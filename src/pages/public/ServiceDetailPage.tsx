import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { SEO } from '@/components/SEO';
import { Reveal } from '@/components/animations/Reveal';
import { usePublishedServices } from '@/hooks/usePublicData';

const fallbackServices: Record<string, {
  title: string;
  category: string;
  description: string;
  capabilities: string[];
  intro: string;
}> = {
  healthcare: {
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
    intro:
      'Healthcare organizations operate in a space where precision, compliance and efficiency are not optional. We build the digital systems that make that possible — from patient workflow automation to reporting dashboards that give leadership real visibility into operations.',
  },
  startups: {
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
    intro:
      'Most startups fail not because the idea is wrong, but because the product and technology foundation is weak. We help founders get from idea to a focused, scalable product — with the right architecture, the right priorities, and the discipline to ship.',
  },
  technology: {
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
    intro:
      'Off-the-shelf software rarely fits the way your organization actually works. We build custom digital platforms — web applications, internal tools, admin systems, APIs — engineered around your specific workflows, constraints and goals.',
  },
};

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { services, loading } = usePublishedServices();

  const dbService = services.find((s) => s.slug === slug);
  const fallback = fallbackServices[slug || ''];

  if (!loading && !dbService && !fallback) {
    return <Navigate to="/services" replace />;
  }

  const service = dbService || fallback;
  const seoTitle = `${service.title} | HackBase`;
  const seoDesc = service.description || '';

  return (
    <PublicLayout>
      <SEO title={seoTitle} description={seoDesc} canonicalPath={`/services/${slug}`} ogType="article" />

      {/* Hero */}
      <section style={{ padding: '120px 0 60px' }}>
        <div className="container">
          <Reveal>
            <Link
              to="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8125rem',
                color: 'var(--text-muted)',
                marginBottom: '32px',
                transition: 'color 200ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <ArrowLeft size={14} />
              All Services
            </Link>
            <p className="eyebrow" style={{ marginBottom: '20px' }}>
              {service.category}
            </p>
            <h1 className="editorial-h1" style={{ marginBottom: '28px', maxWidth: '800px' }}>
              {service.title}
            </h1>
            <p className="body-lg" style={{ maxWidth: '560px' }}>
              {service.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section style={{ paddingBottom: '80px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
            }}
            className="service-detail-grid"
          >
            <Reveal>
              <div>
                <p className="eyebrow" style={{ marginBottom: '24px' }}>
                  Approach
                </p>
                <p className="body-lg" style={{ marginBottom: '20px' }}>
                  {fallback?.intro || service.description}
                </p>
                <p className="body-md">
                  Every engagement starts with understanding the problem — not prescribing a solution.
                  From there, we design the right system and build it with the quality and
                  scalability your organization needs.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <p className="eyebrow" style={{ marginBottom: '24px' }}>
                  Capabilities
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {(service.capabilities || []).map((cap, i) => (
                    <div
                      key={cap}
                      style={{
                        padding: '16px 0',
                        borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                        borderBottom: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{cap}</span>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .service-detail-grid {
                grid-template-columns: 1fr !important;
                gap: 40px;
              }
            }
          `}</style>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 className="editorial-h2" style={{ marginBottom: '28px' }}>
              Have a problem in this space?
            </h2>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '14px 32px' }}>
              Start a Conversation
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </PublicLayout>
  );
}
