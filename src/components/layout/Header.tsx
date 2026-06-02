'use client';

import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  title: string;
  onSearchClick?: () => void;
}

export function Header({ sidebarOpen, setSidebarOpen, title, onSearchClick }: HeaderProps) {
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
        {/* Cyber styled search input converted to command trigger */}
        <button
          onClick={onSearchClick}
          className="relative hidden sm:flex items-center justify-between w-52 rounded-xl bg-white/5 border border-white/5 hover:border-white/12 hover:bg-white/8 py-1.5 px-3.5 text-left text-xs text-zinc-400 placeholder-zinc-500 transition-all duration-300 cursor-pointer group shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] shimmer-btn"
        >
          <span className="flex items-center gap-2">
            <DynamicIcon name="Search" size={13} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            <span>Search console...</span>
          </span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 text-[8px] font-black text-zinc-500 border border-white/5 bg-white/5 px-1.5 py-0.5 rounded uppercase select-none">
            Ctrl K
          </kbd>
        </button>
        
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
