import { BentoSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Title Placeholder */}
      <div className="space-y-2">
        <div className="h-4 w-32 rounded bg-white/5 animate-pulse" />
        <div className="h-6 w-48 rounded bg-white/5 animate-pulse" />
      </div>
      
      {/* Full Bento Grid Skeleton */}
      <BentoSkeleton />
    </div>
  );
}
