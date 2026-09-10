import { type ReactNode } from 'react';
import { Navigation } from '@/components/navigation/Navigation';
import { Footer } from '@/components/layout/Footer';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main" style={{ paddingTop: 'var(--nav-height)' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
