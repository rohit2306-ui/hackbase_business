import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { siteConfig } from '@/config/site';

export function AdminLogin() {
  const { session, admin, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (session && admin) {
    return <Navigate to={siteConfig.adminRoute} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      setError('Invalid email or password.');
      setSubmitting(false);
    } else {
      navigate(siteConfig.adminRoute);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '24px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '380px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <Lock size={20} style={{ color: 'var(--text-secondary)' }} />
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Admin Access
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Sign in to the HackBase operating system.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            padding: '32px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
          }}
        >
          <div className="form-field" style={{ marginBottom: '20px' }}>
            <label className="form-label" htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              required
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@hackbase.in"
              autoComplete="email"
            />
          </div>

          <div className="form-field" style={{ marginBottom: '24px' }}>
            <label className="form-label" htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              required
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="form-error" style={{ marginBottom: '16px' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '12px 24px',
              opacity: submitting ? 0.6 : 1,
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
          >
            {submitting ? (
              <div className="spinner" style={{ width: '16px', height: '16px', borderTopColor: 'var(--bg)' }} />
            ) : (
              <>
                Sign In
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link
            to="/"
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              transition: 'color 200ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            ← Back to website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
