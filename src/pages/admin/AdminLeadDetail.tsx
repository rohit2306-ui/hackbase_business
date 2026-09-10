import { useEffect, useState, type FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Trash2, Calendar, Clock, User, Building2, Mail, Phone, MessageSquare } from 'lucide-react';
import { fetchLeadById, updateLead, deleteLead, LEAD_STATUSES, LEAD_PRIORITIES, INDUSTRIES, SERVICE_OPTIONS } from '@/services/leads';
import { fetchActivitiesByLeadId, createActivity } from '@/services/activities';
import { siteConfig } from '@/config/site';
import type { Lead, Activity, LeadStatus, LeadPriority } from '@/types';

export function AdminLeadDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [newNote, setNewNote] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    service: '',
    message: '',
    status: 'NEW' as LeadStatus,
    priority: 'NORMAL' as LeadPriority,
    assigned_to: '',
    notes: '',
    next_follow_up: '',
    last_contacted: '',
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const [leadData, activityData] = await Promise.all([
          fetchLeadById(id),
          fetchActivitiesByLeadId(id),
        ]);
        if (leadData) {
          setLead(leadData);
          setForm({
            name: leadData.name,
            email: leadData.email,
            phone: leadData.phone || '',
            company: leadData.company || '',
            industry: leadData.industry || '',
            service: leadData.service || '',
            message: leadData.message || '',
            status: leadData.status,
            priority: leadData.priority,
            assigned_to: leadData.assigned_to || '',
            notes: leadData.notes || '',
            next_follow_up: leadData.next_follow_up ? leadData.next_follow_up.split('T')[0] : '',
            last_contacted: leadData.last_contacted ? leadData.last_contacted.split('T')[0] : '',
          });
        }
        setActivities(activityData);
      } catch { /* empty */ } finally { setLoading(false); }
    })();
  }, [id]);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const logActivity = async (type: string, description: string, metadata?: Record<string, unknown>) => {
    if (!id) return;
    try {
      const act = await createActivity({ type, lead_id: id, description, metadata: metadata || {} });
      setActivities((prev) => [act, ...prev]);
    } catch { /* silent */ }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id || !lead) return;
    setSaving(true);
    setError(null);

    try {
      const updates: Partial<Lead> = {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.company || null,
        industry: form.industry || null,
        service: form.service || null,
        message: form.message || null,
        status: form.status,
        priority: form.priority,
        assigned_to: form.assigned_to || null,
        notes: form.notes || null,
        next_follow_up: form.next_follow_up ? new Date(form.next_follow_up).toISOString() : null,
        last_contacted: form.last_contacted ? new Date(form.last_contacted).toISOString() : null,
      };

      const updated = await updateLead(id, updates);
      setLead(updated);

      if (form.status !== lead.status) {
        await logActivity('status_changed', `Status changed from ${lead.status} to ${form.status}`, { from: lead.status, to: form.status });
      }
      if (form.priority !== lead.priority) {
        await logActivity('priority_changed', `Priority changed from ${lead.priority} to ${form.priority}`, { from: lead.priority, to: form.priority });
      }
      await logActivity('lead_updated', 'Lead details updated');
    } catch {
      setError('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim() || !id) return;
    const currentNotes = form.notes ? form.notes + '\n---\n' + newNote : newNote;
    update('notes', currentNotes);
    setNewNote('');
    try {
      const updated = await updateLead(id, { notes: currentNotes });
      setLead(updated);
      await logActivity('note_added', `Note added: ${newNote.substring(0, 80)}...`);
    } catch { /* silent */ }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteLead(id);
      navigate(`${siteConfig.adminRoute}/leads`);
    } catch {
      setError('Failed to delete lead.');
    }
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}><div className="spinner" /></div>;
  }

  if (!lead) {
    return (
      <div className="empty-state">
        <p className="empty-state-title">Lead not found.</p>
        <Link to={`${siteConfig.adminRoute}/leads`} className="btn btn-ghost" style={{ marginTop: '16px' }}>Back to Leads</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link
          to={`${siteConfig.adminRoute}/leads`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)', transition: 'color 150ms' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <ArrowLeft size={14} /> Back to Leads
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '8px' }}>{lead.name}</h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className={`badge badge-${lead.status.toLowerCase()}`}>{lead.status}</span>
            <span className={`badge badge-priority-${lead.priority.toLowerCase()}`}>{lead.priority}</span>
          </div>
        </div>
        {confirmDelete ? (
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={handleDelete} style={{ padding: '6px 12px', fontSize: '0.75rem', color: 'var(--error)', border: '1px solid var(--error)', borderRadius: '3px', background: 'rgba(248,113,113,0.1)' }}>Confirm Delete</button>
            <button onClick={() => setConfirmDelete(false)} style={{ padding: '6px 12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setConfirmDelete(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', fontSize: '0.8125rem', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: '4px', transition: 'color 150ms' }}>
            <Trash2 size={14} /> Delete
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }} className="lead-detail-grid">
        {/* Left: Edit form */}
        <form onSubmit={handleSubmit}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '0.6875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '20px' }}>Contact Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-2col">
              <div className="form-field">
                <label className="form-label">Name *</label>
                <input className="form-input" value={form.name} onChange={(e) => update('name', e.target.value)} required />
              </div>
              <div className="form-field">
                <label className="form-label">Email *</label>
                <input className="form-input" value={form.email} onChange={(e) => update('email', e.target.value)} required />
              </div>
              <div className="form-field">
                <label className="form-label">Phone</label>
                <input className="form-input" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
              </div>
              <div className="form-field">
                <label className="form-label">Company</label>
                <input className="form-input" value={form.company} onChange={(e) => update('company', e.target.value)} />
              </div>
              <div className="form-field">
                <label className="form-label">Industry</label>
                <select className="form-select" value={form.industry} onChange={(e) => update('industry', e.target.value)}>
                  <option value="">—</option>
                  {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Service</label>
                <select className="form-select" value={form.service} onChange={(e) => update('service', e.target.value)}>
                  <option value="">—</option>
                  {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-field" style={{ marginTop: '16px' }}>
              <label className="form-label">Message</label>
              <textarea className="form-textarea" value={form.message} onChange={(e) => update('message', e.target.value)} rows={4} />
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '0.6875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '20px' }}>CRM Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-2col">
              <div className="form-field">
                <label className="form-label">Status</label>
                <select className="form-select" value={form.status} onChange={(e) => update('status', e.target.value)}>
                  {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Priority</label>
                <select className="form-select" value={form.priority} onChange={(e) => update('priority', e.target.value)}>
                  {LEAD_PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Assigned To</label>
                <input className="form-input" value={form.assigned_to} onChange={(e) => update('assigned_to', e.target.value)} />
              </div>
              <div className="form-field">
                <label className="form-label">Source</label>
                <input className="form-input" value={lead.source} disabled style={{ opacity: 0.6 }} />
              </div>
              <div className="form-field">
                <label className="form-label">Last Contacted</label>
                <input type="date" className="form-input" value={form.last_contacted} onChange={(e) => update('last_contacted', e.target.value)} />
              </div>
              <div className="form-field">
                <label className="form-label">Next Follow-up</label>
                <input type="date" className="form-input" value={form.next_follow_up} onChange={(e) => update('next_follow_up', e.target.value)} />
              </div>
            </div>
          </div>

          {error && <p className="form-error" style={{ marginBottom: '16px' }}>{error}</p>}

          <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
            <button type="submit" disabled={saving} className="btn btn-primary" style={{ opacity: saving ? 0.6 : 1 }}>
              {saving ? <div className="spinner" style={{ width: '16px', height: '16px', borderTopColor: 'var(--bg)' }} /> : <Save size={15} />}
              Save Changes
            </button>
          </div>
        </form>

        {/* Right: Activity timeline + notes */}
        <div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '20px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '0.6875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Activity Timeline
            </h3>
            {activities.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {activities.map((act, i) => (
                  <div key={act.id} style={{ display: 'flex', gap: '12px', paddingBottom: '16px', position: 'relative' }}>
                    {i < activities.length - 1 && (
                      <div style={{ position: 'absolute', left: '5px', top: '20px', bottom: '0', width: '1px', background: 'var(--border)' }} />
                    )}
                    <div style={{ width: '11px', height: '11px', borderRadius: '50%', border: '2px solid var(--accent)', background: 'var(--bg)', flexShrink: 0, marginTop: '3px', zIndex: 1 }} />
                    <div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 500 }}>{act.type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{act.description}</p>
                      <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '4px' }}>{new Date(act.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>No activity recorded yet.</p>
            )}
          </div>

          {/* Quick info */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '20px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '0.6875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '16px' }}>Quick Info</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <InfoRow icon={Calendar} label="Created" value={new Date(lead.created_at).toLocaleDateString()} />
              {lead.last_contacted && <InfoRow icon={Clock} label="Last Contacted" value={new Date(lead.last_contacted).toLocaleDateString()} />}
              {lead.next_follow_up && <InfoRow icon={Calendar} label="Next Follow-up" value={new Date(lead.next_follow_up).toLocaleDateString()} />}
              {lead.assigned_to && <InfoRow icon={User} label="Assigned" value={lead.assigned_to} />}
              {lead.company && <InfoRow icon={Building2} label="Company" value={lead.company} />}
              {lead.email && <InfoRow icon={Mail} label="Email" value={lead.email} />}
              {lead.phone && <InfoRow icon={Phone} label="Phone" value={lead.phone} />}
            </div>
          </div>

          {/* Add note */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '20px' }}>
            <h3 style={{ fontSize: '0.6875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '16px' }}>Add Note</h3>
            <textarea
              className="form-textarea"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
              placeholder="Add a quick note..."
              style={{ minHeight: '80px' }}
            />
            <button onClick={handleAddNote} disabled={!newNote.trim()} className="btn btn-ghost" style={{ marginTop: '12px', padding: '6px 14px', fontSize: '0.8125rem', opacity: newNote.trim() ? 1 : 0.5, cursor: newNote.trim() ? 'pointer' : 'not-allowed' }}>
              <MessageSquare size={14} /> Add Note
            </button>

            {form.notes && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Existing Notes</p>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                  {form.notes}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .lead-detail-grid { grid-template-columns: 1fr !important; }
          .form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Icon size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: '90px' }}>{label}</span>
      <span style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>{value}</span>
    </div>
  );
}
