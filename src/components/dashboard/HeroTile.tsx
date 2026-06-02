'use client';

import { useState, useEffect } from 'react';

import { DynamicIcon } from '@/components/ui/DynamicIcon';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { CardGlowWrapper } from '@/components/ui/CardGlowWrapper';

interface HeroTileProps {
  name: string;
  streakDays: number;
}

export function HeroTile({ name, streakDays }: HeroTileProps) {
  // Hydration‑safe mount detection
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize greeting with static fallback
  const [greeting, setGreeting] = useState('Welcome back');
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    if (!mounted) return;
    const h = new Date().getHours();
    const nextGreeting = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
    setGreeting(nextGreeting);
  }, [mounted]);

  // Mounted state removed; not needed for SSR-safe rendering
  // Initialize lastRoute safely for SSR
  const [lastRoute] = useState(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('last_visited_route');
    return saved && saved !== '/' ? saved : null;
  });
  // Map route names to cleaner UI handles
  const getRouteLabel = (route: string) => {
    switch (route) {
      case '/courses':
        return 'Academy Syllabus';
      case '/analytics':
        return 'System Telemetry';
      case '/schedule':
        return 'Planner Chronology';
      case '/settings':
        return 'System Settings';
      default:
        return 'Last Workspace';
    }
  };

  return (
    <CardGlowWrapper glowColor="indigo" className="h-full flex flex-col justify-between p-6 bg-gradient-to-br from-indigo-950/20 via-zinc-900/40 to-zinc-950/50">
      <div className="grain-mesh" />
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-400 font-medium">
            <DynamicIcon name="Award" size={13} className="animate-bounce" />
            <span>Active Learning Quest</span>
          </div>

                      {/* Resume badge - always render motion.div to avoid SSR mismatch */}
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={mounted && lastRoute ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1 text-[10px] text-violet-300 font-semibold"
            >
              {/* Hydration‑safe placeholder before client mount */}
              {!mounted ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" style={{ opacity: 0 }} />
                  <span style={{ opacity: 0 }}>Resume: </span>
                  <span style={{ opacity: 0 }}>placeholder</span>
                </>
              ) : lastRoute ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                  <span>Resume: </span>
                  <Link href={lastRoute} className="underline hover:text-white transition-colors">
                    {getRouteLabel(lastRoute)}
                  </Link>
                </>
              ) : null}
            </motion.div>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-2">
          {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">{name}</span>!
        </h2>
        <p className="text-sm text-zinc-400 max-w-md">
          Ready to continue your curriculum? Your projects are waiting and you are making excellent progress.
        </p>
      </header>

      <section className="flex flex-wrap items-center gap-6 mt-6">
        {/* Streak Metric */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
            <DynamicIcon name="Flame" size={24} className="animate-pulse" />
          </div>
          <div>
            <span className="block text-2xl font-black text-white leading-none">{streakDays}</span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Day Streak</span>
          </div>
        </div>

        {/* Level Up Indicator */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <DynamicIcon name="Terminal" size={24} />
          </div>
          <div>
            <span className="block text-sm font-semibold text-white">Daily Target</span>
            <span className="text-[10px] text-zinc-400">Complete 1 lesson today</span>
          </div>
        </div>
      </section>
    </CardGlowWrapper>
  );
}
