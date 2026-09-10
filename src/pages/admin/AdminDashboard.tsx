import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Inbox, TrendingUp, FolderKanban, ArrowRight, Activity as ActivityIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { fetchAllProjects } from '@/services/projects';
import { fetchRecentActivities } from '@/services/activities';
import type { Project, Lead, Activity } from '@/types';
import { siteConfig } from '@/config/site';

interface Stats {
  totalLeads: number;
  newLeads: number;
  activeOpportunities: number;
  publishedProjects: number;
}

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [{ data: leadsData }, projectsData, activitiesData] = await Promise.all([
          supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(10),
          fetchAllProjects(),
          fetchRecentActivities(5),
        ]);
        setLeads(leadsData || []);
        setProjects(projectsData);
        setActivities(activitiesData);
      } catch {
        // silently fail — empty states will show
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats: Stats = {
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === 'NEW').length,
    activeOpportunities: leads.filter((l) =>
      ['CONTACTED', 'DISCOVERY', 'PROPOSAL', 'NEGOTIATION'].includes(l.status)
    ).length,
    publishedProjects: projects.filter((p) => p.published).length,
  };

  const statCards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: Users, color: 'var(--accent)' },
    { label: 'New Leads', value: stats.newLeads, icon: Inbox, color: '#6B9FF5' },
    { label: 'Active Opportunities', value: stats.activeOpportunities, icon: TrendingUp, color: '#FCD34D' },
    { label: 'Published Projects', value: stats.publishedProjects, icon: FolderKanban, color: '#4ADE80' },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Overview
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          A snapshot of your business activity.
        </p>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '32px',
        }}
        className="stats-grid"
      >
        {statCards.map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: '24px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <stat.icon size={18} style={{ color: stat.color }} />
            </div>
            <p style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1 }}>
              {stat.value}
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              {stat.label}
            </p>
          </div>
        ))}
        <style>{`
          @media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>

      {/* Two column: Recent Leads + Recent Activity */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: '24px',
          marginBottom: '24px',
        }}
        className="dashboard-grid"
      >
        {/* Recent Leads */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
              Recent Leads
            </h2>
            <Link
              to={`${siteConfig.adminRoute}/leads`}
              style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 150ms' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {leads.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 6).map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => (window.location.href = `${siteConfig.adminRoute}/leads/${lead.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td style={{ fontWeight: 500 }}>{lead.name}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{lead.company || '—'}</td>
                    <td><span className={`badge badge-${lead.status.toLowerCase()}`}>{lead.status}</span></td>
                    <td><span className={`badge badge-priority-${lead.priority.toLowerCase()}`}>{lead.priority}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <p className="empty-state-title">No leads yet.</p>
              <p className="empty-state-desc">Leads from the contact form will appear here.</p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <h2 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
              Recent Activity
            </h2>
          </div>
          {activities.length > 0 ? (
            <div style={{ padding: '12px 20px' }}>
              {activities.map((act, i) => (
                <div
                  key={act.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px 0',
                    borderBottom: i < activities.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <ActivityIcon size={14} style={{ color: 'var(--text-muted)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                      {act.description || act.type}
                    </p>
                    <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {new Date(act.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state-title">No activity yet.</p>
              <p className="empty-state-desc">CRM actions will be logged here.</p>
            </div>
          )}
        </div>
        <style>{`
          @media (max-width: 900px) { .dashboard-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>

      {/* Pipeline overview */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
            Pipeline Overview
          </h2>
          <Link
            to={`${siteConfig.adminRoute}/pipeline`}
            style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 150ms' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            View board <ArrowRight size={12} />
          </Link>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '0',
          }}
          className="pipeline-overview-grid"
        >
          {['NEW', 'CONTACTED', 'DISCOVERY', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'].map((status) => {
            const count = leads.filter((l) => l.status === status).length;
            return (
              <div
                key={status}
                style={{
                  padding: '20px 16px',
                  borderRight: '1px solid var(--border)',
                  textAlign: 'center',
                }}
                className="pipeline-overview-cell"
              >
                <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                  {status}
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: 300, color: 'var(--text-primary)' }}>{count}</p>
              </div>
            );
          })}
          <style>{`
            @media (max-width: 768px) {
              .pipeline-overview-grid { grid-template-columns: repeat(2, 1fr) !important; }
              .pipeline-overview-cell { border-right: 1px solid var(--border) !important; border-bottom: 1px solid var(--border); }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
