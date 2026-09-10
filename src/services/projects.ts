import { supabase } from '@/lib/supabase';
import type { Project, ProjectInput } from '@/types';

export async function fetchPublishedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function fetchAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const { data, error } = await supabase.from('projects').insert(input).select().single();
  if (error) throw error;
  return data;
}

export async function updateProject(id: string, input: Partial<ProjectInput>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}

export async function checkSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
  let query = supabase.from('projects').select('id').eq('slug', slug);
  if (excludeId) query = query.neq('id', excludeId);
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return !data;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
