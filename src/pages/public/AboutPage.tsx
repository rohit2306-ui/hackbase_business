import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { SEO } from '@/components/SEO';
import { Reveal } from '@/components/animations/Reveal';
import { siteConfig } from '@/config/site';
import { ApproachSection } from '@/components/ApproachSection';

export function AboutPage() {
  return (
    <PublicLayout>
      <SEO
        title="About — HackBase"
        description="HackBase is a healthcare consulting and technology company founded by Rohit Thakur. Strategy, product thinking and engineering for ambitious organizations."
        canonicalPath="/about"
      />

      {/* Intro */}
      <section style={{ padding: '120px 0 60px' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: '20px' }}>
              About
            </p>
            <h1 className="editorial-h1" style={{ marginBottom: '28px', maxWidth: '900px' }}>
              We build the systems behind ambitious healthcare companies and startups.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Statement */}
      <section style={{ paddingBottom: '80px' }}>
        <div className="container">
          <div style={{ maxWidth: '680px' }}>
            <Reveal>
              <p className="body-lg" style={{ fontSize: '1.25rem', lineHeight: 1.55, color: 'var(--text-primary)', fontWeight: 300, marginBottom: '24px' }}>
                HackBase exists because complex business problems deserve more than a development team.
              </p>
              <p className="body-md" style={{ marginBottom: '20px' }}>
                Most consulting firms stop at strategy. Most agencies stop at code. We do the
                thinking, the product work, and the engineering — because real problems require all
                three.
              </p>
              <p className="body-md" style={{ marginBottom: '20px' }}>
                We work with healthcare organizations that need to digitize operations, startups that
                need to turn ideas into products, and growing companies that need technology that
                actually fits the way they work.
              </p>
              <p className="body-md">
                The result is not a deck or a deliverable. It is a working system that your
                organization can operate from day one.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-alt)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.5fr',
              gap: '80px',
              alignItems: 'center',
            }}
            className="about-founder-grid"
          >
            <Reveal>
              <div
                style={{
                  aspectRatio: '4 / 5',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                {siteConfig.founderImageUrl ? (
                  <img
                    src={siteConfig.founderImageUrl}
                    alt={siteConfig.founderName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-elevated) 100%)',
                    }}
                  >
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      Founder portrait
                    </span>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <p className="eyebrow" style={{ marginBottom: '20px' }}>
                  Founder
                </p>
                <h2 className="editorial-h2" style={{ marginBottom: '24px' }}>
                  Building at the intersection of technology, business and execution.
                </h2>
                <p className="body-lg" style={{ marginBottom: '20px' }}>
                  {siteConfig.founderName} founded HackBase with a simple belief: that the most
                  meaningful problems in healthcare and startups require more than just code — they
                  require strategy, product thinking, and disciplined execution.
                </p>
                <p className="body-md" style={{ marginBottom: '20px' }}>
                  The approach is straightforward: understand the problem deeply, design the right
                  system, and build it well. No unnecessary complexity, no theoretical frameworks
                  that never ship — just clear thinking and quality engineering.
                </p>
                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {siteConfig.founderName}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Founder, {siteConfig.brandName}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .about-founder-grid {
                grid-template-columns: 1fr !important;
                gap: 40px;
              }
            }
          `}</style>
        </div>
      </section>

      {/* Approach */}
      <ApproachSection />

      {/* CTA */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 className="editorial-h2" style={{ marginBottom: '28px' }}>
              Let's talk about what you're building.
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
