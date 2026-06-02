'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define ambient moods
type Mood = 'morning' | 'afternoon' | 'evening' | 'night';

// Map moods to CSS variable values (glow colors, background opacity)
const moodMap: Record<Mood, { '--ambient-glow': string; '--ambient-bg': string }> = {
  morning: { '--ambient-glow': '#6ee7b7', '--ambient-bg': '#0ea5e9' }, // soft teal/cyan
  afternoon: { '--ambient-glow': '#6366f1', '--ambient-bg': '#8b5cf6' }, // balanced indigo
  evening: { '--ambient-glow': '#c084fc', '--ambient-bg': '#6366f1' }, // warm purple blend
  night: { '--ambient-glow': '#6366f1', '--ambient-bg': '#111827' }, // deep dark with neon indigo
};

/**
 * AmbientProvider applies a subtle time‑based ambience to the whole app.
 * It sets CSS variables on the root element and renders a low‑opacity animated
 * background gradient that uses only transform/opacity for GPU acceleration.
 */
export function AmbientProvider({ children }: { children: React.ReactNode }) {
  const [mood, setMood] = useState<Mood>('morning');
  // Determine mood on client mount to avoid SSR mismatch
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    let current: Mood = 'morning';
    if (hour >= 5 && hour < 11) current = 'morning';
    else if (hour >= 11 && hour < 17) current = 'afternoon';
    else if (hour >= 17 && hour < 21) current = 'evening';
    else current = 'night';
// eslint-disable-next-line react-hooks/set-state-in-effect
    setMood(current);
  }, []);

useEffect(() => {
  const root = document.documentElement;
  const vars = moodMap[mood];
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.dataset.ambientMood = mood;
}, [mood]);

  const infoMap: Record<Mood, string> = {
    morning: 'Peak focus window approaching',
    afternoon: 'Consistent progress detected',
    evening: 'Evening consistency detected',
    night: 'Night productivity mode active',
  };

  return (
    <>
      {/* Ambient background depth – fixed, low‑opacity animated gradient */}
      <div className="ambient-bg" aria-hidden="true" />
      <AnimatePresence>
        <motion.div
          key={mood}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.8, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="ambient-info"
        >
          {infoMap[mood]}
        </motion.div>
      </AnimatePresence>
      {children}
    </>
  );
}
