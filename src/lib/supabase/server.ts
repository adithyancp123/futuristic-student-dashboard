import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { DashboardData, StudentProfile, Course, ActivityLog, DashboardTask } from '@/types/dashboard';

// High-Fidelity local Mock Data Fallback Engine
const MOCK_PROFILE: StudentProfile = {
  id: '8ca9bc53-2947-4fbd-8141-ea4563a35d79',
  full_name: 'Alex Rivera',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
  streak_days: 18,
  xp: 720,
  level: 4,
  target_xp: 1000,
  created_at: new Date().toISOString()
};

const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Advanced Web Architectures',
    category: 'Development',
    instructor: 'Dr. Sarah Connor',
    progress: 78,
    lessons_total: 18,
    lessons_completed: 14,
    icon_name: 'Code',
    accent_color: 'indigo',
    created_at: new Date().toISOString()
  },
  {
    id: 'c2',
    title: 'Machine Learning Essentials',
    category: 'Data Science',
    instructor: 'Prof. Alan Turing',
    progress: 45,
    lessons_total: 20,
    lessons_completed: 9,
    icon_name: 'Brain',
    accent_color: 'violet',
    created_at: new Date().toISOString()
  },
  {
    id: 'c3',
    title: 'UI/UX Glassmorphism Lab',
    category: 'Design',
    instructor: 'Diana Prince',
    progress: 90,
    lessons_total: 10,
    lessons_completed: 9,
    icon_name: 'BookOpen',
    accent_color: 'cyan',
    created_at: new Date().toISOString()
  },
  {
    id: 'c4',
    title: 'Distributed Systems & SQL',
    category: 'Database',
    instructor: 'Linus Torvalds',
    progress: 20,
    lessons_total: 15,
    lessons_completed: 3,
    icon_name: 'Database',
    accent_color: 'emerald',
    created_at: new Date().toISOString()
  },
  {
    id: 'c5',
    title: 'Cloud Architecture & Security',
    category: 'Security',
    instructor: 'Grace Hopper',
    progress: 0,
    lessons_total: 12,
    lessons_completed: 0,
    icon_name: 'Shield',
    accent_color: 'rose',
    created_at: new Date().toISOString()
  }
];

const MOCK_ACTIVITIES: ActivityLog[] = [
  { id: 'a1', day_of_week: 'Mon', hours: 2.5, tasks_completed: 3, created_at: new Date().toISOString() },
  { id: 'a2', day_of_week: 'Tue', hours: 4.0, tasks_completed: 5, created_at: new Date().toISOString() },
  { id: 'a3', day_of_week: 'Wed', hours: 1.5, tasks_completed: 1, created_at: new Date().toISOString() },
  { id: 'a4', day_of_week: 'Thu', hours: 3.0, tasks_completed: 4, created_at: new Date().toISOString() },
  { id: 'a5', day_of_week: 'Fri', hours: 5.5, tasks_completed: 6, created_at: new Date().toISOString() },
  { id: 'a6', day_of_week: 'Sat', hours: 2.0, tasks_completed: 2, created_at: new Date().toISOString() },
  { id: 'a7', day_of_week: 'Sun', hours: 0.5, tasks_completed: 0, created_at: new Date().toISOString() }
];

const MOCK_TASKS: DashboardTask[] = [
  { id: 't1', title: 'Submit Web Architecture Case Study', due_date: 'Today, 11:59 PM', completed: false, category: 'Assignment', created_at: new Date().toISOString() },
  { id: 't2', title: 'Complete Neural Networks Quiz', due_date: 'Tomorrow, 5:00 PM', completed: false, category: 'Quiz', created_at: new Date().toISOString() },
  { id: 't3', title: 'Review Glassmorphism UI Polish', due_date: 'Jun 05, 2026', completed: true, category: 'Task', created_at: new Date().toISOString() },
  { id: 't4', title: 'Prepare Distributed Systems Proposal', due_date: 'Jun 07, 2026', completed: false, category: 'Assignment', created_at: new Date().toISOString() },
  { id: 't5', title: 'Setup Supabase Client Webhook', due_date: 'Jun 10, 2026', completed: false, category: 'Lab', created_at: new Date().toISOString() }
];

export async function getDashboardData(): Promise<DashboardData> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      profile: MOCK_PROFILE,
      courses: MOCK_COURSES,
      activities: MOCK_ACTIVITIES,
      tasks: MOCK_TASKS
    };
  }

  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Safe fail when called from Server Components during static paths build
            }
          },
        },
      }
    );

    // Fetch dashboard components in parallel
    const [profileRes, coursesRes, activitiesRes, tasksRes] = await Promise.all([
      supabase.from('profiles').select('*').single(),
      supabase.from('courses').select('*').order('created_at', { ascending: true }),
      supabase.from('activities').select('*').order('created_at', { ascending: true }),
      supabase.from('tasks').select('*').order('created_at', { ascending: true })
    ]);

    // Check query results, fall back if tables are empty/missing
    if (profileRes.error || !profileRes.data) {
      console.warn('Supabase query failed. Falling back to local high-fidelity seeds.', profileRes.error);
      return {
        profile: MOCK_PROFILE,
        courses: MOCK_COURSES,
        activities: MOCK_ACTIVITIES,
        tasks: MOCK_TASKS
      };
    }

    return {
      profile: profileRes.data as StudentProfile,
      courses: (coursesRes.data || []) as Course[],
      activities: (activitiesRes.data || []) as ActivityLog[],
      tasks: (tasksRes.data || []) as DashboardTask[]
    };

  } catch (error) {
    console.error('Unexpected Supabase connection error. Running dashboard via fallback layer:', error);
    return {
      profile: MOCK_PROFILE,
      courses: MOCK_COURSES,
      activities: MOCK_ACTIVITIES,
      tasks: MOCK_TASKS
    };
  }
}
