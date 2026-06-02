-- ----------------------------------------------------
-- 1. DATABASE SCHEMA CREATION
-- ----------------------------------------------------

-- Profile table tracking student metadata
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    streak_days INTEGER DEFAULT 0 NOT NULL,
    xp INTEGER DEFAULT 0 NOT NULL,
    level INTEGER DEFAULT 1 NOT NULL,
    target_xp INTEGER DEFAULT 1000 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Courses table tracking learning paths
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    instructor TEXT NOT NULL,
    progress INTEGER DEFAULT 0 NOT NULL CONSTRAINT progress_range CHECK (progress >= 0 AND progress <= 100),
    lessons_total INTEGER DEFAULT 1 NOT NULL,
    lessons_completed INTEGER DEFAULT 0 NOT NULL CONSTRAINT lessons_range CHECK (lessons_completed <= lessons_total),
    icon_name TEXT NOT NULL,
    accent_color TEXT DEFAULT 'indigo' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activity table tracking weekly study stats
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_of_week VARCHAR(3) NOT NULL,
    hours NUMERIC(4, 2) DEFAULT 0 NOT NULL,
    tasks_completed INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tasks table tracking upcoming assignments and quizzes
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    due_date TEXT NOT NULL,
    completed BOOLEAN DEFAULT false NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------
-- 2. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Allow public read access to dashboards for testing/reviewing
CREATE POLICY "Allow public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read activities" ON public.activities FOR SELECT USING (true);
CREATE POLICY "Allow public read tasks" ON public.tasks FOR SELECT USING (true);

-- ----------------------------------------------------
-- 3. HIGH-FIDELITY SEED DATA
-- ----------------------------------------------------

-- Reset existing data (optional for clean seeds)
TRUNCATE public.profiles RESTART IDENTITY CASCADE;
TRUNCATE public.courses RESTART IDENTITY CASCADE;
TRUNCATE public.activities RESTART IDENTITY CASCADE;
TRUNCATE public.tasks RESTART IDENTITY CASCADE;

-- Insert Mock Student Profile
INSERT INTO public.profiles (id, full_name, avatar_url, streak_days, xp, level, target_xp)
VALUES (
    '8ca9bc53-2947-4fbd-8141-ea4563a35d79',
    'Alex Rivera',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    18,
    720,
    4,
    1000
);

-- Insert Mock Courses
INSERT INTO public.courses (title, category, instructor, progress, lessons_total, lessons_completed, icon_name, accent_color)
VALUES 
('Advanced Web Architectures', 'Development', 'Dr. Sarah Connor', 78, 18, 14, 'Code', 'indigo'),
('Machine Learning Essentials', 'Data Science', 'Prof. Alan Turing', 45, 20, 9, 'Brain', 'fuchsia'),
('UI/UX Glassmorphism Lab', 'Design', 'Diana Prince', 90, 10, 9, 'BookOpen', 'cyan'),
('Distributed Systems & SQL', 'Database', 'Linus Torvalds', 20, 15, 3, 'Database', 'emerald'),
('Cloud Architecture & Security', 'Security', 'Grace Hopper', 0, 12, 0, 'Shield', 'rose');

-- Insert Mock Weekly Study Log
INSERT INTO public.activities (day_of_week, hours, tasks_completed)
VALUES 
('Mon', 2.5, 3),
('Tue', 4.0, 5),
('Wed', 1.5, 1),
('Thu', 3.0, 4),
('Fri', 5.5, 6),
('Sat', 2.0, 2),
('Sun', 0.5, 0);

-- Insert Upcoming Tasks Checklist
INSERT INTO public.tasks (title, due_date, completed, category)
VALUES 
('Submit Web Architecture Case Study', 'Today, 11:59 PM', false, 'Assignment'),
('Complete Neural Networks Quiz', 'Tomorrow, 5:00 PM', false, 'Quiz'),
('Review Glassmorphism UI Polish', 'Jun 05, 2026', true, 'Task'),
('Prepare Distributed Systems Proposal', 'Jun 07, 2026', false, 'Assignment'),
('Setup Supabase Client Webhook', 'Jun 10, 2026', false, 'Lab');
