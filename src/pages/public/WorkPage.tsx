import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { SEO } from '@/components/SEO';
import { Reveal } from '@/components/animations/Reveal';
import { usePublishedProjects } from '@/hooks/usePublicData';

export function WorkPage() {
  const { projects, loading } = usePublishedProjects();

  return (
    <PublicLayout>
      <SEO
        title="Selected Work — Case Studies | HackBase"
        description="Systems we've designed and delivered for healthcare organizations, startups and technology companies."
        canonicalPath="/work"
      />

      <section style={{ padding: '120px 0 60px' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: '20px' }}>
              Selected work
            </p>
            <h1 className="editorial-h1" style={{ marginBottom: '28px', maxWidth: '800px' }}>
              Systems we've designed and delivered for real-world problems.
            </h1>
            <p className="body-lg" style={{ maxWidth: '560px' }}>
              Each project starts with a business problem and ends with a working system in
              production.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: '80px' }}>
        <div className="container">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
              <div className="spinner" />
            </div>
          ) : projects.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '24px',
              }}
              className="work-grid"
            >
              {projects.map((project, i) => {
                const isLarge = project.featured || i === 0;
                const colSpan = isLarge ? 8 : 4;
                return (
                  <Reveal key={project.id} delay={Math.min(i * 0.06, 0.3)}>
                    <Link
                      to={`/work/${project.slug}`}
                      style={{ gridColumn: `span ${colSpan}`, display: 'block' }}
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
                            <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                              {project.name}
                            </span>
                          </div>
                        )}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(180deg, transparent 50%, rgba(8, 9, 11, 0.85) 100%)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            padding: '24px',
                          }}
                        >
                          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
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
              <p className="empty-state-desc">Selected case studies will appear here once published.</p>
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

      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 className="editorial-h2" style={{ marginBottom: '28px' }}>
              Have a similar problem?
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
