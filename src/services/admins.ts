import { supabase } from '@/lib/supabase';
import type { Admin } from '@/types';

export async function checkAdminStatus(uid: string): Promise<Admin | null> {
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('id', uid)
    .eq('active', true)
    .maybeSingle();
  if (error) throw error;
  return data;
}
