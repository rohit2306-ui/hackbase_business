import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { SEO } from '@/components/SEO';

export function NotFoundPage() {
  return (
    <PublicLayout>
      <SEO title="Page Not Found | HackBase" description="The page you're looking for doesn't exist." />
      <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p
            style={{
              fontSize: '6rem',
              fontWeight: 200,
              color: 'var(--text-muted)',
              lineHeight: 1,
              marginBottom: '24px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            404
          </p>
          <h1 className="editorial-h2" style={{ marginBottom: '20px' }}>
            This page doesn't exist.
          </h1>
          <p className="body-md" style={{ marginBottom: '32px' }}>
            The page you're looking for may have been moved or removed.
          </p>
          <Link to="/" className="btn btn-primary">
            Back to Home
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
