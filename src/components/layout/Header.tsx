'use client';

import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  title: string;
}

export function Header({ sidebarOpen, setSidebarOpen, title }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/5 bg-[#030014]/50 backdrop-blur-md px-6 md:px-8 z-30 sticky top-0">
      <div className="flex items-center gap-4">
        {/* Sidebar trigger toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-xl p-2 text-zinc-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer border border-white/5 bg-white/2"
          aria-label="Toggle Sidebar"
        >
          <DynamicIcon name="Menu" size={20} />
        </button>
        <h1 className="text-lg font-bold tracking-wider text-white uppercase hidden xs:block">{title}</h1>
      </div>
      
      {/* Top navbar accessories */}
      <div className="flex items-center gap-4">
        {/* Cyber styled search input */}
        <div className="relative hidden sm:block">
          <span className="absolute inset-y-0 left-3 flex items-center text-zinc-500 pointer-events-none">
            <DynamicIcon name="Search" size={15} />
          </span>
          <input
            type="text"
            placeholder="Search dashboard..."
            className="w-48 rounded-xl bg-white/5 border border-white/5 py-1.5 pl-9 pr-4 text-xs text-white placeholder-zinc-500 focus:border-indigo-500/35 focus:bg-white/8 focus:outline-none transition-all duration-300"
          />
        </div>
        
        {/* Notifications Icon with active glowing dot */}
        <button
          className="relative rounded-xl p-2 text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5 transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <DynamicIcon name="Bell" size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)] animate-pulse" />
        </button>
      </div>
    </header>
  );
}
