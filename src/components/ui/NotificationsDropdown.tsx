// src/components/ui/NotificationsDropdown.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

export interface NotificationItem {
  id: string;
  icon: string; // name of DynamicIcon
  message: string;
  timestamp: string; // e.g. "2m ago" or "Today"
  read: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  markAllRead: () => void;
  toggleRead: (id: string) => void;
}

export function NotificationsDropdown({
  open,
  onClose,
  notifications,
  markAllRead,
  toggleRead,
}: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // close when clicking outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-80 glass-panel rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="p-4 flex items-center justify-between border-b border-white/5">
            <h4 className="text-sm font-medium text-white">Notifications</h4>
            <button
              onClick={markAllRead}
              className="text-xs text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              Mark all as read
            </button>
          </div>
          <ul className="flex flex-col gap-2 p-3">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`flex items-start gap-2 p-2 rounded-md cursor-pointer hover:bg-white/5 transition-colors ${
                  n.read ? 'text-zinc-400' : 'text-white font-medium'
                }`}
                onClick={() => toggleRead(n.id)}
              >
                <DynamicIcon name={n.icon as string} size={16} className="mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm leading-4">{n.message}</p>
                  <span className="text-xs text-zinc-500">{n.timestamp}</span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
