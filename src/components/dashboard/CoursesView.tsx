'use client';

import { useState } from 'react';
import { Course } from '@/types/dashboard';
import { CourseCard } from '@/components/dashboard/CourseCard';

import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { motion, Variants } from 'framer-motion';

interface CoursesViewProps {
  courses: Course[];
}

const CATEGORIES = ['All', 'Development', 'Design', 'Data Science', 'Database', 'Security'];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 22, mass: 0.85 },
  },
};

export function CoursesView({ courses }: CoursesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter logic
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const completedCount = courses.filter((c) => c.progress === 100).length;
  const inProgressCount = courses.filter((c) => c.progress > 0 && c.progress < 100).length;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Educational Registry</span>
          <h2 className="text-xl font-black text-white tracking-wider uppercase">Academy Syllabus</h2>
        </div>
        
        {/* Core Stats Overview */}
        <div className="flex gap-4">
          <div className="bg-white/2 border border-white/5 rounded-xl px-4 py-2 text-center">
            <span className="block text-lg font-black text-emerald-400">{completedCount}</span>
            <span className="text-[8px] uppercase tracking-wider text-zinc-500 font-bold">Completed</span>
          </div>
          <div className="bg-white/2 border border-white/5 rounded-xl px-4 py-2 text-center">
            <span className="block text-lg font-black text-indigo-400">{inProgressCount}</span>
            <span className="text-[8px] uppercase tracking-wider text-zinc-500 font-bold">In Progress</span>
          </div>
        </div>
      </header>

      {/* Filter and Search Bar Panel */}
      <section className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white/2 border border-white/5 p-4 rounded-2xl relative overflow-hidden">
        <div className="grain-mesh" />
        
        {/* Category Pills list */}
        <ul className="flex flex-wrap gap-2 relative z-10" aria-label="Course categories">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.3)]'
                    : 'bg-white/5 text-zinc-400 border-white/5 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>

        {/* Search */}
        <div className="relative w-full md:w-64 relative z-10">
          <span className="absolute inset-y-0 left-3 flex items-center text-zinc-500">
            <DynamicIcon name="Search" size={14} />
          </span>
          <input
            type="text"
            placeholder="Filter courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl bg-white/5 border border-white/5 py-1.5 pl-9 pr-4 text-xs text-white placeholder-zinc-500 focus:border-indigo-500/35 focus:bg-white/8 focus:outline-none transition-all duration-300"
          />
        </div>
      </section>

      {/* Dynamic Course Grid */}
      {filteredCourses.length > 0 ? (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]"
          aria-label="Filtered Syllabus Grid"
        >
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 350, damping: 15 } }}
              className="min-h-[200px]"
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.section>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="flex flex-col items-center justify-center p-12 glass-panel rounded-2xl border border-white/5 min-h-[350px] text-center space-y-5 relative overflow-hidden"
        >
          <div className="grain-mesh" />
          {/* Animated floating empty state illustration */}
          <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 animate-float shadow-[0_0_15px_rgba(99,102,241,0.15)]">
            <div className="absolute inset-0 rounded-full border border-indigo-500/10 animate-ping opacity-25" />
            <DynamicIcon name="Search" size={24} />
          </div>
          
          <div className="space-y-1 max-w-sm relative z-10">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs">Curriculum Registry Empty</h4>
            <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
              No academic syllabus matches your search keywords or active category filters. Expand your query parameters to resume sync.
            </p>
          </div>

          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all cursor-pointer relative z-10 border border-indigo-400/20"
          >
            Reset Search Filters
          </button>
        </motion.div>
      )}
      
      <footer className="text-center text-[9px] font-bold uppercase tracking-widest text-zinc-600 mt-12 pb-4 select-none">
        Telemetry synced • Latency 14ms • Verified stable
      </footer>
    </div>
  );
}
