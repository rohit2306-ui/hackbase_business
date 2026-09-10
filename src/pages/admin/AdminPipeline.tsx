import { useEffect, useState, type DragEvent } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllLeads, updateLead, LEAD_STATUSES } from '@/services/leads';
import { createActivity } from '@/services/activities';
import { siteConfig } from '@/config/site';
import type { Lead, LeadStatus } from '@/types';

export function AdminPipeline() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<LeadStatus | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAllLeads();
        setLeads(data);
      } catch { /* empty */ } finally { setLoading(false); }
    })();
  }, []);

  const handleDragStart = (e: DragEvent, leadId: string) => {
    setDraggingId(leadId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: DragEvent, status: LeadStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTarget(status);
  };

  const handleDrop = async (e: DragEvent, status: LeadStatus) => {
    e.preventDefault();
    setDropTarget(null);

    if (!draggingId) return;
    const lead = leads.find((l) => l.id === draggingId);
    if (!lead || lead.status === status) {
      setDraggingId(null);
      return;
    }

    const oldStatus = lead.status;
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status } : l)));
    setDraggingId(null);

    try {
      await updateLead(lead.id, { status });
      await createActivity({
        type: 'status_changed',
        lead_id: lead.id,
        description: `Status changed from ${oldStatus} to ${status} via pipeline`,
        metadata: { from: oldStatus, to: status },
      });
    } catch {
      setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status: oldStatus } : l)));
    }
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}><div className="spinner" /></div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Pipeline
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Drag leads between stages to update their status.
        </p>
      </div>

      <div className="kanban-board">
        {LEAD_STATUSES.map((status) => {
          const columnLeads = leads.filter((l) => l.status === status);
          return (
            <div
              key={status}
              className="kanban-column"
              onDragOver={(e) => handleDragOver(e, status)}
              onDragLeave={() => setDropTarget(null)}
              onDrop={(e) => handleDrop(e, status)}
              style={{
                background: dropTarget === status ? 'var(--accent-soft)' : 'transparent',
                borderRadius: '4px',
                transition: 'background 200ms',
              }}
            >
              <div className="kanban-column-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{columnLeads.length}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '100px' }}>
                {columnLeads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    onDragEnd={() => { setDraggingId(null); setDropTarget(null); }}
                    className={`kanban-card ${draggingId === lead.id ? 'dragging' : ''}`}
                  >
                    <Link
                      to={`${siteConfig.adminRoute}/leads/${lead.id}`}
                      style={{ display: 'block' }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {lead.name}
                      </p>
                      {lead.company && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{lead.company}</p>
                      )}
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span className={`badge badge-priority-${lead.priority.toLowerCase()}`} style={{ fontSize: '0.5625rem' }}>
                          {lead.priority}
                        </span>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                          {new Date(lead.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}

                {columnLeads.length === 0 && (
                  <div
                    style={{
                      padding: '24px 12px',
                      textAlign: 'center',
                      border: '1px dashed var(--border)',
                      borderRadius: '4px',
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Empty</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
