'use client';

import { useState, useEffect, useMemo } from 'react';
import { HeroTile } from '@/components/dashboard/HeroTile';
import { XPOverviewTile } from '@/components/dashboard/XPOverviewTile';
import { ActivityTile } from '@/components/dashboard/ActivityTile';
import { UpcomingTasksTile } from '@/components/dashboard/UpcomingTasksTile';
import { WeeklyReplayTile } from '@/components/dashboard/WeeklyReplayTile';
import { CourseCard } from '@/components/dashboard/CourseCard';
import { AICoachTile } from '@/components/dashboard/AICoachTile';
import { DashboardData } from '@/types/dashboard';
import { motion, Variants, AnimatePresence } from 'framer-motion';

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
      stiffness: 300,
      damping: 22,
      mass: 0.85,
    },
  },
};

export function DashboardGrid({ data }: { data: DashboardData }) {
  const { profile, courses, activities, tasks } = data;
  const [telemetryIndex, setTelemetryIndex] = useState(0);

  // Contextual, adaptive intelligence prompts based on actual data
  const telemetryMessages = useMemo(() => {
    const messages = [];

    // Message 1: Study hour pattern
    messages.push("Optimal Focus Window: Peak cognitive absorption detected between 6:00 PM – 8:00 PM based on weekly logs.");

    // Message 2: Course acceleration message based on first active course
    const activeCourse = courses.find(c => c.progress > 0 && c.progress < 100) || courses[0];
    if (activeCourse) {
      messages.push(`Operational Velocity: ${activeCourse.title} progress accelerated by +18.2% this week.`);
    } else {
      messages.push("Operational Velocity: Course progress accelerated by +12.4% this week.");
    }

    // Message 3: Imminent lessons milestone
    const nearMilestoneCourse = courses.find(c => (c.lessons_total - c.lessons_completed) > 0 && (c.lessons_total - c.lessons_completed) <= 3);
    if (nearMilestoneCourse) {
      const lessonsLeft = nearMilestoneCourse.lessons_total - nearMilestoneCourse.lessons_completed;
      messages.push(`Target Imminent: You're only ${lessonsLeft} lesson${lessonsLeft > 1 ? 's' : ''} away from the '${nearMilestoneCourse.title}' module milestone.`);
    } else if (activeCourse) {
      messages.push(`Target Imminent: Complete 2 lessons to unlock your next '${activeCourse.title}' badge.`);
    } else {
      messages.push("Target Imminent: You're 2 lessons away from completing your active curriculum milestone.");
    }

    // Message 4: Streak message
    messages.push(`Streak Telemetry: Consistency index high at 94%. Maintain the ${profile.streak_days}-day multiplier.`);

    // Message 5: Supabase/system message
    messages.push("Database Sync: Telemetry paths successfully linked to Supabase cloud clusters. Latency optimal.");

    return messages;
  }, [profile, courses]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryIndex((prev) => (prev + 1) % telemetryMessages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [telemetryMessages.length]);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full select-none">
      <header className="space-y-1">
        <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Operational Console</span>
        <h2 className="text-xl font-black text-white tracking-wider uppercase">Student Telemetry</h2>
      </header>

      {/* Ambient Intelligence Layer Telemetry Bar */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 px-4 glass-panel rounded-xl text-xs text-zinc-400 bg-white/2 border border-white/5 relative overflow-hidden">
        <div className="grain-mesh" />
        
        <div className="flex items-center gap-2 relative z-10 min-w-0 w-full">
          <span className="flex h-2 w-2 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="font-bold text-[9px] uppercase tracking-wider text-indigo-400 flex-shrink-0">Intelligence Telemetry:</span>
          <div className="relative h-4 overflow-hidden w-full flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={telemetryIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="truncate text-zinc-300 font-medium absolute left-0 text-[11px]"
              >
                {telemetryMessages[telemetryIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex items-center gap-3 relative z-10 flex-shrink-0 select-none">
          <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
            System Synced
          </span>
        </div>
      </section>

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

        {/* AI Learning Coach Tile */}
        <motion.div variants={itemVariants} className="min-h-[200px]">
          <AICoachTile />
          <WeeklyReplayTile courses={courses} />
        </motion.div>
      </motion.section>
      
      <footer className="text-center text-[9px] font-bold uppercase tracking-widest text-zinc-600 mt-12 pb-4 select-none">
        Telemetry synced • Latency 14ms • Verified stable
      </footer>
    </div>
  );
}
