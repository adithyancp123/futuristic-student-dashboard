'use client';

import { CardGlowWrapper } from '@/components/ui/CardGlowWrapper';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface XPOverviewTileProps {
  level: number;
  xp: number;
  targetXp: number;
}

export function XPOverviewTile({ level, xp, targetXp }: XPOverviewTileProps) {
  const percentComplete = Math.min((xp / targetXp) * 100, 100);

  return (
    <CardGlowWrapper glowColor="violet" className="h-full flex flex-col justify-between p-6 bg-gradient-to-br from-violet-950/10 via-zinc-900/40 to-zinc-950/50">
      <div className="grain-mesh" />
      <header className="flex justify-between items-start">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">EXP Progression</span>
          <h3 className="text-xl font-bold text-white mt-1">Level {level} Architect</h3>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
          <DynamicIcon name="Award" size={20} />
        </div>
      </header>

      <section className="space-y-4 my-4">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-3xl font-extrabold text-white tracking-tight">{xp}</span>
            <span className="text-xs text-zinc-500 ml-1">/ {targetXp} XP</span>
          </div>
          <span className="text-xs text-violet-400 font-bold bg-violet-500/10 px-2 py-0.5 rounded-md border border-violet-500/15">
            {(percentComplete).toFixed(0)}%
          </span>
        </div>
        
        <ProgressBar value={percentComplete} color="violet" />
      </section>

      <footer className="flex items-center gap-2 text-xs text-zinc-400 border-t border-white/5 pt-3">
        <DynamicIcon name="Clock" size={14} className="text-violet-400" />
        <span>Earn {targetXp - xp} more XP to reach Level {level + 1}</span>
      </footer>
    </CardGlowWrapper>
  );
}
