import { supabase } from '@/lib/supabase';
import type { Service } from '@/types';

export async function fetchPublishedServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function fetchAllServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function fetchServiceBySlug(slug: string): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createService(input: Omit<Service, 'id' | 'updated_at'>): Promise<Service> {
  const { data, error } = await supabase.from('services').insert(input).select().single();
  if (error) throw error;
  return data;
}

export async function updateService(id: string, input: Partial<Service>): Promise<Service> {
  const { data, error } = await supabase
    .from('services')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteService(id: string): Promise<void> {
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw error;
}
