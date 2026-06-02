'use client';

import { useEffect } from 'react';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Telemetry Sync Error:', error);
  }, [error]);

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-md mx-auto h-[70vh]">
      {/* Glow warning icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.25)] animate-pulse">
        <DynamicIcon name="Shield" size={30} />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-white tracking-widest uppercase">System Link Offline</h2>
        <p className="text-xs text-zinc-400 leading-relaxed">
          An error occurred while compiling your student metrics. Check your network or environment configurations.
        </p>
      </div>

      {/* Futuristic action button */}
      <button
        onClick={() => reset()}
        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] tracking-widest uppercase transition-all duration-300 border border-indigo-500/35 hover:border-indigo-400/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] cursor-pointer"
      >
        Recalibrate Core Links
      </button>
    </div>
  );
}
