import { getDashboardData } from '@/lib/supabase/server';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

// Force dynamic rendering to query fresh database changes on load
export const revalidate = 0;

export default async function Page() {
  const data = await getDashboardData();
  return <DashboardShell data={data} />;
}
