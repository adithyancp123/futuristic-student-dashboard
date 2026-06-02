import { getDashboardData } from '@/lib/supabase/server';
import { SettingsView } from '@/components/dashboard/SettingsView';

// Revalidate on requests to fetch latest Supabase entries
export const revalidate = 0;

export default async function SettingsPage() {
  const data = await getDashboardData();
  return <SettingsView profile={data.profile} />;
}
