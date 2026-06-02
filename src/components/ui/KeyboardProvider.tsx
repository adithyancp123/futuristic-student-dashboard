/* src/components/ui/KeyboardProvider.tsx */
'use client';

import { useEffect, useState, useRef, createContext, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// ---------- Toast Context ----------
interface ToastContextProps {
  showToast: (msg: string) => void;
}
const ToastContext = createContext<ToastContextProps>({ showToast: () => {} });
export const useToast = () => useContext(ToastContext);

// ---------- Keyboard Provider ----------
export function KeyboardProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [toastMsg, setToastMsg] = useState<string>('');
  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(''), 1600);
  }, []);

  // Sequence handling for G + {D,C,A,S,T}
  const [seq, setSeq] = useState<string>('');
  const lastTime = useRef<number>(0);
  const timeout = 800; // ms between keys

  const navigate = useCallback((path: string, name: string) => {
    router.push(path);
    showToast(`Opened ${name}`);
    if (typeof window !== 'undefined') {
      localStorage.setItem('last_visited_route', path);
    }
  }, [router, showToast]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('toggle-command-palette'));
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('close-overlays'));
        return;
      }

      const now = Date.now();
      if (now - lastTime.current > timeout) {
        setSeq('');
      }
      lastTime.current = now;

      const key = e.key.toLowerCase();
      if (seq === '' && key === 'g') {
        setSeq('g');
        return;
      }
      if (seq === 'g') {
        switch (key) {
          case 'd':
            navigate('/', 'Dashboard');
            break;
          case 'c':
            navigate('/courses', 'Courses');
            break;
          case 'a':
            navigate('/analytics', 'Analytics');
            break;
          case 's':
            navigate('/schedule', 'Schedule');
            break;
          case 't':
            navigate('/settings', 'Settings');
            break;
          default:
            break;
        }
        setSeq('');
        return;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [seq, navigate]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-xl shadow-lg"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}
