import { supabase } from '@/lib/supabase';
import type { Lead, LeadInput, LeadStatus, LeadPriority } from '@/types';

export async function createLead(input: LeadInput): Promise<Lead> {
  const { data, error } = await supabase.from('leads').insert(input).select().single();
  if (error) throw error;
  return data;
}

export async function fetchAllLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function fetchLeadById(id: string): Promise<Lead | null> {
  const { data, error } = await supabase.from('leads').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function updateLead(
  id: string,
  input: Partial<Omit<Lead, 'id' | 'created_at'>>
): Promise<Lead> {
  const { data, error } = await supabase
    .from('leads')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteLead(id: string): Promise<void> {
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) throw error;
}

export const LEAD_STATUSES: LeadStatus[] = [
  'NEW',
  'CONTACTED',
  'DISCOVERY',
  'PROPOSAL',
  'NEGOTIATION',
  'WON',
  'LOST',
];

export const LEAD_PRIORITIES: LeadPriority[] = ['LOW', 'NORMAL', 'HIGH', 'URGENT'];

export const INDUSTRIES = [
  'Healthcare',
  'HealthTech',
  'Healthcare Operations',
  'Startups',
  'Technology',
  'Digital Businesses',
];

export const SERVICE_OPTIONS = [
  'Healthcare Technology Consulting',
  'Digital Transformation',
  'Patient Workflow Systems',
  'Healthcare Dashboards',
  'Data & Reporting',
  'Custom Healthcare Software',
  'Product Strategy',
  'MVP Development',
  'Product Architecture',
  'Technology Consulting',
  'Automation',
  'Product Engineering',
  'Web Applications',
  'Internal Tools',
  'Admin Platforms',
  'CRM Systems',
  'SaaS Products',
  'APIs & Backend Systems',
  'Cloud Infrastructure',
];
