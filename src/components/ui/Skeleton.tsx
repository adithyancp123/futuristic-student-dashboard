import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-white/5", className)}
      {...props}
    />
  );
}

export function BentoSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)] w-full">
      {/* Hero Tile Skeleton */}
      <div className="md:col-span-2 p-6 glass-panel rounded-2xl flex flex-col justify-between min-h-[220px]">
        <div className="space-y-3">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-14 w-28 rounded-xl" />
          <Skeleton className="h-14 w-28 rounded-xl" />
        </div>
      </div>
      
      {/* XP/Streak Skeleton */}
      <div className="p-6 glass-panel rounded-2xl flex flex-col justify-between min-h-[220px]">
        <div className="space-y-3">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-12 w-20" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>

      {/* Activity Skeleton */}
      <div className="md:col-span-2 p-6 glass-panel rounded-2xl flex flex-col justify-between min-h-[300px]">
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex items-end justify-between gap-3 h-40 pt-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-full rounded-t-lg"
              style={{ height: `${(i + 2) * 12}%` }}
            />
          ))}
        </div>
      </div>

      {/* Checklist Skeleton */}
      <div className="p-6 glass-panel rounded-2xl flex flex-col justify-between min-h-[300px]">
        <Skeleton className="h-6 w-1/2" />
        <div className="space-y-4 py-4 flex-1">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>

      {/* Course Title Header */}
      <div className="md:col-span-3 py-2">
        <Skeleton className="h-8 w-48" />
      </div>

      {/* Course Cards Skeletons */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-6 glass-panel rounded-2xl flex flex-col justify-between min-h-[200px]">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="space-y-2 mt-4">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
