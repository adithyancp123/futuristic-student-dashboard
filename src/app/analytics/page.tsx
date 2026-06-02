import { getDashboardData } from '@/lib/supabase/server';
import { AnalyticsView } from '@/components/dashboard/AnalyticsView';

// Revalidate on requests to fetch latest Supabase entries
export const revalidate = 0;

export default async function AnalyticsPage() {
  const data = await getDashboardData();
  return <AnalyticsView activities={data.activities} profile={data.profile} />;
}
