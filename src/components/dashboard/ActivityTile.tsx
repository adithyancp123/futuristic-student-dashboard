'use client';

import { ActivityLog } from '@/types/dashboard';
import { CardGlowWrapper } from '@/components/ui/CardGlowWrapper';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ActivityTileProps {
  activities: ActivityLog[];
}

export function ActivityTile({ activities }: ActivityTileProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Compute maximum study hour for proportional scaling
  const maxHours = Math.max(...activities.map((a) => a.hours), 1);
  const totalHours = activities.reduce((sum, a) => sum + Number(a.hours), 0);

  return (
    <CardGlowWrapper glowColor="cyan" className="h-full flex flex-col justify-between p-6 bg-gradient-to-br from-cyan-950/10 via-zinc-900/40 to-zinc-950/50">
      <div className="grain-mesh" />
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Weekly Tracker</span>
          <h3 className="text-xl font-bold text-white">Study Velocity</h3>
        </div>
        <div className="text-right">
          <span className="block text-2xl font-black text-cyan-400 leading-none">{totalHours.toFixed(1)}h</span>
          <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Total Hours</span>
        </div>
      </header>

      {/* Semantic List layout for bar chart */}
      <ul className="flex items-end justify-between gap-3 h-36 pt-4 relative" aria-label="Study hours chart">
        {activities.map((act, index) => {
          const heightPercent = (act.hours / maxHours) * 80 + 15; // Proportional height (min 15%)
          
          return (
            <li
              key={act.id}
              className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip Overlay */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-[108%] bg-[#08051e] border border-cyan-500/25 px-2.5 py-1.5 rounded-xl text-center z-20 shadow-2xl w-24 pointer-events-none"
                  >
                    <span className="block text-xs font-bold text-white">{act.hours} hrs</span>
                    <span className="block text-[8px] text-zinc-500 font-medium">{act.tasks_completed} task{act.tasks_completed !== 1 && 's'}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bar background track */}
              <div className="w-full bg-white/5 rounded-t-md overflow-hidden h-24 relative">
                {/* Hardware accelerated scaleY bar filling */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-600/90 to-cyan-400 origin-bottom rounded-t-md"
                  style={{ height: '100%' }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: heightPercent / 100 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 50, damping: 11, delay: index * 0.04 }}
                />
              </div>

              {/* Semantic Date text */}
              <span className="text-[10px] font-bold text-zinc-500 group-hover:text-cyan-400 transition-colors uppercase">
                {act.day_of_week}
              </span>
            </li>
          );
        })}
      </ul>

      <footer className="flex justify-between items-center text-xs text-zinc-500 border-t border-white/5 pt-3 mt-2">
        <div className="flex items-center gap-1.5">
          <DynamicIcon name="Clock" size={13} className="text-cyan-400" />
          <span>Active Streak: Mon - Fri</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
          <span>Productivity Peak</span>
        </div>
      </footer>
    </CardGlowWrapper>
  );
}
