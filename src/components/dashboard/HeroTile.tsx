'use client';

import { useEffect, useState } from 'react';
import { CardGlowWrapper } from '@/components/ui/CardGlowWrapper';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { motion } from 'framer-motion';

interface HeroTileProps {
  name: string;
  streakDays: number;
}

export function HeroTile({ name, streakDays }: HeroTileProps) {
  const [greeting, setGreeting] = useState('Welcome back');

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good morning');
    else if (hours < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <CardGlowWrapper glowColor="indigo" className="h-full flex flex-col justify-between p-6 bg-gradient-to-br from-indigo-950/20 via-zinc-900/40 to-zinc-950/50">
      <div className="grain-mesh" />
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-400 font-medium">
          <DynamicIcon name="Award" size={13} className="animate-bounce" />
          <span>Active Learning Quest</span>
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
