export interface Project {
  id: string;
  name: string;
  slug: string;
  client: string | null;
  industry: string | null;
  project_type: string | null;
  short_description: string | null;
  description: string | null;
  challenge: string | null;
  approach: string | null;
  solution: string | null;
  system: string | null;
  outcome: string | null;
  technologies: string[];
  duration: string | null;
  cover_image: string | null;
  gallery: string[];
  video_url: string | null;
  featured: boolean;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type LeadStatus = 'NEW' | 'CONTACTED' | 'DISCOVERY' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST';
export type LeadPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  industry: string | null;
  service: string | null;
  message: string | null;
  source: string;
  status: LeadStatus;
  priority: LeadPriority;
  assigned_to: string | null;
  created_at: string;
  last_contacted: string | null;
  next_follow_up: string | null;
  notes: string | null;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string | null;
  capabilities: string[];
  published: boolean;
  display_order: number;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company: string | null;
  role: string | null;
  testimonial: string;
  photo: string | null;
  published: boolean;
  created_at: string;
}

export interface SiteContent {
  id: string;
  key: string;
  content: Record<string, unknown>;
  updated_at: string;
}

export interface Activity {
  id: string;
  type: string;
  lead_id: string | null;
  description: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Admin {
  id: string;
  email: string;
  role: string;
  name: string | null;
  active: boolean;
  created_at: string;
}

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  service?: string;
  message?: string;
}

export interface ProjectInput {
  name: string;
  slug: string;
  client?: string;
  industry?: string;
  project_type?: string;
  short_description?: string;
  description?: string;
  challenge?: string;
  approach?: string;
  solution?: string;
  system?: string;
  outcome?: string;
  technologies?: string[];
  duration?: string;
  cover_image?: string | null;
  gallery?: string[];
  video_url?: string;
  featured?: boolean;
  published?: boolean;
  display_order?: number;
}
