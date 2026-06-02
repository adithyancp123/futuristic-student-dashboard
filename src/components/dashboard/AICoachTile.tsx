'use client';

import { useEffect, useState, useCallback } from 'react';
import { CardGlowWrapper } from '@/components/ui/CardGlowWrapper';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { motion, AnimatePresence } from 'framer-motion';

const recommendations = [
  "Continue Advanced React Patterns",
  "Recommended Focus: Compiler Design",
  "You're 2 lessons away from milestone",
  "Best productivity window: 6–8 PM",
  "Learning velocity up 12% this week",
  "Estimated completion time: 38 min",
];

export function AICoachTile() {
  const [index, setIndex] = useState(0);
  const [list, setList] = useState(recommendations);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % list.length);
  }, [list]);

  const refresh = () => {
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    setList(shuffled);
    setTimeout(() => setIndex(0), 0);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <CardGlowWrapper glowColor="cyan" className="h-full flex flex-col p-6 bg-gradient-to-br from-cyan-950/10 via-zinc-900/40 to-zinc-950/50 relative">
      <div className="grain-mesh" />
      <header className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <DynamicIcon name="Cpu" size={20} className="text-cyan-400" />
          <h3 className="text-sm font-bold text-white">Learning Coach</h3>
        </div>
        <button
          onClick={refresh}
          className="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
          aria-label="Refresh recommendations"
        >
          <DynamicIcon name="RefreshCw" size={18} />
        </button>
      </header>

      {/* AI pulse indicator */}
      <div className="relative mb-2">
        <span className="absolute inset-0 rounded-md bg-cyan-400/10 blur-xl opacity-0 animate-pulse" />
        <motion.div
          className="relative z-10 flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <DynamicIcon name="Zap" size={16} className="text-cyan-400" />
          <span className="text-xs text-cyan-300 font-medium">AI ACTIVE</span>
        </motion.div>
      </div>

      {/* Recommendation text */}
      <section className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            className="text-center text-sm font-medium text-white leading-snug"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            {list[index]}
          </motion.p>
        </AnimatePresence>
      </section>
    </CardGlowWrapper>
  );
}
