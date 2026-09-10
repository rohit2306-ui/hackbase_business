export const siteConfig = {
  brandName: 'HACKBASE',
  founderName: 'Rohit Thakur',
  businessEmail: import.meta.env.VITE_HACKBASE_BUSINESS_EMAIL || 'india@hackbase.in',
  logoUrl: import.meta.env.VITE_HACKBASE_LOGO_URL || '',
  founderImageUrl: import.meta.env.VITE_FOUNDER_IMAGE_URL || '',
  tagline: 'We build the systems behind ambitious healthcare companies and startups.',
  description:
    'HackBase combines strategy, product thinking and engineering to turn complex business challenges into scalable digital systems.',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://hackbase.in',
  adminRoute: '/secure-admin-x7k9',
};

export type SiteConfig = typeof siteConfig;
