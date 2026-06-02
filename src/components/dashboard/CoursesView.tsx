'use client';

import { useState } from 'react';
import { Course } from '@/types/dashboard';
import { CourseCard } from '@/components/dashboard/CourseCard';
import { CardGlowWrapper } from '@/components/ui/CardGlowWrapper';
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
    transition: { type: 'spring', stiffness: 90, damping: 14 },
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
        <div className="flex flex-col items-center justify-center p-12 glass-panel rounded-2xl border border-white/5 min-h-[300px] text-center space-y-4">
          <div className="grain-mesh" />
          <div className="p-3 bg-zinc-800/20 border border-zinc-700/20 rounded-2xl text-zinc-500">
            <DynamicIcon name="Terminal" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">No Matching Syllabus Found</h4>
            <p className="text-xs text-zinc-500 mt-1">Adjust search tags or category filters to sync curriculum.</p>
          </div>
        </div>
      )}
    </div>
  );
}
