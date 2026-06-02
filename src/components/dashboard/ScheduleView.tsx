'use client';

import { DashboardTask } from '@/types/dashboard';
import { CardGlowWrapper } from '@/components/ui/CardGlowWrapper';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { motion, Variants } from 'framer-motion';

interface ScheduleViewProps {
  tasks: DashboardTask[];
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

const WEEKDAYS = [
  { day: 'Mon', date: '01', active: false },
  { day: 'Tue', date: '02', active: true }, // Set current day as active
  { day: 'Wed', date: '03', active: false },
  { day: 'Thu', date: '04', active: false },
  { day: 'Fri', date: '05', active: false },
  { day: 'Sat', date: '06', active: false },
  { day: 'Sun', date: '07', active: false },
];

export function ScheduleView({ tasks }: ScheduleViewProps) {
  const pendingTasks = tasks.filter((t) => !t.completed);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
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
              {WEEKDAYS.map((wk) => (
                <li
                  key={wk.day}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                    wk.active
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.3)]'
                      : 'bg-white/2 border-white/5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold tracking-wider">{wk.day}</span>
                  <span className="text-lg font-black mt-1 leading-none">{wk.date}</span>
                  {wk.active && <span className="h-1.5 w-1.5 rounded-full bg-white mt-1.5" />}
                </li>
              ))}
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
                <h4 className="text-sm font-bold text-white uppercase">Today's Agenda</h4>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <DynamicIcon name="Terminal" size={18} />
              </div>
            </header>

            {/* Time Slots grid list */}
            <ul className="space-y-3 relative z-10 flex-1 pr-1 overflow-y-auto no-scrollbar max-h-60" aria-label="Agenda schedule">
              <li className="flex gap-3">
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 w-12 flex-shrink-0 mt-0.5">09:00 AM</span>
                <div className="flex-grow border-l-2 border-cyan-500 bg-cyan-500/5 px-2.5 py-1.5 rounded-lg">
                  <span className="block text-xs font-semibold text-white">Algorithms Review</span>
                  <span className="text-[8px] text-zinc-400">Lab session</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 w-12 flex-shrink-0 mt-0.5">01:30 PM</span>
                <div className="flex-grow border-l-2 border-indigo-500 bg-indigo-500/5 px-2.5 py-1.5 rounded-lg">
                  <span className="block text-xs font-semibold text-white">UI Refactoring</span>
                  <span className="text-[8px] text-zinc-400">Fronted design</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 w-12 flex-shrink-0 mt-0.5">04:00 PM</span>
                <div className="flex-grow border-l-2 border-zinc-700 bg-white/2 px-2.5 py-1.5 rounded-lg">
                  <span className="block text-xs font-semibold text-white">Review SQL quiz</span>
                  <span className="text-[8px] text-zinc-400">Database study</span>
                </div>
              </li>
            </ul>
          </CardGlowWrapper>
        </motion.div>
      </motion.section>
    </div>
  );
}
