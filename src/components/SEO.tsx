import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
}

export function SEO({ title, description, canonicalPath = '', ogType = 'website', ogImage }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', ogType, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://hackbase.in';
    setMeta('og:url', `${baseUrl}${canonicalPath}`, 'property');
    if (ogImage) {
      setMeta('og:image', ogImage, 'property');
      setMeta('twitter:image', ogImage);
    }

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${baseUrl}${canonicalPath}`);
  }, [title, description, canonicalPath, ogType, ogImage]);

  return null;
}
