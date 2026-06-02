'use client';

import { Course } from '@/types/dashboard';
import { CardGlowWrapper } from '@/components/ui/CardGlowWrapper';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { DynamicIcon } from '@/components/ui/DynamicIcon';


interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const isCompleted = course.progress === 100;

  return (
    <CardGlowWrapper glowColor={course.accent_color} className="h-full flex flex-col justify-between p-6 bg-gradient-to-br from-zinc-900/40 to-zinc-950/60 relative group">
      {/* Dynamic Cybernetic Grain Overlay */}
      <div className="grain-mesh" />

      {/* Course Header Banner */}
      <header className="flex justify-between items-start">
        {/* Dynamic DB icon with relative styling glows */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-zinc-300 group-hover:text-white transition-colors duration-300">
          <DynamicIcon name={course.icon_name} size={20} className="transition-transform duration-300 group-hover:scale-110" />
        </div>
        
        {/* Status chip */}
        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
          isCompleted 
            ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
            : course.progress > 0 
              ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
              : 'text-zinc-500 bg-white/2 border-white/5'
        }`}>
          {isCompleted ? 'Completed' : course.progress > 0 ? 'In Progress' : 'Not Started'}
        </span>
      </header>

      {/* Course Information Section */}
      <section className="space-y-2 mt-5 flex-1">
        <span className="text-[9px] uppercase font-black tracking-widest text-zinc-500">
          {course.category}
        </span>
        <h4 className="text-sm font-bold text-white tracking-wide line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
          {course.title}
        </h4>
        <p className="text-[11px] text-zinc-500 font-medium">
          Instructor: <span className="text-zinc-400 font-semibold">{course.instructor}</span>
        </p>
      </section>

      {/* Progress Footer */}
      <footer className="space-y-3 mt-6 pt-3 border-t border-white/5">
        <div className="flex justify-between items-center text-xs">
          <span className="text-zinc-500 font-bold text-[10px]">
            {course.lessons_completed} / {course.lessons_total} Lessons
          </span>
          <span className="text-white font-extrabold text-[10px]">
            {course.progress}%
          </span>
        </div>
        <ProgressBar value={course.progress} color={course.accent_color} />
      </footer>
    </CardGlowWrapper>
  );
}
