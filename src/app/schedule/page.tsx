import { getDashboardData } from '@/lib/supabase/server';
import { ScheduleView } from '@/components/dashboard/ScheduleView';

// Revalidate on requests to fetch latest Supabase entries
export const revalidate = 0;

export default async function SchedulePage() {
  const data = await getDashboardData();
  return <ScheduleView tasks={data.tasks} />;
}
