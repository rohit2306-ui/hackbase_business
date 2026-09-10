import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { SEO } from '@/components/SEO';
import { Reveal } from '@/components/animations/Reveal';
import { fetchProjectBySlug } from '@/services/projects';
import type { Project } from '@/types';

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const data = await fetchProjectBySlug(slug);
        if (!data) {
          setNotFound(true);
        } else {
          setProject(data);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <PublicLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div className="spinner" />
        </div>
      </PublicLayout>
    );
  }

  if (notFound || !project) {
    return <Navigate to="/work" replace />;
  }

  return (
    <PublicLayout>
      <SEO
        title={`${project.name} — Case Study | HackBase`}
        description={project.short_description || project.description || `${project.name} case study`}
        canonicalPath={`/work/${project.slug}`}
        ogType="article"
        ogImage={project.cover_image || undefined}
      />

      {/* Header */}
      <section style={{ padding: '120px 0 60px' }}>
        <div className="container">
          <Reveal>
            <Link
              to="/work"
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
              All Work
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="editorial-h1" style={{ marginBottom: '32px', maxWidth: '900px' }}>
              {project.name}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{
                display: 'flex',
                gap: '48px',
                flexWrap: 'wrap',
                paddingTop: '24px',
                borderTop: '1px solid var(--border)',
              }}
            >
              {project.client && (
                <div>
                  <p className="eyebrow" style={{ marginBottom: '6px' }}>Client</p>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{project.client}</p>
                </div>
              )}
              {project.industry && (
                <div>
                  <p className="eyebrow" style={{ marginBottom: '6px' }}>Industry</p>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{project.industry}</p>
                </div>
              )}
              {project.project_type && (
                <div>
                  <p className="eyebrow" style={{ marginBottom: '6px' }}>Project Type</p>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{project.project_type}</p>
                </div>
              )}
              {project.duration && (
                <div>
                  <p className="eyebrow" style={{ marginBottom: '6px' }}>Duration</p>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{project.duration}</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hero image */}
      {project.cover_image && (
        <section style={{ paddingBottom: '60px' }}>
          <div className="container">
            <Reveal>
              <div
                style={{
                  aspectRatio: '21 / 9',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={project.cover_image}
                  alt={project.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Body content */}
      <section style={{ paddingBottom: '80px' }}>
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            {project.description && (
              <Reveal>
                <div style={{ marginBottom: '64px' }}>
                  <p className="body-lg" style={{ fontSize: '1.25rem', lineHeight: 1.5, color: 'var(--text-primary)', fontWeight: 300 }}>
                    {project.description}
                  </p>
                </div>
              </Reveal>
            )}

            {project.challenge && (
              <Reveal>
                <CaseSection label="The Challenge" content={project.challenge} />
              </Reveal>
            )}

            {project.approach && (
              <Reveal>
                <CaseSection label="The Approach" content={project.approach} />
              </Reveal>
            )}

            {project.solution && (
              <Reveal>
                <CaseSection label="The Solution" content={project.solution} />
              </Reveal>
            )}

            {project.system && (
              <Reveal>
                <CaseSection label="The System" content={project.system} />
              </Reveal>
            )}

            {project.outcome && (
              <Reveal>
                <CaseSection label="Outcome" content={project.outcome} />
              </Reveal>
            )}

            {project.technologies.length > 0 && (
              <Reveal>
                <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
                  <p className="eyebrow" style={{ marginBottom: '20px' }}>Technology</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {project.gallery.length > 0 && (
              <Reveal>
                <div style={{ marginTop: '64px' }}>
                  <p className="eyebrow" style={{ marginBottom: '24px' }}>Project Gallery</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="gallery-grid">
                    {project.gallery.map((img, i) => (
                      <div
                        key={i}
                        style={{
                          aspectRatio: '4 / 3',
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: '4px',
                          overflow: 'hidden',
                        }}
                      >
                        <img src={img} alt={`${project.name} gallery ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                  <style>{`
                    @media (max-width: 768px) {
                      .gallery-grid { grid-template-columns: 1fr !important; }
                    }
                  `}</style>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 className="editorial-h2" style={{ marginBottom: '16px' }}>
              Have a similar problem?
            </h2>
            <p className="body-lg" style={{ marginBottom: '32px' }}>
              Let's talk about what you're trying to solve.
            </p>
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

function CaseSection({ label, content }: { label: string; content: string }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <p className="eyebrow" style={{ marginBottom: '16px' }}>{label}</p>
      <p style={{ fontSize: '1.0625rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
        {content}
      </p>
    </div>
  );
}
