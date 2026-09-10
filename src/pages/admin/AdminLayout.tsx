import { type ReactNode, useState } from 'react';
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Columns3,
  Layers,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { siteConfig } from '@/config/site';

const navItems = [
  { label: 'Overview', path: '', icon: LayoutDashboard, end: true },
  { label: 'Projects', path: 'projects', icon: FolderKanban },
  { label: 'Leads', path: 'leads', icon: Users },
  { label: 'Pipeline', path: 'pipeline', icon: Columns3 },
  { label: 'Services', path: 'services', icon: Layers },
  { label: 'Testimonials', path: 'testimonials', icon: MessageSquare },
  { label: 'Settings', path: 'settings', icon: Settings },
];

export function AdminLayout() {
  const { session, admin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!session || !admin) {
    return <Navigate to={`${siteConfig.adminRoute}/login`} replace />;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate(`${siteConfig.adminRoute}/login`);
  };

  const sidebar = (
    <>
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.06em', color: 'var(--text-primary)' }}>
          {siteConfig.brandName}
        </span>
        <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', padding: '2px 6px', border: '1px solid var(--border)', borderRadius: '3px', letterSpacing: '0.05em' }}>
          ADMIN
        </span>
      </div>

      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path ? `${siteConfig.adminRoute}/${item.path}` : siteConfig.adminRoute}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              marginBottom: '2px',
              borderRadius: '4px',
              fontSize: '0.875rem',
              fontWeight: 400,
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: isActive ? 'var(--surface)' : 'transparent',
              transition: 'all 150ms',
            })}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              if (!el.classList.contains('active')) el.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              if (!el.classList.contains('active')) el.style.color = 'var(--text-secondary)';
            }}
          >
            <item.icon size={16} style={{ opacity: 0.7 }} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border)' }}>
        <div style={{ padding: '8px 12px', marginBottom: '8px' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 500 }}>
            {admin.name || admin.email}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            {admin.role}
          </p>
        </div>
        <button
          onClick={handleSignOut}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            width: '100%',
            borderRadius: '4px',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            transition: 'color 150ms, background 150ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--error)';
            e.currentTarget.style.background = 'rgba(248, 113, 113, 0.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="admin-layout">
      {/* Desktop sidebar */}
      <aside className="admin-sidebar">{sidebar}</aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 99,
              backdropFilter: 'blur(4px)',
            }}
          />
          <aside className="admin-sidebar open" style={{ zIndex: 101 }}>
            {sidebar}
          </aside>
        </>
      )}

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            onClick={() => setSidebarOpen(true)}
            className="admin-mobile-toggle"
            aria-label="Open menu"
            style={{ display: 'none', padding: '6px', color: 'var(--text-primary)' }}
          >
            <Menu size={20} />
          </button>
          <AdminTopBar />
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-mobile-toggle { display: block !important; }
        }
      `}</style>
    </div>
  );
}

function AdminTopBar() {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>/</span>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Dashboard</span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          width: '240px',
        }}
        className="admin-search"
      >
        <Search size={14} style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search..."
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '0.8125rem',
            width: '100%',
          }}
        />
      </div>
      <style>{`
        @media (max-width: 768px) {
          .admin-search { display: none !important; }
        }
      `}</style>
    </>
  );
}
