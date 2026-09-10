import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import { fetchAllLeads, LEAD_STATUSES, LEAD_PRIORITIES, INDUSTRIES, SERVICE_OPTIONS } from '@/services/leads';
import { siteConfig } from '@/config/site';
import type { Lead, LeadStatus, LeadPriority } from '@/types';

type SortBy = 'newest' | 'oldest' | 'priority' | 'followup';

const priorityOrder: Record<LeadPriority, number> = { URGENT: 0, HIGH: 1, NORMAL: 2, LOW: 3 };

export function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [industryFilter, setIndustryFilter] = useState<string>('');
  const [serviceFilter, setServiceFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortBy>('newest');

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAllLeads();
        setLeads(data);
      } catch { /* empty */ } finally { setLoading(false); }
    })();
  }, []);

  const filtered = useMemo(() => {
    let result = [...leads];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((l) =>
        l.name.toLowerCase().includes(q) ||
        (l.email || '').toLowerCase().includes(q) ||
        (l.company || '').toLowerCase().includes(q)
      );
    }
    if (statusFilter) result = result.filter((l) => l.status === statusFilter);
    if (priorityFilter) result = result.filter((l) => l.priority === priorityFilter);
    if (industryFilter) result = result.filter((l) => l.industry === industryFilter);
    if (serviceFilter) result = result.filter((l) => l.service === serviceFilter);

    switch (sortBy) {
      case 'newest': result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); break;
      case 'oldest': result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()); break;
      case 'priority': result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]); break;
      case 'followup':
        result.sort((a, b) => {
          const aTime = a.next_follow_up ? new Date(a.next_follow_up).getTime() : Infinity;
          const bTime = b.next_follow_up ? new Date(b.next_follow_up).getTime() : Infinity;
          return aTime - bTime;
        });
        break;
    }
    return result;
  }, [leads, search, statusFilter, priorityFilter, industryFilter, serviceFilter, sortBy]);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Leads
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {filtered.length} of {leads.length} lead{leads.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
          gap: '12px',
          marginBottom: '24px',
        }}
        className="filter-bar"
      >
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            className="form-input"
            style={{ paddingLeft: '34px' }}
            placeholder="Search name, email, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <FilterSelect value={statusFilter} onChange={setStatusFilter} options={LEAD_STATUSES} placeholder="Status" />
        <FilterSelect value={priorityFilter} onChange={setPriorityFilter} options={LEAD_PRIORITIES} placeholder="Priority" />
        <FilterSelect value={industryFilter} onChange={setIndustryFilter} options={INDUSTRIES} placeholder="Industry" />
        <FilterSelect value={serviceFilter} onChange={setServiceFilter} options={SERVICE_OPTIONS} placeholder="Service" />
        <FilterSelect value={sortBy} onChange={(v) => setSortBy(v as SortBy)} options={['newest', 'oldest', 'priority', 'followup'] as const} placeholder="Sort" />
        <style>{`
          @media (max-width: 1100px) { .filter-bar { grid-template-columns: 1fr 1fr 1fr !important; } }
          @media (max-width: 600px) { .filter-bar { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
          <div className="spinner" />
        </div>
      ) : filtered.length > 0 ? (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', overflowX: 'auto' }}>
          <table className="data-table" style={{ minWidth: '800px' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id} onClick={() => (window.location.href = `${siteConfig.adminRoute}/leads/${lead.id}`)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontWeight: 500 }}>{lead.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{lead.email}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{lead.company || '—'}</td>
                  <td><span className={`badge badge-${lead.status.toLowerCase()}`}>{lead.status}</span></td>
                  <td><span className={`badge badge-priority-${lead.priority.toLowerCase()}`}>{lead.priority}</span></td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{new Date(lead.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
          <p className="empty-state-title">No leads found.</p>
          <p className="empty-state-desc">{leads.length === 0 ? 'Leads from the contact form will appear here.' : 'Try adjusting your filters.'}</p>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <select
      className="form-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ textTransform: 'capitalize' }}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt} style={{ textTransform: 'capitalize' }}>
          {opt.replace(/_/g, ' ').toLowerCase()}
        </option>
      ))}
    </select>
  );
}
