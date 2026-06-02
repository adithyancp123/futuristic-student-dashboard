import { useMemo, useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { cn } from '@/lib/utils';

// Simplified types for the dashboard data context
interface Course {
  id: string;
  title: string;
  progress: number; // 0-100
}

interface WeeklyReplayTileProps {
  courses: Course[];
}

// Animation variants for timeline items
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 25, mass: 0.8 },
  },
};

export function WeeklyReplayTile({ courses }: WeeklyReplayTileProps) {
  // Generate a deterministic 7‑day timeline based on supplied courses
  const timeline = useMemo(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const events: Array<{ day: string; icon: string; text: string }> = [];
    const activeCourse = courses.find((c) => c.progress > 0 && c.progress < 100) || courses[0];
    days.forEach((day, idx) => {
      if (idx === 0) {
        events.push({ day, icon: 'BookOpen', text: `+${Math.min(3, Math.floor(activeCourse?.progress ?? 0))} lessons completed` });
      } else if (idx === 1) {
        events.push({ day, icon: 'Flame', text: '🔥 Streak maintained' });
      } else if (idx === 2) {
        events.push({ day, icon: 'TrendingUp', text: '↑ Learning velocity +12%' });
      } else if (idx === 3) {
        events.push({ day, icon: 'Book', text: `${activeCourse?.title ?? 'Course'} revision` });
      } else if (idx === 4) {
        events.push({ day, icon: 'Target', text: '🎯 Milestone reached' });
      } else if (idx === 5) {
        events.push({ day, icon: 'Clock', text: '⏱ 2h focused session' });
      } else {
        events.push({ day, icon: 'ChartLine', text: '📈 Weekly review generated' });
      }
    });
    return events;
  }, [courses]);

  // Replay key forces remount of AnimatePresence to restart animation
  const [replayKey, setReplayKey] = useState(0);
  const handleReplay = () => setReplayKey((k) => k + 1);

  return (
    <motion.div
      variants={itemVariants}
      className={cn('glass-panel', 'p-4', 'rounded-xl', 'border', 'border-white/5', 'bg-white/5', 'shadow-lg')}
    >
      <header className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Your Week in Motion</h3>
        <button onClick={handleReplay} className="text-xs text-indigo-300 hover:text-indigo-100 transition-colors">
          Replay
        </button>
      </header>
      <ul className="space-y-2">
        <AnimatePresence mode="wait" key={replayKey}>
          {timeline.map((ev, i) => (
            <motion.li
              key={ev.day}
              variants={itemVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              transition={{ delay: i * 0.12 }}
              className="flex items-center gap-2 text-xs text-zinc-200"
            >
              <DynamicIcon name={ev.icon} className="h-4 w-4 text-indigo-400" />
              <span className="font-medium">{ev.day}:</span>
              <span>{ev.text}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
}
