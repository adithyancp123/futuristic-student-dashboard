'use client';

import { ActivityLog, StudentProfile } from '@/types/dashboard';
import { CardGlowWrapper } from '@/components/ui/CardGlowWrapper';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { motion, Variants } from 'framer-motion';

interface AnalyticsViewProps {
  activities: ActivityLog[];
  profile: StudentProfile;
}

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
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 90, damping: 14 },
  },
};

export function AnalyticsView({ activities, profile }: AnalyticsViewProps) {
  const totalHours = activities.reduce((sum, a) => sum + Number(a.hours), 0);
  const avgHours = totalHours / activities.length;
  const completedTasks = activities.reduce((sum, a) => sum + a.tasks_completed, 0);

  // Proportional metrics
  const studyEfficiency = Math.min((completedTasks / (totalHours || 1)) * 25, 100);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="space-y-1">
        <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">System Telemetry</span>
        <h2 className="text-xl font-black text-white tracking-wider uppercase">Learning Intelligence</h2>
      </header>

      {/* Main Grid bento layout */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]"
      >
        {/* Metric 1: Productivity Overview */}
        <motion.div variants={itemVariants} className="min-h-[200px]">
          <CardGlowWrapper glowColor="indigo" className="h-full p-6 flex flex-col justify-between bg-gradient-to-br from-zinc-900/40 to-zinc-950/60 relative group">
            <div className="grain-mesh" />
            <header className="flex justify-between items-start relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Resource Output</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <DynamicIcon name="TrendingUp" size={18} />
              </div>
            </header>
            <div className="my-4 relative z-10">
              <span className="block text-3xl font-black text-white tracking-tight">{completedTasks}</span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase mt-1">Milestones Completed This Week</span>
            </div>
            <footer className="relative z-10 pt-3 border-t border-white/5">
              <span className="text-xs text-zinc-500">Average of {(completedTasks / 7).toFixed(1)} operations daily</span>
            </footer>
          </CardGlowWrapper>
        </motion.div>

        {/* Metric 2: Efficiency Progress Ring */}
        <motion.div variants={itemVariants} className="min-h-[200px] md:row-span-2">
          <CardGlowWrapper glowColor="violet" className="h-full p-6 flex flex-col justify-between bg-gradient-to-br from-zinc-900/40 to-zinc-950/60 relative group">
            <div className="grain-mesh" />
            <header className="flex justify-between items-start relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Operational Index</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                <DynamicIcon name="Award" size={18} />
              </div>
            </header>
            
            {/* Animated SVG circular progress ring */}
            <div className="flex flex-col items-center justify-center py-6 relative z-10">
              <div className="relative h-32 w-32">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="stroke-white/5 fill-transparent stroke-[8]" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-violet-500 fill-transparent stroke-[8] stroke-linecap-round"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    whileInView={{ strokeDashoffset: 251.2 - (251.2 * studyEfficiency) / 100 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 40, damping: 10, delay: 0.1 }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white">{studyEfficiency.toFixed(0)}%</span>
                  <span className="text-[8px] uppercase tracking-wider text-zinc-500 font-bold">Velocity</span>
                </div>
              </div>
            </div>

            <footer className="relative z-10 pt-3 border-t border-white/5 text-center">
              <span className="text-xs text-zinc-400">Efficiency rating: <b>Optimal</b></span>
            </footer>
          </CardGlowWrapper>
        </motion.div>

        {/* Metric 3: Time Analysis */}
        <motion.div variants={itemVariants} className="min-h-[200px]">
          <CardGlowWrapper glowColor="cyan" className="h-full p-6 flex flex-col justify-between bg-gradient-to-br from-zinc-900/40 to-zinc-950/60 relative group">
            <div className="grain-mesh" />
            <header className="flex justify-between items-start relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Temporal Stats</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <DynamicIcon name="Clock" size={18} />
              </div>
            </header>
            <div className="my-4 relative z-10">
              <span className="block text-3xl font-black text-white tracking-tight">{avgHours.toFixed(1)}h</span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase mt-1">Average Daily Activity</span>
            </div>
            <footer className="relative z-10 pt-3 border-t border-white/5">
              <span className="text-xs text-zinc-500">Weekly activity totaling {totalHours.toFixed(1)} hours</span>
            </footer>
          </CardGlowWrapper>
        </motion.div>

        {/* Metric 4: XP projection */}
        <motion.div variants={itemVariants} className="min-h-[200px] md:col-span-2">
          <CardGlowWrapper glowColor="emerald" className="h-full p-6 flex flex-col justify-between bg-gradient-to-br from-zinc-900/40 to-zinc-950/60 relative group">
            <div className="grain-mesh" />
            <header className="flex justify-between items-start relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Exp Telemetry</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <DynamicIcon name="Terminal" size={18} />
              </div>
            </header>
            
            <section className="space-y-4 my-4 relative z-10 flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold">XP Level {profile.level}</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-extrabold text-white">{profile.xp}</span>
                    <span className="text-xs text-zinc-500">/ {profile.target_xp} XP</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold">Daily Streak</span>
                  <span className="block text-lg font-extrabold text-emerald-400">{profile.streak_days} Days</span>
                </div>
              </div>
              <ProgressBar value={(profile.xp / profile.target_xp) * 100} color="emerald" />
            </section>

            <footer className="relative z-10 pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-zinc-500">
              <DynamicIcon name="Flame" size={13} className="text-emerald-400 animate-pulse" />
              <span>Streak rank active: Top 5% of active students globally</span>
            </footer>
          </CardGlowWrapper>
        </motion.div>
      </motion.section>
    </div>
  );
}
