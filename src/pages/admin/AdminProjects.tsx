import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Star, ExternalLink } from 'lucide-react';
import { fetchAllProjects, deleteProject } from '@/services/projects';
import { siteConfig } from '@/config/site';
import type { Project } from '@/types';

export function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchAllProjects();
      setProjects(data);
    } catch {
      // empty state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setConfirmDelete(null);
    } catch {
      // keep
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }} className="admin-head-row">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
            Projects
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            {projects.length} project{projects.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Link to={`${siteConfig.adminRoute}/projects/new`} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8125rem' }}>
          <Plus size={15} />
          New Project
        </Link>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
          <div className="spinner" />
        </div>
      ) : projects.length > 0 ? (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Industry</th>
                <th>Featured</th>
                <th>Published</th>
                <th>Created</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {project.cover_image ? (
                        <img src={project.cover_image} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover', flexShrink: 0 }} />
                      ) : (
                        <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'var(--surface-elevated)', flexShrink: 0 }} />
                      )}
                      <div>
                        <p style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{project.name}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/work/{project.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{project.industry || '—'}</td>
                  <td>{project.featured ? <Star size={14} style={{ color: '#FCD34D', fill: '#FCD34D' }} /> : <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                  <td>
                    {project.published ? (
                      <span className="badge badge-won">Published</span>
                    ) : (
                      <span className="badge badge-priority-low">Draft</span>
                    )}
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                      {project.published && (
                        <a
                          href={`/work/${project.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ padding: '6px', color: 'var(--text-muted)', display: 'flex', transition: 'color 150ms' }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                          title="View public page"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <Link
                        to={`${siteConfig.adminRoute}/projects/${project.id}`}
                        style={{ padding: '6px', color: 'var(--text-muted)', display: 'flex', transition: 'color 150ms' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </Link>
                      {confirmDelete === project.id ? (
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            onClick={() => handleDelete(project.id)}
                            style={{ padding: '4px 8px', fontSize: '0.6875rem', color: 'var(--error)', border: '1px solid var(--error)', borderRadius: '3px', background: 'rgba(248,113,113,0.1)' }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            style={{ padding: '4px 8px', fontSize: '0.6875rem', color: 'var(--text-muted)' }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(project.id)}
                          style={{ padding: '6px', color: 'var(--text-muted)', display: 'flex', transition: 'color 150ms' }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--error)')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
          <p className="empty-state-title">No projects yet.</p>
          <p className="empty-state-desc">Create your first project to showcase your work.</p>
          <Link to={`${siteConfig.adminRoute}/projects/new`} className="btn btn-primary" style={{ marginTop: '20px', padding: '8px 16px', fontSize: '0.8125rem' }}>
            <Plus size={15} />
            New Project
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .admin-head-row { flex-direction: column !important; align-items: flex-start !important; gap: 16px; }
        }
      `}</style>
    </div>
  );
}
