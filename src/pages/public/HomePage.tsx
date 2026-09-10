import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { SEO } from '@/components/SEO';
import { Reveal } from '@/components/animations/Reveal';
import { HeroVisualization } from '@/components/animations/HeroVisualization';
import { ApproachSection } from '@/components/ApproachSection';
import { usePublishedProjects, usePublishedServices, usePublishedTestimonials } from '@/hooks/usePublicData';
import { siteConfig } from '@/config/site';

const servicePillars = [
  {
    slug: 'healthcare',
    title: 'Technology for better healthcare operations.',
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

const industries = [
  'Healthcare',
  'HealthTech',
  'Healthcare Operations',
  'Startups',
  'Technology',
  'Digital Businesses',
];

export function HomePage() {
  const { projects, loading: projectsLoading } = usePublishedProjects();
  const { testimonials } = usePublishedTestimonials();

  const featuredProjects = projects.slice(0, 4);

  return (
    <PublicLayout>
      <SEO
        title="HackBase — Strategy, Technology & Execution for Healthcare Companies and Startups"
        description="We build the systems behind ambitious healthcare companies and startups. Strategy, product thinking and engineering for complex business challenges."
        canonicalPath="/"
      />

      {/* ===== HERO ===== */}
      <section
        style={{
          minHeight: 'calc(100vh - var(--nav-height))',
          display: 'flex',
          alignItems: 'center',
          padding: '80px 0 60px',
          position: 'relative',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.3fr 1fr',
              gap: '60px',
              alignItems: 'center',
            }}
            className="hero-grid"
          >
            {/* Left: Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}
              >
                {['Healthcare', 'Startups', 'Technology'].map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="editorial-h1"
                style={{ marginBottom: '28px' }}
              >
                We build the systems behind ambitious healthcare companies and startups.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="body-lg"
                style={{ maxWidth: '520px', marginBottom: '40px' }}
              >
                {siteConfig.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}
              >
                <Link to="/contact" className="btn btn-primary">
                  Start a Conversation
                  <ArrowRight size={15} />
                </Link>
                <Link to="/work" className="btn-link">
                  View Selected Work
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </div>

            {/* Right: Visualization */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                position: 'relative',
                aspectRatio: '1 / 1',
                minHeight: '400px',
                background: 'linear-gradient(180deg, var(--bg-alt) 0%, transparent 100%)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
              className="hero-viz"
            >
              <HeroVisualization />
            </motion.div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
              gap: 40px;
            }
            .hero-viz {
              min-height: 300px !important;
              max-height: 350px;
            }
          }
        `}</style>
      </section>

      {/* ===== POSITIONING ===== */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <Reveal>
            <h2 className="editorial-h2" style={{ maxWidth: '850px', marginBottom: '80px' }}>
              Complex problems deserve more than a development team.
            </h2>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
            }}
            className="positioning-grid"
          >
            <Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {['Business', 'Product', 'Technology', 'Execution'].map((item, i) => (
                  <div
                    key={item}
                    style={{
                      padding: '24px 0',
                      borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                      borderBottom: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-primary)' }}>
                      {item}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      0{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{ paddingTop: '24px' }}>
                <p className="body-lg" style={{ marginBottom: '24px' }}>
                  HackBase works at the intersection of business strategy, product thinking and
                  technology execution.
                </p>
                <p className="body-md" style={{ marginBottom: '24px' }}>
                  Most consulting firms stop at strategy. Most agencies stop at code. We do the
                  thinking, the product work, and the engineering — because real problems require all
                  three.
                </p>
                <p className="body-md">
                  The result is not a deck or a deliverable. It is a working system that your
                  organization can operate from day one.
                </p>
              </div>
            </Reveal>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .positioning-grid {
                grid-template-columns: 1fr !important;
                gap: 40px;
              }
            }
          `}</style>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <Reveal>
            <div style={{ marginBottom: '64px' }}>
              <p className="eyebrow" style={{ marginBottom: '16px' }}>
                What we build
              </p>
              <h2 className="editorial-h2">Three disciplines. One operating model.</h2>
            </div>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {servicePillars.map((pillar, i) => (
              <Reveal key={pillar.slug} delay={i * 0.1}>
                <Link
                  to={`/services/${pillar.slug}`}
                  style={{ display: 'block', background: 'var(--bg-alt)' }}
                  className="service-pillar"
                >
                  <div
                    style={{
                      padding: '48px 0',
                      display: 'grid',
                      gridTemplateColumns: '200px 1fr 1fr',
                      gap: '40px',
                      alignItems: 'start',
                      transition: 'padding 300ms',
                    }}
                    className="service-pillar-inner"
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        0{i + 1}
                      </span>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)',
                          marginTop: '8px',
                          textTransform: 'capitalize',
                        }}
                      >
                        {pillar.slug}
                      </p>
                    </div>

                    <div>
                      <h3
                        style={{
                          fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                          fontWeight: 400,
                          lineHeight: 1.25,
                          color: 'var(--text-primary)',
                          marginBottom: '16px',
                          transition: 'color 250ms',
                        }}
                        className="service-pillar-title"
                      >
                        {pillar.title}
                      </h3>
                      <p className="body-md" style={{ maxWidth: '420px' }}>
                        {pillar.description}
                      </p>
                    </div>

                    <div>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {pillar.capabilities.map((cap) => (
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
                            <span
                              style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: 'var(--text-muted)',
                                flexShrink: 0,
                              }}
                            />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <style>{`
            .service-pillar:hover .service-pillar-inner {
              padding-left: 24px;
              padding-right: 24px;
              background: var(--surface);
            }
            .service-pillar:hover .service-pillar-title {
              color: var(--accent-hover);
            }
            @media (max-width: 900px) {
              .service-pillar-inner {
                grid-template-columns: 1fr !important;
                gap: 20px;
              }
            }
          `}</style>
        </div>
      </section>

      {/* ===== SELECTED WORK ===== */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '64px',
              }}
            >
              <div>
                <p className="eyebrow" style={{ marginBottom: '16px' }}>
                  Selected work
                </p>
                <h2 className="editorial-h2">Systems we've designed and delivered.</h2>
              </div>
              <Link to="/work" className="btn-link" style={{ flexShrink: 0 }}>
                All Work
                <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>

          {projectsLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
              <div className="spinner" />
            </div>
          ) : featuredProjects.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '24px',
              }}
              className="work-grid"
            >
              {featuredProjects.map((project, i) => {
                const isLarge = i === 0 || i === 3;
                const colSpan = isLarge ? 8 : 4;
                return (
                  <Reveal key={project.id} delay={i * 0.08}>
                    <Link
                      to={`/work/${project.slug}`}
                      style={{
                        gridColumn: `span ${colSpan}`,
                        display: 'block',
                      }}
                      className="work-card-link"
                    >
                      <div
                        style={{
                          position: 'relative',
                          aspectRatio: isLarge ? '16 / 9' : '4 / 3',
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          transition: 'border-color 300ms',
                        }}
                        className="work-card"
                      >
                        {project.cover_image ? (
                          <img
                            src={project.cover_image}
                            alt={project.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                            className="work-card-img"
                          />
                        ) : (
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-elevated) 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                              {project.name}
                            </span>
                          </div>
                        )}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(180deg, transparent 50%, rgba(8, 9, 11, 0.8) 100%)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            padding: '24px',
                          }}
                        >
                          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                            {project.industry && <span className="tag" style={{ background: 'rgba(8,9,11,0.6)', backdropFilter: 'blur(8px)' }}>{project.industry}</span>}
                            {project.project_type && <span className="tag" style={{ background: 'rgba(8,9,11,0.6)', backdropFilter: 'blur(8px)' }}>{project.project_type}</span>}
                          </div>
                          <h3
                            style={{
                              fontSize: isLarge ? '1.5rem' : '1.125rem',
                              fontWeight: 500,
                              color: 'var(--text-primary)',
                              marginBottom: '4px',
                            }}
                          >
                            {project.name}
                          </h3>
                          {project.short_description && (
                            <p
                              style={{
                                fontSize: '0.8125rem',
                                color: 'var(--text-secondary)',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {project.short_description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state-title">No projects published yet.</p>
              <p className="empty-state-desc">Selected case studies will appear here.</p>
            </div>
          )}

          <style>{`
            .work-card:hover {
              border-color: var(--border-hover) !important;
            }
            .work-card:hover .work-card-img {
              transform: scale(1.04);
            }
            @media (max-width: 768px) {
              .work-grid {
                grid-template-columns: 1fr !important;
              }
              .work-card-link {
                grid-column: span 1 !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* ===== APPROACH ===== */}
      <ApproachSection />

      {/* ===== WHY HACKBASE ===== */}
      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="editorial-h2" style={{ maxWidth: '800px', marginBottom: '64px' }}>
              Strategy without execution is a document. Execution without strategy is expensive.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
              className="why-grid"
            >
              {[
                { label: 'Strategy', desc: 'Understand the problem before touching technology.' },
                { label: 'Product', desc: 'Design the right system, not just any system.' },
                { label: 'Engineering', desc: 'Build with quality, scalability and maintainability.' },
                { label: 'Execution', desc: 'Ship, deploy and operate in production.' },
              ].map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    padding: '40px 32px',
                    background: 'var(--surface)',
                    borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                    transition: 'background 250ms',
                  }}
                  className="why-cell"
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--surface)')}
                >
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      color: 'var(--accent)',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '16px',
                      display: 'block',
                    }}
                  >
                    + {String(i).padStart(2, '0')}
                  </span>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      marginBottom: '12px',
                    }}
                  >
                    {item.label}
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <style>{`
            @media (max-width: 768px) {
              .why-grid {
                grid-template-columns: 1fr !important;
              }
              .why-cell {
                border-right: none !important;
                border-bottom: 1px solid var(--border);
              }
              .why-cell:last-child {
                border-bottom: none;
              }
            }
          `}</style>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section className="section-sm" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: '32px' }}>
              Where we create value
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              {industries.map((ind) => (
                <span
                  key={ind}
                  style={{
                    padding: '10px 24px',
                    border: '1px solid var(--border-strong)',
                    borderRadius: '3px',
                    fontSize: '0.9375rem',
                    color: 'var(--text-secondary)',
                    transition: 'all 250ms',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-hover)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-strong)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {ind}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FOUNDER ===== */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.5fr',
              gap: '80px',
              alignItems: 'center',
            }}
            className="founder-grid"
          >
            <Reveal>
              <div
                style={{
                  aspectRatio: '4 / 5',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  position: 'relative',
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
                <p className="body-md">
                  The approach is straightforward: understand the problem deeply, design the right
                  system, and build it well.
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
              .founder-grid {
                grid-template-columns: 1fr !important;
                gap: 40px;
              }
            }
          `}</style>
        </div>
      </section>

      {/* ===== TESTIMONIALS (only if published) ===== */}
      {testimonials.length > 0 && (
        <section className="section" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: '16px' }}>
                Client perspectives
              </p>
            </Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginTop: '32px' }}>
              {testimonials.slice(0, 3).map((t, i) => (
                <Reveal key={t.id} delay={i * 0.1}>
                  <blockquote
                    style={{
                      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                      fontWeight: 300,
                      lineHeight: 1.4,
                      color: 'var(--text-primary)',
                      maxWidth: '800px',
                      fontStyle: 'normal',
                    }}
                  >
                    "{t.testimonial}"
                  </blockquote>
                  <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {t.client_name}
                      </span>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        {t.role}{t.company ? `, ${t.company}` : ''}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CONTACT CTA ===== */}
      <section className="section-lg" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2
              className="editorial-h1"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '28px', maxWidth: '800px', margin: '0 auto 28px' }}
            >
              Have a problem worth solving?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-lg" style={{ marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
              Tell us what you're trying to build, improve or change.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '0.9375rem' }}>
                Start a Conversation
                <ArrowRight size={16} />
              </Link>
              <a
                href={`mailto:${siteConfig.businessEmail}`}
                className="btn-link"
              >
                {siteConfig.businessEmail}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PublicLayout>
  );
}
