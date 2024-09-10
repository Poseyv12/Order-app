import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getMenuItems() {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
  if (error) console.error('Error fetching menu items:', error)
  return data || []
}