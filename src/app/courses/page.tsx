import { getDashboardData } from '@/lib/supabase/server';
import { CoursesView } from '@/components/dashboard/CoursesView';

// Revalidate on requests to fetch latest Supabase entries
export const revalidate = 0;

export default async function CoursesPage() {
  const data = await getDashboardData();
  return <CoursesView courses={data.courses} />;
}
