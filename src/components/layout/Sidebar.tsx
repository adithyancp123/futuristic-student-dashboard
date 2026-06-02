'use client';

// No React hooks needed in Sidebar
import { cn } from '@/lib/utils';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  avatarUrl?: string | null;
  studentName?: string;
  studentLevel?: number;
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/' },
  { id: 'courses', label: 'Courses', icon: 'BookOpen', href: '/courses' },
  { id: 'analytics', label: 'Analytics', icon: 'TrendingUp', href: '/analytics' },
  { id: 'schedule', label: 'Schedule', icon: 'Calendar', href: '/schedule' },
  { id: 'settings', label: 'Settings', icon: 'Settings', href: '/settings' },
];

export function Sidebar({ isOpen, setIsOpen, avatarUrl, studentName = 'Student', studentLevel = 1 }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Aside Panel */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#05021a]/85 backdrop-blur-xl border-r border-white/5 text-zinc-400 transition-all duration-300 ease-in-out md:static",
          isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:w-20 md:translate-x-0 md:flex"
        )}
      >
        {/* Sidebar Header */}
        <header className="flex h-16 items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.4)] text-white">
              <DynamicIcon name="Award" size={20} />
            </div>
            {isOpen && (
              <span className="font-semibold text-white tracking-wide text-sm whitespace-nowrap">
                ANTIGRAVITY
              </span>
            )}
          </div>
          
          {/* Close button for mobile drawer */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-1.5 hover:bg-white/5 hover:text-white md:hidden"
            aria-label="Toggle Navigation"
          >
            <DynamicIcon name="X" size={18} />
          </button>
        </header>

        {/* Sidebar Navigation */}
        <nav className="flex-1 py-6 px-3">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all group relative overflow-hidden",
                      isActive ? "text-white font-semibold" : "hover:bg-white/5 hover:text-white text-zinc-400"
                    )}
                  >
                    {/* Framer motion layout */}
                    {isActive && (
                      <motion.span
                        layoutId="activeSidebarNav"
                        className="absolute inset-0 bg-indigo-600/10 border-l-2 border-indigo-500 rounded-xl z-0"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-3 w-full">
                      <DynamicIcon
                        name={item.icon}
                        className={cn(
                          "transition-transform duration-200 group-hover:scale-110",
                          isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"
                        )}
                      />
                      {isOpen && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer User Info */}
        <footer className="p-4 border-t border-white/5 bg-zinc-950/20">
          <div className="flex items-center gap-3 overflow-hidden">
            <figure className="relative h-10 w-10 flex-shrink-0">
              <Image
                  src={avatarUrl || "/placeholder-avatar.svg"}
                  alt={studentName}
                  className="h-full w-full rounded-xl object-cover ring-2 ring-indigo-500/35"
                  width={256}
                  height={256}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.src = "/placeholder-avatar.svg";
                  }}
                />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow">
                {studentLevel}
              </span>
            </figure>
            {isOpen && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-white truncate">{studentName}</span>
                <span className="text-[11px] text-zinc-500">Student Profile</span>
              </div>
            )}
          </div>
        </footer>
      </aside>
    </>
  );
}
