'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // Percentage: 0 to 100
  color?: 'indigo' | 'violet' | 'cyan' | 'emerald' | 'rose';
  className?: string;
}

export function ProgressBar({ value, color = 'indigo', className }: ProgressBarProps) {
  const barColors = {
    indigo: 'from-indigo-600 to-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.2)]',
    violet: 'from-violet-600 to-fuchsia-500 shadow-[0_0_8px_rgba(139,92,246,0.2)]',
    cyan: 'from-cyan-500 to-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.2)]',
    emerald: 'from-emerald-500 to-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.2)]',
    rose: 'from-rose-500 to-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.2)]',
  };

  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn("w-full h-2 bg-white/5 rounded-full overflow-hidden relative", className)}>
      <motion.span
        className={cn(
          "absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-r origin-left rounded-full",
          barColors[color]
        )}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: clampedValue / 100 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 70, damping: 13, mass: 0.9 }}
      />
    </div>
  );
}
