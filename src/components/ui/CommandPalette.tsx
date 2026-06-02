'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { cn } from '@/lib/utils';

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'System';
  icon: string;
  action: () => void;
  shortcut?: string;
}

export function CommandPalette({ isOpen, setIsOpen, toggleSidebar }: CommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLUListElement>(null);

  const commands: CommandItem[] = [
    { id: 'dash', title: 'Go to Dashboard', category: 'Navigation', icon: 'LayoutDashboard', action: () => router.push('/') },
    { id: 'courses', title: 'Go to Courses Syllabus', category: 'Navigation', icon: 'BookOpen', action: () => router.push('/courses') },
    { id: 'analytics', title: 'Go to Learning Intelligence', category: 'Navigation', icon: 'TrendingUp', action: () => router.push('/analytics') },
    { id: 'schedule', title: 'Go to Schedule Chronology', category: 'Navigation', icon: 'Calendar', action: () => router.push('/schedule') },
    { id: 'settings', title: 'Go to System Settings', category: 'Navigation', icon: 'Settings', action: () => router.push('/settings') },
    { id: 'toggle-side', title: 'Toggle Sidebar Collapse', category: 'System', icon: 'Menu', action: () => toggleSidebar(), shortcut: 'T' },
    { id: 'reload', title: 'Re-calibrate Database Sync', category: 'System', icon: 'Database', action: () => router.refresh(), shortcut: 'R' },
  ];

  // Fuzzy filter
  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearch('');
      setActiveIndex(0);
    }
  }, [isOpen]);

  // Key handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette: Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % Math.max(filteredCommands.length, 1));
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(filteredCommands.length, 1));
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[activeIndex]) {
          filteredCommands[activeIndex].action();
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, filteredCommands, setIsOpen]);

  // Adjust scroll position on activeIndex change
  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        scrollRef.current.scrollTop = activeEl.offsetTop - scrollRef.current.clientHeight / 2 + activeEl.clientHeight / 2;
      }
    }
  }, [activeIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Blur backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Palette container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            className="relative w-full max-w-lg mx-4 bg-[#090526]/85 border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.15)] rounded-2xl overflow-hidden backdrop-blur-2xl z-10 flex flex-col max-h-[420px]"
          >
            <div className="grain-mesh" />

            {/* Input section */}
            <header className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 relative z-10">
              <span className="text-zinc-400">
                <DynamicIcon name="Search" size={18} />
              </span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search command palette..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveIndex(0);
                }}
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
              <span className="text-[10px] font-bold text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase select-none">
                ESC
              </span>
            </header>

            {/* Commands list */}
            {filteredCommands.length > 0 ? (
              <ul
                ref={scrollRef}
                className="flex-1 overflow-y-auto py-2 relative z-10 divide-y divide-white/2 no-scrollbar"
                aria-label="Palette actions"
              >
                {filteredCommands.map((cmd, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <li
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 cursor-pointer transition-all relative select-none",
                        isActive ? "bg-indigo-600/15 text-white" : "text-zinc-400 hover:text-zinc-200"
                      )}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.span
                          layoutId="activePaletteNav"
                          className="absolute inset-y-0 left-0 w-1 bg-indigo-500 rounded-r"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}

                      <div className="flex items-center gap-3">
                        <DynamicIcon
                          name={cmd.icon}
                          className={cn(
                            "transition-transform",
                            isActive ? "text-indigo-400 scale-110" : "text-zinc-500"
                          )}
                          size={16}
                        />
                        <span className="text-xs font-semibold">{cmd.title}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-zinc-500 font-bold uppercase border border-white/5 bg-white/2 px-1.5 py-0.5 rounded">
                          {cmd.category}
                        </span>
                        {cmd.shortcut && (
                          <span className="text-[9px] text-indigo-400 font-bold border border-indigo-500/25 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                            {cmd.shortcut}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="py-12 text-center text-zinc-500 text-xs relative z-10 flex flex-col items-center gap-3">
                <DynamicIcon name="Terminal" size={20} className="text-zinc-600" />
                <span>No commands matched your query.</span>
              </div>
            )}

            {/* Palette Footer */}
            <footer className="px-4 py-2 border-t border-white/5 bg-zinc-950/40 text-[9px] text-zinc-500 flex justify-between relative z-10 select-none font-medium">
              <span className="flex items-center gap-1.5">
                <kbd className="bg-white/5 border border-white/5 px-1 rounded font-mono">↑↓</kbd> to navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="bg-white/5 border border-white/5 px-1 rounded font-mono">Enter</kbd> to select
              </span>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
