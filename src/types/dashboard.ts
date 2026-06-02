export interface StudentProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  streak_days: number;
  xp: number;
  level: number;
  target_xp: number;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  progress: number; // 0 to 100
  lessons_total: number;
  lessons_completed: number;
  icon_name: string;
  accent_color: 'indigo' | 'violet' | 'cyan' | 'emerald' | 'rose';
  created_at: string;
}

export interface ActivityLog {
  id: string;
  day_of_week: string; // "Mon", "Tue", etc.
  hours: number;
  tasks_completed: number;
  created_at: string;
}

export interface DashboardTask {
  id: string;
  title: string;
  due_date: string;
  completed: boolean;
  category: string;
  created_at: string;
}

export interface DashboardData {
  profile: StudentProfile;
  courses: Course[];
  activities: ActivityLog[];
  tasks: DashboardTask[];
}
