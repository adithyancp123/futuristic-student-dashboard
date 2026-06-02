'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22, mass: 0.85 }}
      className="flex-1 flex flex-col w-full min-w-0"
    >
      {children}
    </motion.div>
  );
}
