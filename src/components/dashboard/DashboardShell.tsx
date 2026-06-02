'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { HeroTile } from '@/components/dashboard/HeroTile';
import { XPOverviewTile } from '@/components/dashboard/XPOverviewTile';
import { ActivityTile } from '@/components/dashboard/ActivityTile';
import { UpcomingTasksTile } from '@/components/dashboard/UpcomingTasksTile';
import { CourseCard } from '@/components/dashboard/CourseCard';
import { DashboardData } from '@/types/dashboard';
import { motion, Variants } from 'framer-motion';

// Hardware accelerated staggered entrance parameters
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 85,
      damping: 14,
    },
  },
};

export function DashboardShell({ data }: { data: DashboardData }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile, courses, activities, tasks } = data;

  return (
    <div className="flex min-h-screen bg-[#030014] text-zinc-50 overflow-hidden font-sans">
      {/* Collapsible Aside Panel */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        avatarUrl={profile.avatar_url}
        studentName={profile.full_name}
        studentLevel={profile.level}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          title="Academy Command"
        />

        {/* Main Grid Viewport */}
        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <header className="space-y-1">
            <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Operational Console</span>
            <h2 className="text-xl font-black text-white tracking-wider uppercase">Student Telemetry</h2>
          </header>

          {/* Staggered entrance bento layout */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[minmax(220px,auto)]"
            aria-label="Student Stats Dashboard"
          >
            {/* Hero Tile (Span 2 cols on tablet/desktop) */}
            <motion.div variants={itemVariants} className="md:col-span-2 min-h-[220px]">
              <HeroTile name={profile.full_name} streakDays={profile.streak_days} />
            </motion.div>

            {/* Level / XP Progress Card */}
            <motion.div variants={itemVariants} className="min-h-[220px]">
              <XPOverviewTile level={profile.level} xp={profile.xp} targetXp={profile.target_xp} />
            </motion.div>

            {/* Weekly Hours Heatmap (Span 2 cols) */}
            <motion.div variants={itemVariants} className="md:col-span-2 min-h-[300px]">
              <ActivityTile activities={activities} />
            </motion.div>

            {/* Academic checklist card */}
            <motion.div variants={itemVariants} className="min-h-[300px]">
              <UpcomingTasksTile initialTasks={tasks} />
            </motion.div>

            {/* Course grid title header (Span 3 cols) */}
            <motion.div variants={itemVariants} className="md:col-span-3 py-2 mt-4">
              <header className="flex justify-between items-center border-b border-white/5 pb-2">
                <h3 className="text-xs font-bold tracking-widest text-white uppercase flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.6)] animate-pulse" />
                  Curriculum Syllabus
                </h3>
                <span className="text-[10px] text-zinc-500 font-bold uppercase">{courses.length} Classes Active</span>
              </header>
            </motion.div>

            {/* Dynamic Courses grid cards */}
            {courses.map((course) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                className="min-h-[200px]"
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 350, damping: 15 } }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.section>
        </main>
      </div>
    </div>
  );
}
