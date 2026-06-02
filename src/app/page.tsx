import { getDashboardData } from '@/lib/supabase/server';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';

// Disable page cache to fetch database modifications
export const revalidate = 0;

export default async function Page() {
  const data = await getDashboardData();
  return <DashboardGrid data={data} />;
}
