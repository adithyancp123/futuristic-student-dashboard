'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

export function OnboardingOverlay() {
  // Lazy initialise visibility based on localStorage flag
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('has_onboarded_v2');
    }
    return false;
  });
  const [stage, setStage] = useState(0);

  const handleComplete = useCallback(() => {
    localStorage.setItem('has_onboarded_v2', 'true');
    setVisible(false);
  }, []);

  // Progress stages when overlay is visible
  useEffect(() => {
    if (!visible) return;
    const timers = [
      setTimeout(() => setStage(1), 750),
      setTimeout(() => setStage(2), 1500),
      setTimeout(() => setStage(3), 2250),
      setTimeout(() => handleComplete(), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible, handleComplete]);

  const stages = [
    { title: 'Establishing Telemetry Sync', desc: 'Syncing cognitive nodes with system mainframes...' },
    { title: 'Resolving Supabase Clusters', desc: 'Optimizing data pipelines and active route endpoints...' },
    { title: 'Calibrating Visual Compositor', desc: 'Accelerating GPU interfaces for native frame rates...' },
    { title: 'Academy Interface Secured', desc: 'Welcome back. Terminal console online.' },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014] text-zinc-300 select-none overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06)_0%,transparent_60%)]" />
          <div className="grain-mesh opacity-10" />
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-full max-w-sm p-8 glass-panel border border-white/10 rounded-2xl flex flex-col justify-between items-center text-center space-y-6 relative"
          >
            <div className="relative h-16 w-16 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-indigo-500/20 animate-ping opacity-25" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-t-indigo-500 border-r-indigo-500/20 border-b-indigo-500/10 border-l-indigo-500/5 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
              />
              <DynamicIcon name="Award" className="text-indigo-400 relative z-10 animate-pulse" size={24} />
            </div>
            <div className="space-y-2 h-16 flex flex-col justify-center">
              <AnimatePresence mode="sync">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="space-y-1"
                >
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    {stages[stage]?.title}
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-semibold leading-relaxed">
                    {stages[stage]?.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-indigo-500"
                initial={{ width: '0%' }}
                animate={{ width: `${((stage + 1) / stages.length) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </div>
            <button
              onClick={handleComplete}
              className="absolute top-2 right-4 text-[9px] font-bold text-zinc-500 hover:text-white uppercase tracking-wider bg-white/3 border border-white/5 px-2 py-0.5 rounded transition-colors"
            >
              Skip Sync
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
