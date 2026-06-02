'use client';

import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { useState } from 'react';
import { NotificationsDropdown, NotificationItem } from '@/components/ui/NotificationsDropdown';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  title: string;
  onSearchClick?: () => void;
}

export function Header({ sidebarOpen, setSidebarOpen, title, onSearchClick }: HeaderProps) {
  // Notification state
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      icon: 'Fire',
      message: 'Streak maintained for 18 days',
      timestamp: '2m ago',
      read: false,
    },
    {
      id: '2',
      icon: 'TrendingUp',
      message: 'Learning velocity increased 12%',
      timestamp: 'Today',
      read: false,
    },
    {
      id: '3',
      icon: 'Target',
      message: 'You are 2 lessons away from a milestone',
      timestamp: '1h ago',
      read: false,
    },
    {
      id: '4',
      icon: 'Brain',
      message: 'Learning Coach refreshed recommendation',
      timestamp: '30m ago',
      read: false,
    },
    {
      id: '5',
      icon: 'Zap',
      message: 'Telemetry sync successful',
      timestamp: '5m ago',
      read: false,
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

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
        {/* Sync Status Badge (Trust Signal) */}
        <div className="hidden sm:flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-zinc-500 bg-white/3 border border-white/5 rounded-xl px-2.5 py-1.5 select-none">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
          <span>Sync Clean</span>
        </div>

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
          onClick={() => setNotifOpen((o) => !o)}
        >
          <DynamicIcon name="Bell" size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)] animate-pulse" />
        </button>
        <NotificationsDropdown
          open={notifOpen}
          onClose={() => setNotifOpen(false)}
          notifications={notifications}
          markAllRead={markAllRead}
          toggleRead={toggleRead}
        />
      </div>
    </header>
  );
}
