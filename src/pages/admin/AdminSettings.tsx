import { useEffect, useState } from 'react';
import { Save, Settings as SettingsIcon, Globe, Mail, User, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { siteConfig } from '@/config/site';

export function AdminSettings() {
  const { admin } = useAuth();
  const [heroContent, setHeroContent] = useState('');
  const [aboutContent, setAboutContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from('site_content').select('*').in('key', ['hero', 'about']);
        const hero = data?.find((d) => d.key === 'hero');
        const about = data?.find((d) => d.key === 'about');
        setHeroContent(hero?.content?.headline as string || '');
        setAboutContent(about?.content?.text as string || '');
      } catch { /* */ } finally { setLoading(false); }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true); setError(null); setSaved(false);
    try {
      const entries = [
        { key: 'hero', content: { headline: heroContent } },
        { key: 'about', content: { text: aboutContent } },
      ];
      for (const entry of entries) {
        const { data: existing } = await supabase.from('site_content').select('id').eq('key', entry.key).maybeSingle();
        if (existing) {
          await supabase.from('site_content').update({ content: entry.content }).eq('id', existing.id);
        } else {
          await supabase.from('site_content').insert({ key: entry.key, content: entry.content });
        }
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}><div className="spinner" /></div>;
  }

  return (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>Settings</h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Manage site content and configuration.</p>
      </div>

      {/* Admin profile */}
      <SettingsCard title="Admin Profile" icon={User}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <InfoRow label="Name" value={admin?.name || 'Not set'} />
          <InfoRow label="Email" value={admin?.email || ''} />
          <InfoRow label="Role" value={admin?.role || ''} />
          <InfoRow label="Status" value={admin?.active ? 'Active' : 'Inactive'} />
        </div>
      </SettingsCard>

      {/* Brand info */}
      <SettingsCard title="Brand Configuration" icon={Globe}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <InfoRow label="Brand Name" value={siteConfig.brandName} />
          <InfoRow label="Founder" value={siteConfig.founderName} />
          <InfoRow label="Business Email" value={siteConfig.businessEmail} />
          <InfoRow label="Admin Route" value={siteConfig.adminRoute} />
          <div style={{ marginTop: '8px', padding: '12px 16px', background: 'var(--bg)', borderRadius: '4px', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Logo and founder image URLs are configured via environment variables
              (VITE_HACKBASE_LOGO_URL, VITE_FOUNDER_IMAGE_URL).
            </p>
          </div>
        </div>
      </SettingsCard>

      {/* Site content */}
      <SettingsCard title="Site Content" icon={SettingsIcon}>
        <div className="form-field" style={{ marginBottom: '20px' }}>
          <label className="form-label">Hero Headline Override</label>
          <textarea
            className="form-textarea"
            value={heroContent}
            onChange={(e) => setHeroContent(e.target.value)}
            rows={2}
            placeholder="Leave empty to use default headline"
          />
          <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            If set, this overrides the default hero headline on the homepage.
          </p>
        </div>
        <div className="form-field" style={{ marginBottom: '20px' }}>
          <label className="form-label">About Page Override</label>
          <textarea
            className="form-textarea"
            value={aboutContent}
            onChange={(e) => setAboutContent(e.target.value)}
            rows={4}
            placeholder="Leave empty to use default about content"
          />
        </div>
        {error && <p className="form-error" style={{ marginBottom: '16px' }}>{error}</p>}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={handleSave} disabled={saving} className="btn btn-primary" style={{ opacity: saving ? 0.6 : 1 }}>
            {saving ? <div className="spinner" style={{ width: '16px', height: '16px', borderTopColor: 'var(--bg)' }} /> : <Save size={15} />}
            Save Content
          </button>
          {saved && <span style={{ fontSize: '0.8125rem', color: 'var(--success)' }}>Saved successfully</span>}
        </div>
      </SettingsCard>

      {/* Security note */}
      <SettingsCard title="Security" icon={Shield}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }} />
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Row Level Security enabled on all tables</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }} />
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Admin access verified via admins table</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }} />
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Public access restricted to published content</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }} />
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Lead submissions are write-only (no public read)</span>
          </div>
        </div>
      </SettingsCard>
    </div>
  );
}

function SettingsCard({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>; children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <Icon size={16} style={{ color: 'var(--text-muted)' }} />
        <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{value}</span>
    </div>
  );
}
