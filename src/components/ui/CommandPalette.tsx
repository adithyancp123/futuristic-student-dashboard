'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
  // Lazy init recent actions to avoid setState in effect
  const [recentActionIds, setRecentActionIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('recent_commands');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLUListElement>(null);

  const commands: CommandItem[] = useMemo(
    () => [
      { id: 'dash', title: 'Go to Dashboard', category: 'Navigation', icon: 'LayoutDashboard', action: () => router.push('/') },
      { id: 'courses', title: 'Go to Courses Syllabus', category: 'Navigation', icon: 'BookOpen', action: () => router.push('/courses') },
      { id: 'analytics', title: 'Go to Learning Intelligence', category: 'Navigation', icon: 'TrendingUp', action: () => router.push('/analytics') },
      { id: 'schedule', title: 'Go to Schedule Chronology', category: 'Navigation', icon: 'Calendar', action: () => router.push('/schedule') },
      { id: 'settings', title: 'Go to System Settings', category: 'Navigation', icon: 'Settings', action: () => router.push('/settings') },
      { id: 'toggle-side', title: 'Toggle Sidebar Collapse', category: 'System', icon: 'Menu', action: () => toggleSidebar(), shortcut: 'T' },
      { id: 'reload', title: 'Re-calibrate Database Sync', category: 'System', icon: 'Database', action: () => router.refresh(), shortcut: 'R' },
    ],
    [router, toggleSidebar]
  );

  // Persist recent actions when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('recent_commands', JSON.stringify(recentActionIds));
    }
  }, [recentActionIds]);

  const filteredCommands = useMemo(
    () =>
      commands.filter(
        (cmd) =>
          cmd.title.toLowerCase().includes(search.toLowerCase()) ||
          cmd.category.toLowerCase().includes(search.toLowerCase())
      ),
    [search, commands]
  );

  const selectableCommands: Array<CommandItem & { isRecent?: boolean }> = useMemo(() => {
    if (search.trim() !== '') {
      return filteredCommands;
    }
    const recents = recentActionIds
      .map((id) => commands.find((c) => c.id === id))
      .filter((c): c is CommandItem => !!c);
    const list: Array<CommandItem & { isRecent?: boolean }> = [];
    if (recents.length > 0) {
      recents.forEach((r) => list.push({ ...r, isRecent: true }));
    }
    commands.forEach((c) => list.push(c));
    return list;
  }, [search, recentActionIds, commands, filteredCommands]);

  const handleSelectCommand = useCallback(
    (cmd: CommandItem) => {
      const nextRecents = [cmd.id, ...recentActionIds.filter((id) => id !== cmd.id)].slice(0, 3);
      setRecentActionIds(nextRecents);
      cmd.action();
      setIsOpen(false);
    },
    [recentActionIds, setIsOpen]
  );

  // Focus inputs on open
  // Removed effect that resets search and activeIndex on open


  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
        setActiveIndex((prev) => (prev + 1) % Math.max(selectableCommands.length, 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + selectableCommands.length) % Math.max(selectableCommands.length, 1));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (selectableCommands[activeIndex]) {
          handleSelectCommand(selectableCommands[activeIndex]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, selectableCommands, handleSelectCommand, setIsOpen]);

  // Keep scroll in view
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            className="relative w-full max-w-lg mx-4 bg-[#090526]/85 border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.15)] rounded-2xl overflow-hidden backdrop-blur-2xl z-10 flex flex-col max-h-[420px]"
          >
            <div className="grain-mesh" />
            <header className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 relative z-10">
              <span className="text-zinc-400"><DynamicIcon name="Search" size={18} /></span>
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
              <span className="text-[10px] font-bold text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase select-none">ESC</span>
            </header>
            {selectableCommands.length > 0 ? (
              <ul
                ref={scrollRef}
                className="flex-1 overflow-y-auto py-2 divide-y divide-white/2 no-scrollbar"
                aria-label="Palette actions"
              >
                {selectableCommands.map((cmd, idx) => (
                  <li
                    key={cmd.id}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors',
                      idx === activeIndex && 'bg-white/5',
                      cmd.isRecent && 'opacity-80'
                    )}
                    onClick={() => handleSelectCommand(cmd)}
                  >
                    <DynamicIcon name={cmd.icon} size={18} />
                    <span className="flex-1 text-sm text-white">{cmd.title}</span>
                    {cmd.shortcut && <span className="text-xs text-zinc-400">{cmd.shortcut}</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex-1 flex items-center justify-center text-zinc-500">No commands</div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
