import { useEffect, useState, type FormEvent, type ChangeEvent } from 'react';
import { Plus, Pencil, Trash2, X, Save, Upload, MessageSquare } from 'lucide-react';
import { fetchAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '@/services/testimonials';
import { supabase } from '@/lib/supabase';
import type { Testimonial } from '@/types';

interface TestimonialForm {
  client_name: string;
  company: string;
  role: string;
  testimonial: string;
  photo: string | null;
  published: boolean;
}

const empty: TestimonialForm = { client_name: '', company: '', role: '', testimonial: '', photo: null, published: false };

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<TestimonialForm>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    try { setLoading(true); setTestimonials(await fetchAllTestimonials()); } catch { /* */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const startEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ client_name: t.client_name, company: t.company || '', role: t.role || '', testimonial: t.testimonial, photo: t.photo, published: t.published });
    setShowForm(true);
  };

  const startNew = () => { setEditing(null); setForm(empty); setShowForm(true); };

  const handlePhotoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) { setError('File too large. Max 5MB.'); return; }
    if (!file.type.startsWith('image/')) { setError('Please upload an image.'); return; }
    setError(null); setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `testimonial-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('testimonial-photos').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from('testimonial-photos').getPublicUrl(fileName);
      setForm((p) => ({ ...p, photo: urlData.publicUrl }));
    } catch { setError('Failed to upload photo.'); } finally { setUploading(false); }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (saving) return;
    if (!form.client_name.trim()) { setError('Client name is required.'); return; }
    if (!form.testimonial.trim()) { setError('Testimonial text is required.'); return; }
    setSaving(true); setError(null);

    try {
      const payload = { client_name: form.client_name, company: form.company || null, role: form.role || null, testimonial: form.testimonial, photo: form.photo, published: form.published };
      if (editing) {
        await updateTestimonial(editing.id, payload);
      } else {
        await createTestimonial(payload);
      }
      setShowForm(false); setEditing(null); setForm(empty);
      await load();
    } catch { setError('Failed to save testimonial.'); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    try { await deleteTestimonial(id); setTestimonials((p) => p.filter((t) => t.id !== id)); setConfirmDelete(null); } catch { /* */ }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>Testimonials</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{testimonials.length} testimonial{testimonials.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={startNew} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8125rem' }}>
          <Plus size={15} /> New Testimonial
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{editing ? 'Edit Testimonial' : 'New Testimonial'}</h2>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} style={{ padding: '4px', color: 'var(--text-muted)' }}><X size={16} /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }} className="test-3col">
            <div className="form-field"><label className="form-label">Client Name *</label><input className="form-input" value={form.client_name} onChange={(e) => setForm((p) => ({ ...p, client_name: e.target.value }))} /></div>
            <div className="form-field"><label className="form-label">Company</label><input className="form-input" value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} /></div>
            <div className="form-field"><label className="form-label">Role</label><input className="form-input" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} /></div>
          </div>
          <div className="form-field" style={{ marginBottom: '16px' }}>
            <label className="form-label">Testimonial *</label>
            <textarea className="form-textarea" value={form.testimonial} onChange={(e) => setForm((p) => ({ ...p, testimonial: e.target.value }))} rows={4} />
          </div>
          <div className="form-field" style={{ marginBottom: '16px' }}>
            <label className="form-label">Photo</label>
            {form.photo ? (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={form.photo} alt="Client" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border)' }} />
                <button type="button" onClick={() => setForm((p) => ({ ...p, photo: null }))} style={{ position: 'absolute', top: '-4px', right: '-4px', padding: '4px', background: 'var(--surface)', borderRadius: '50%', color: 'var(--text-primary)' }}><X size={12} /></button>
              </div>
            ) : (
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1px dashed var(--border-strong)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                <Upload size={14} /> {uploading ? 'Uploading...' : 'Upload photo'}
                <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
              </label>
            )}
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '20px' }}>
            <input type="checkbox" checked={form.published} onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))} style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }} />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Published</span>
          </label>
          {error && <p className="form-error" style={{ marginBottom: '16px' }}>{error}</p>}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={saving} className="btn btn-primary" style={{ opacity: saving ? 0.6 : 1 }}>
              {saving ? <div className="spinner" style={{ width: '16px', height: '16px', borderTopColor: 'var(--bg)' }} /> : <Save size={15} />}
              {editing ? 'Save' : 'Create'}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="btn btn-ghost">Cancel</button>
          </div>
          <style>{`@media (max-width: 768px) { .test-3col { grid-template-columns: 1fr !important; } }`}</style>
        </form>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}><div className="spinner" /></div>
      ) : testimonials.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="test-grid">
          {testimonials.map((t) => (
            <div key={t.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {t.photo ? (
                    <img src={t.photo} alt={t.client_name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MessageSquare size={16} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  )}
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{t.client_name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.role}{t.company ? `, ${t.company}` : ''}</p>
                  </div>
                </div>
                {t.published ? <span className="badge badge-won">Published</span> : <span className="badge badge-priority-low">Draft</span>}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px', fontStyle: 'italic' }}>
                "{t.testimonial.length > 150 ? t.testimonial.substring(0, 150) + '...' : t.testimonial}"
              </p>
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                <button onClick={() => startEdit(t)} style={{ padding: '6px', color: 'var(--text-muted)', display: 'flex', transition: 'color 150ms' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  <Pencil size={14} />
                </button>
                {confirmDelete === t.id ? (
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={() => handleDelete(t.id)} style={{ padding: '4px 8px', fontSize: '0.6875rem', color: 'var(--error)', border: '1px solid var(--error)', borderRadius: '3px', background: 'rgba(248,113,113,0.1)' }}>Confirm</button>
                    <button onClick={() => setConfirmDelete(null)} style={{ padding: '4px 8px', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDelete(t.id)} style={{ padding: '6px', color: 'var(--text-muted)', display: 'flex', transition: 'color 150ms' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--error)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
          <style>{`@media (max-width: 768px) { .test-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      ) : (
        <div className="empty-state" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
          <p className="empty-state-title">No testimonials yet.</p>
          <p className="empty-state-desc">Only published testimonials appear on the public website.</p>
          <button onClick={startNew} className="btn btn-primary" style={{ marginTop: '20px', padding: '8px 16px', fontSize: '0.8125rem' }}><Plus size={15} /> New Testimonial</button>
        </div>
      )}
    </div>
  );
}
