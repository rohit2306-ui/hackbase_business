import { supabase } from '@/lib/supabase';
import type { Testimonial } from '@/types';

export async function fetchPublishedTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function fetchAllTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createTestimonial(
  input: Omit<Testimonial, 'id' | 'created_at'>
): Promise<Testimonial> {
  const { data, error } = await supabase.from('testimonials').insert(input).select().single();
  if (error) throw error;
  return data;
}

export async function updateTestimonial(id: string, input: Partial<Testimonial>): Promise<Testimonial> {
  const { data, error } = await supabase
    .from('testimonials')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw error;
}
