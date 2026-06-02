'use client';

import { useState, useMemo } from 'react';
import { DashboardTask } from '@/types/dashboard';
import { CardGlowWrapper } from '@/components/ui/CardGlowWrapper';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { motion, Variants, AnimatePresence } from 'framer-motion';

interface ScheduleViewProps {
  tasks: DashboardTask[];
}

interface AgendaItem {
  time: string;
  title: string;
  category: string;
  color: 'cyan' | 'indigo' | 'zinc' | 'emerald';
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
    transition: { type: 'spring', stiffness: 300, damping: 22, mass: 0.85 },
  },
};

const WEEKDAYS = [
  { day: 'Mon', date: '01' },
  { day: 'Tue', date: '02' },
  { day: 'Wed', date: '03' },
  { day: 'Thu', date: '04' },
  { day: 'Fri', date: '05' },
  { day: 'Sat', date: '06' },
  { day: 'Sun', date: '07' },
];

const BASE_AGENDA: Record<string, AgendaItem[]> = {
  '01': [
    { time: '09:30 AM', title: 'Next.js 15 Foundations', category: 'App Architecture', color: 'indigo' },
    { time: '02:00 PM', title: 'TypeScript Advanced Types', category: 'Type Safety', color: 'zinc' },
  ],
  '02': [
    { time: '09:00 AM', title: 'Algorithms Review', category: 'Lab session', color: 'cyan' },
    { time: '01:30 PM', title: 'UI Refactoring', category: 'Frontend design', color: 'indigo' },
    { time: '04:00 PM', title: 'Review SQL quiz', category: 'Database study', color: 'zinc' },
  ],
  '03': [
    { time: '10:00 AM', title: 'Supabase Data Modeling', category: 'Backend integration', color: 'emerald' },
    { time: '03:00 PM', title: 'Group Sync & Code Review', category: 'Collaboration', color: 'indigo' },
  ],
  '04': [
    { time: '08:30 AM', title: 'Framer Motion spring physics', category: 'Interface animation', color: 'cyan' },
    { time: '01:00 PM', title: 'Security RLS Policies', category: 'Database security', color: 'zinc' },
  ],
  '05': [
    { time: '11:00 AM', title: 'System Deployment Sandbox', category: 'Operations', color: 'emerald' },
    { time: '04:30 PM', title: 'Weekly Recap Quiz', category: 'Evaluation', color: 'cyan' },
  ],
};

