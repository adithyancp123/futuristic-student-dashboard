'use client';

import { cn } from '@/lib/utils';
import { motion, Variants } from 'framer-motion';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("shimmer-skeleton rounded-lg bg-white/2 border border-white/5", className)}
      {...props}
    />
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
      mass: 0.85,
    },
  },
};

export function BentoSkeleton() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)] w-full"
    >
      {/* Hero Tile Skeleton */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-2 p-6 glass-panel rounded-2xl flex flex-col justify-between min-h-[220px] relative overflow-hidden"
      >
        <div className="grain-mesh" />
        <div className="space-y-3 relative z-10">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex gap-4 relative z-10">
          <Skeleton className="h-14 w-28 rounded-xl" />
          <Skeleton className="h-14 w-28 rounded-xl" />
        </div>
      </motion.div>
      
      {/* XP/Streak Skeleton */}
      <motion.div
        variants={itemVariants}
        className="p-6 glass-panel rounded-2xl flex flex-col justify-between min-h-[220px] relative overflow-hidden"
      >
        <div className="grain-mesh" />
        <div className="space-y-3 relative z-10">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-12 w-20" />
        </div>
        <div className="space-y-2 relative z-10">
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </motion.div>

      {/* Activity Skeleton */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-2 p-6 glass-panel rounded-2xl flex flex-col justify-between min-h-[300px] relative overflow-hidden"
      >
        <div className="grain-mesh" />
        <div className="space-y-2 relative z-10">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex items-end justify-between gap-3 h-40 pt-4 relative z-10">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-full rounded-t-lg"
              style={{ height: `${(i + 2) * 12}%` }}
            />
          ))}
        </div>
      </motion.div>

      {/* Checklist Skeleton */}
      <motion.div
        variants={itemVariants}
        className="p-6 glass-panel rounded-2xl flex flex-col justify-between min-h-[300px] relative overflow-hidden"
      >
        <div className="grain-mesh" />
        <div className="relative z-10 flex flex-col h-full justify-between">
          <Skeleton className="h-6 w-1/2" />
          <div className="space-y-4 py-4 flex-1 mt-4">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </motion.div>

      {/* Course Title Header */}
      <motion.div variants={itemVariants} className="md:col-span-3 py-2 mt-4 relative z-10">
        <Skeleton className="h-6 w-48" />
      </motion.div>

      {/* Course Cards Skeletons */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          className="p-6 glass-panel rounded-2xl flex flex-col justify-between min-h-[200px] relative overflow-hidden"
        >
          <div className="grain-mesh" />
          <div className="space-y-3 relative z-10">
            <div className="flex justify-between items-start">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="space-y-2 mt-4 relative z-10">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
