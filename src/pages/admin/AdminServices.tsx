import { useEffect, useState, type FormEvent } from 'react';
import { Plus, Pencil, Trash2, X, Save, Layers } from 'lucide-react';
import { fetchAllServices, createService, updateService, deleteService } from '@/services/services';
import { slugify } from '@/services/projects';
import type { Service } from '@/types';

interface ServiceForm {
  title: string;
  slug: string;
  category: string;
  description: string;
  capabilitiesInput: string;
  published: boolean;
  display_order: number;
}

const empty: ServiceForm = {
  title: '', slug: '', category: '', description: '', capabilitiesInput: '', published: false, display_order: 0,
};

export function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ServiceForm>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = async () => {
    try { setLoading(true); setServices(await fetchAllServices()); } catch { /* */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const startEdit = (s: Service) => {
    setEditing(s);
    setForm({
      title: s.title, slug: s.slug, category: s.category, description: s.description || '',
      capabilitiesInput: (s.capabilities || []).join(', '), published: s.published, display_order: s.display_order,
    });
    setShowForm(true);
  };

  const startNew = () => {
    setEditing(null);
    setForm(empty);
    setShowForm(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (saving) return;
    if (!form.title.trim()) { setError('Title is required.'); return; }
    setSaving(true); setError(null);

    try {
      const capabilities = form.capabilitiesInput.split(',').map((c) => c.trim()).filter(Boolean);
      if (editing) {
        await updateService(editing.id, { title: form.title, slug: form.slug || slugify(form.title), category: form.category, description: form.description, capabilities, published: form.published, display_order: form.display_order });
      } else {
        await createService({ title: form.title, slug: form.slug || slugify(form.title), category: form.category, description: form.description, capabilities, published: form.published, display_order: form.display_order });
      }
      setShowForm(false); setEditing(null); setForm(empty);
      await load();
    } catch { setError('Failed to save service.'); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    try { await deleteService(id); setServices((p) => p.filter((s) => s.id !== id)); setConfirmDelete(null); } catch { /* */ }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>Services</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{services.length} service{services.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={startNew} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8125rem' }}>
          <Plus size={15} /> New Service
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{editing ? 'Edit Service' : 'New Service'}</h2>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} style={{ padding: '4px', color: 'var(--text-muted)' }}><X size={16} /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }} className="svc-3col">
            <div className="form-field"><label className="form-label">Title *</label><input className="form-input" value={form.title} onChange={(e) => { setForm((p) => ({ ...p, title: e.target.value, slug: editing ? p.slug : slugify(e.target.value) })); }} /></div>
            <div className="form-field"><label className="form-label">Slug *</label><input className="form-input" value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: slugify(e.target.value) }))} /></div>
            <div className="form-field"><label className="form-label">Category</label><input className="form-input" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} placeholder="e.g. Healthcare" /></div>
          </div>
          <div className="form-field" style={{ marginBottom: '16px' }}>
            <label className="form-label">Description</label>
            <textarea className="form-textarea" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={3} />
          </div>
          <div className="form-field" style={{ marginBottom: '16px' }}>
            <label className="form-label">Capabilities (comma-separated)</label>
            <input className="form-input" value={form.capabilitiesInput} onChange={(e) => setForm((p) => ({ ...p, capabilitiesInput: e.target.value }))} placeholder="Consulting, Development, Strategy" />
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.published} onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))} style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Published</span>
            </label>
            <div className="form-field" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
              <label className="form-label" style={{ margin: 0 }}>Order</label>
              <input type="number" className="form-input" style={{ width: '80px' }} value={form.display_order} onChange={(e) => setForm((p) => ({ ...p, display_order: parseInt(e.target.value) || 0 }))} />
            </div>
          </div>
          {error && <p className="form-error" style={{ marginBottom: '16px' }}>{error}</p>}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={saving} className="btn btn-primary" style={{ opacity: saving ? 0.6 : 1 }}>
              {saving ? <div className="spinner" style={{ width: '16px', height: '16px', borderTopColor: 'var(--bg)' }} /> : <Save size={15} />}
              {editing ? 'Save' : 'Create'}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="btn btn-ghost">Cancel</button>
          </div>
          <style>{`@media (max-width: 768px) { .svc-3col { grid-template-columns: 1fr !important; } }`}</style>
        </form>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}><div className="spinner" /></div>
      ) : services.length > 0 ? (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr><th>Title</th><th>Category</th><th>Capabilities</th><th>Published</th><th style={{ textAlign: 'right' }}>Actions</th></tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Layers size={14} style={{ color: 'var(--text-muted)' }} />
                      {s.title}
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{s.category || '—'}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{(s.capabilities || []).length} items</td>
                  <td>{s.published ? <span className="badge badge-won">Published</span> : <span className="badge badge-priority-low">Draft</span>}</td>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                      <button onClick={() => startEdit(s)} style={{ padding: '6px', color: 'var(--text-muted)', display: 'flex', transition: 'color 150ms' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
                        <Pencil size={14} />
                      </button>
                      {confirmDelete === s.id ? (
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button onClick={() => handleDelete(s.id)} style={{ padding: '4px 8px', fontSize: '0.6875rem', color: 'var(--error)', border: '1px solid var(--error)', borderRadius: '3px', background: 'rgba(248,113,113,0.1)' }}>Confirm</button>
                          <button onClick={() => setConfirmDelete(null)} style={{ padding: '4px 8px', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmDelete(s.id)} style={{ padding: '6px', color: 'var(--text-muted)', display: 'flex', transition: 'color 150ms' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--error)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
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
          <p className="empty-state-title">No services yet.</p>
          <p className="empty-state-desc">Services will use fallback content if none are published.</p>
          <button onClick={startNew} className="btn btn-primary" style={{ marginTop: '20px', padding: '8px 16px', fontSize: '0.8125rem' }}><Plus size={15} /> New Service</button>
        </div>
      )}
    </div>
  );
}