export function ScheduleView({ tasks }: ScheduleViewProps) {
  const [selectedDate, setSelectedDate] = useState('02');
  const [customAgendas, setCustomAgendas] = useState<Record<string, AgendaItem[]>>({});

  const pendingTasks = tasks.filter((t) => !t.completed);

  // Compute active agenda items combining base agenda and custom injected items
  const activeAgenda = useMemo(() => {
    const base = BASE_AGENDA[selectedDate] || [];
    const custom = customAgendas[selectedDate] || [];
    return [...base, ...custom];
  }, [selectedDate, customAgendas]);

  // Handle dynamic study session injection
  const handleInjectSession = () => {
    const newSession: AgendaItem = {
      time: '11:00 AM',
      title: 'Self-directed Deep Work',
      category: 'Productivity sync',
      color: 'emerald',
    };
    setCustomAgendas((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newSession],
    }));
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full select-none">
      {/* Header */}
      <header className="space-y-1">
        <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Operational Planner</span>
        <h2 className="text-xl font-black text-white tracking-wider uppercase">Syllabus Chronology</h2>
      </header>

      {/* Main layout */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 xl:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]"
      >
        {/* Weekly Calendar Widget (Span 3 on XL) */}
        <motion.div variants={itemVariants} className="xl:col-span-3 min-h-[160px]">
          <CardGlowWrapper glowColor="indigo" className="h-full p-6 flex flex-col justify-between bg-gradient-to-br from-zinc-900/40 to-zinc-950/60 relative group">
            <div className="grain-mesh" />
            <header className="flex justify-between items-center relative z-10 mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">June 2026</h3>
              <div className="flex gap-2">
                <button className="p-1 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white cursor-pointer" aria-label="Previous Month">
                  <DynamicIcon name="ChevronLeft" size={16} />
                </button>
                <button className="p-1 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white cursor-pointer" aria-label="Next Month">
                  <DynamicIcon name="ChevronRight" size={16} />
                </button>
              </div>
            </header>

            {/* Horizontal dates calendar */}
            <ul className="grid grid-cols-7 gap-2 relative z-10" aria-label="Weekly planner calendar">
              {WEEKDAYS.map((wk) => {
                const isActive = selectedDate === wk.date;
                return (
                  <li
                    key={wk.day}
                    onClick={() => setSelectedDate(wk.date)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.3)]'
                        : 'bg-white/2 border-white/5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider">{wk.day}</span>
                    <span className="text-lg font-black mt-1 leading-none">{wk.date}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white mt-1.5" />}
                  </li>
                );
              })}
            </ul>
          </CardGlowWrapper>
        </motion.div>

        {/* Milestone Timeline (Span 2) */}
        <motion.div variants={itemVariants} className="xl:col-span-2 min-h-[300px]">
          <CardGlowWrapper glowColor="rose" className="h-full p-6 flex flex-col justify-between bg-gradient-to-br from-zinc-900/40 to-zinc-950/60 relative group">
            <div className="grain-mesh" />
            <header className="flex justify-between items-start relative z-10 mb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Curriculum Deadlines</span>
                <h4 className="text-sm font-bold text-white uppercase">Critical Deadlines</h4>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <DynamicIcon name="Calendar" size={18} />
              </div>
            </header>

            {/* Timeline elements */}
            {pendingTasks.length > 0 ? (
              <ul className="space-y-4 relative z-10 flex-1 pr-1 overflow-y-auto no-scrollbar max-h-60" aria-label="Critical syllabus tasks">
                {pendingTasks.map((task) => (
                  <li key={task.id} className="flex items-start gap-4 relative group/item select-none">
                    {/* Visual dot path */}
                    <div className="flex flex-col items-center mt-1 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
                      <div className="w-[1px] h-12 bg-white/10 group-last-of-type/item:hidden" />
                    </div>
                    
                    <div className="flex-1 bg-white/2 border border-white/5 hover:border-white/10 p-3 rounded-xl transition-all duration-200">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-bold text-white line-clamp-1">{task.title}</span>
                        <span className="text-[8px] font-black uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded-full flex-shrink-0">
                          {task.category}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1 font-semibold flex items-center gap-1">
                        <DynamicIcon name="Clock" size={10} className="text-rose-400" />
                        Due: {task.due_date}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-10 relative z-10">
                <p className="text-xs text-zinc-500">All tasks completed successfully.</p>
              </div>
            )}
          </CardGlowWrapper>
        </motion.div>

        {/* Daily Schedule Overview (Span 1) */}
        <motion.div variants={itemVariants} className="min-h-[300px]">
          <CardGlowWrapper glowColor="cyan" className="h-full p-6 flex flex-col justify-between bg-gradient-to-br from-zinc-900/40 to-zinc-950/60 relative group">
            <div className="grain-mesh" />
            <header className="flex justify-between items-start relative z-10 mb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Agenda Overview</span>
                <h4 className="text-sm font-bold text-white uppercase">Daily Agenda</h4>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <DynamicIcon name="Terminal" size={18} />
              </div>
            </header>

            {/* Time Slots grid list / Empty State rest check */}
            <div className="flex-1 flex flex-col justify-between relative z-10 min-h-0">
              <AnimatePresence mode="wait">
                {activeAgenda.length > 0 ? (
                  <motion.ul
                    key="agenda-list"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 pr-1 overflow-y-auto no-scrollbar max-h-60"
                    aria-label="Agenda schedule"
                  >
                    {activeAgenda.map((item, idx) => {
                      let borderCol = 'border-cyan-500 bg-cyan-500/5';
                      if (item.color === 'indigo') borderCol = 'border-indigo-500 bg-indigo-500/5';
                      else if (item.color === 'emerald') borderCol = 'border-emerald-500 bg-emerald-500/5';
                      else if (item.color === 'zinc') borderCol = 'border-zinc-700 bg-white/2';

                      return (
                        <li key={idx} className="flex gap-3">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 w-12 flex-shrink-0 mt-0.5">{item.time}</span>
                          <div className={`flex-grow border-l-2 ${borderCol} px-2.5 py-1.5 rounded-lg`}>
                            <span className="block text-xs font-semibold text-white">{item.title}</span>
                            <span className="text-[8px] text-zinc-400">{item.category}</span>
                          </div>
                        </li>
                      );
                    })}
                  </motion.ul>
                ) : (
                  <motion.div
                    key="agenda-empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="flex flex-col items-center justify-center p-6 text-center h-full min-h-[220px] space-y-4"
                  >
                    {/* Rest illustration */}
                    <div className="relative flex items-center justify-center h-14 w-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 animate-float shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                      <div className="absolute inset-0 rounded-full border border-cyan-500/10 animate-pulseGlow" />
                      <DynamicIcon name="Coffee" size={20} />
                    </div>
                    
                    <div className="space-y-1">
                      <h5 className="text-xs font-extrabold text-white uppercase tracking-wider">Curriculum Rest State</h5>
                      <p className="text-[10px] text-zinc-500 font-semibold max-w-[200px] leading-relaxed mx-auto">
                        No calendar syncs scheduled. Use this downtime to solidify concepts and recharge cognitive energy.
                      </p>
                    </div>

                    <button
                      onClick={handleInjectSession}
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[9px] uppercase tracking-wider transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)] hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer border border-cyan-400/20"
                    >
                      Inject Sync Session
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardGlowWrapper>
        </motion.div>
      </motion.section>
      
      <footer className="text-center text-[9px] font-bold uppercase tracking-widest text-zinc-600 mt-12 pb-4 select-none">
        Telemetry synced • Latency 14ms • Verified stable
      </footer>
    </div>
  );
}
