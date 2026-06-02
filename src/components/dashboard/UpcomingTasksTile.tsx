'use client';

import { useState } from 'react';
import { DashboardTask } from '@/types/dashboard';
import { CardGlowWrapper } from '@/components/ui/CardGlowWrapper';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { motion, AnimatePresence } from 'framer-motion';

interface UpcomingTasksTileProps {
  initialTasks: DashboardTask[];
}

export function UpcomingTasksTile({ initialTasks }: UpcomingTasksTileProps) {
  const [tasks, setTasks] = useState<DashboardTask[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'assignment':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'quiz':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'lab':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      default:
        return 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  return (
    <CardGlowWrapper glowColor="rose" className="h-full flex flex-col justify-between p-6 bg-gradient-to-br from-rose-950/10 via-zinc-900/40 to-zinc-950/50">
      <div className="grain-mesh" />
      <header className="flex justify-between items-center mb-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Academic Queue</span>
          <h3 className="text-xl font-bold text-white mt-1">Upcoming Milestones</h3>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <DynamicIcon name="Calendar" size={18} />
        </div>
      </header>

      {/* Semantic list layout for task records */}
      <ul className="space-y-3 flex-1 overflow-y-auto no-scrollbar max-h-56 pr-1" aria-label="Assignment checklist">
        {tasks.map(task => (
          <li
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="flex items-start justify-between gap-3 p-3 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 cursor-pointer transition-all duration-200 select-none group"
          >
            <div className="flex items-start gap-3 min-w-0">
              {/* Animated Checkbox utilizing transform physics */}
              <button
                className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-md border text-white transition-colors flex-shrink-0 cursor-pointer"
                style={{
                  borderColor: task.completed ? 'var(--neon-rose)' : 'rgba(255,255,255,0.2)',
                  backgroundColor: task.completed ? 'var(--neon-rose)' : 'transparent',
                }}
                aria-label={task.completed ? "Mark task incomplete" : "Mark task complete"}
              >
                {task.completed && (
                  <motion.svg
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="h-3 w-3 stroke-[3]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </motion.svg>
                )}
              </button>
              
              <div className="flex flex-col min-w-0">
                <span
                  className="text-xs font-semibold text-white truncate transition-all duration-300"
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    opacity: task.completed ? 0.45 : 1,
                  }}
                >
                  {task.title}
                </span>
                <span className="text-[10px] text-zinc-500 mt-0.5 font-medium">{task.due_date}</span>
              </div>
            </div>

            {/* Custom styled category badge */}
            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex-shrink-0 ${getCategoryColor(task.category)}`}>
              {task.category}
            </span>
          </li>
        ))}
      </ul>

      <footer className="text-right border-t border-white/5 pt-3 mt-4">
        <span className="text-[10px] text-zinc-500 font-medium">
          {tasks.filter(t => t.completed).length} of {tasks.length} objectives finished
        </span>
      </footer>
    </CardGlowWrapper>
  );
}
