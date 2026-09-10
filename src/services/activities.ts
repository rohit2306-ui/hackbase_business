import { supabase } from '@/lib/supabase';
import type { Activity } from '@/types';

export async function fetchActivitiesByLeadId(leadId: string): Promise<Activity[]> {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createActivity(input: Omit<Activity, 'id' | 'created_at'>): Promise<Activity> {
  const { data, error } = await supabase.from('activities').insert(input).select().single();
  if (error) throw error;
  return data;
}

export async function fetchRecentActivities(limit = 10): Promise<Activity[]> {
  const { data, error } = await supabase
    .from('activities')
    .select('*, leads(name)')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data || [];
}
