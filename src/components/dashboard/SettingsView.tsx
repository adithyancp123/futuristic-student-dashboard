'use client';

import { StudentProfile } from '@/types/dashboard';
import { CardGlowWrapper } from '@/components/ui/CardGlowWrapper';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

interface SettingsViewProps {
  profile: StudentProfile;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

export function SettingsView({ profile }: SettingsViewProps) {
  // Toggle states
  const [holographicUi, setHolographicUi] = useState(true);
  const [dbWebhooks, setDbWebhooks] = useState(true);
  const [emailsNotify, setEmailsNotify] = useState(false);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="space-y-1">
        <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Academy Administration</span>
        <h2 className="text-xl font-black text-white tracking-wider uppercase">System Preferences</h2>
      </header>

      {/* Main Settings Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 xl:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]"
      >
        {/* Profile Card (Span 2 on XL) */}
        <motion.div variants={itemVariants} className="xl:col-span-2 min-h-[220px]">
          <CardGlowWrapper glowColor="indigo" className="h-full p-6 flex flex-col justify-between bg-gradient-to-br from-zinc-900/40 to-zinc-950/60 relative group">
            <div className="grain-mesh" />
            <header className="flex justify-between items-start relative z-10 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Student Profile</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <DynamicIcon name="User" size={18} />
              </div>
            </header>

            {/* Profile contents */}
            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 flex-1">
              <figure className="relative h-20 w-20 flex-shrink-0">
                <img
                  src={profile.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"}
                  alt={profile.full_name}
                  className="h-full w-full rounded-2xl object-cover ring-2 ring-indigo-500/35 shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow ring-2 ring-[#030014]">
                  {profile.level}
                </span>
              </figure>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <h3 className="text-lg font-bold text-white leading-none">{profile.full_name}</h3>
                <p className="text-xs text-zinc-400 leading-none">Level {profile.level} Academy Developer</p>
                <p className="text-[10px] text-zinc-500 font-medium">User ID: {profile.id}</p>
              </div>
            </div>

            <footer className="relative z-10 pt-3 border-t border-white/5 mt-4 flex justify-between items-center text-xs text-zinc-500">
              <span>Account active since Oct 2025</span>
              <button className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
                Edit Meta Details
              </button>
            </footer>
          </CardGlowWrapper>
        </motion.div>

        {/* Futuristic Controls (Span 1) */}
        <motion.div variants={itemVariants} className="min-h-[300px] xl:row-span-2">
          <CardGlowWrapper glowColor="rose" className="h-full p-6 flex flex-col justify-between bg-gradient-to-br from-zinc-900/40 to-zinc-950/60 relative group">
            <div className="grain-mesh" />
            <header className="flex justify-between items-start relative z-10 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Telemetry Preferences</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <DynamicIcon name="Settings" size={18} />
              </div>
            </header>

            {/* Custom styled toggle switches using Framer Motion */}
            <ul className="space-y-5 relative z-10 flex-1 py-4" aria-label="Preferences controls">
              {/* Toggle 1 */}
              <li className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="block text-xs font-semibold text-white">GPU UI Acceleration</span>
                  <span className="block text-[9px] text-zinc-500">Complex shaders rendering</span>
                </div>
                <button
                  onClick={() => setHolographicUi(!holographicUi)}
                  className="relative h-6 w-11 rounded-full p-1 cursor-pointer transition-colors duration-200"
                  style={{ backgroundColor: holographicUi ? 'var(--neon-rose)' : 'rgba(255,255,255,0.08)' }}
                  aria-label={holographicUi ? "Disable GPU Acceleration" : "Enable GPU Acceleration"}
                >
                  <motion.span
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="block h-4 w-4 rounded-full bg-white shadow-md"
                    style={{ x: holographicUi ? 20 : 0 }}
                  />
                </button>
              </li>

              {/* Toggle 2 */}
              <li className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="block text-xs font-semibold text-white">Supabase Webhooks</span>
                  <span className="block text-[9px] text-zinc-500">Real-time DB bindings</span>
                </div>
                <button
                  onClick={() => setDbWebhooks(!dbWebhooks)}
                  className="relative h-6 w-11 rounded-full p-1 cursor-pointer transition-colors duration-200"
                  style={{ backgroundColor: dbWebhooks ? 'var(--neon-rose)' : 'rgba(255,255,255,0.08)' }}
                  aria-label={dbWebhooks ? "Disable Webhooks" : "Enable Webhooks"}
                >
                  <motion.span
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="block h-4 w-4 rounded-full bg-white shadow-md"
                    style={{ x: dbWebhooks ? 20 : 0 }}
                  />
                </button>
              </li>

              {/* Toggle 3 */}
              <li className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="block text-xs font-semibold text-white">Email Integration</span>
                  <span className="block text-[9px] text-zinc-500">Deliver status notifications</span>
                </div>
                <button
                  onClick={() => setEmailsNotify(!emailsNotify)}
                  className="relative h-6 w-11 rounded-full p-1 cursor-pointer transition-colors duration-200"
                  style={{ backgroundColor: emailsNotify ? 'var(--neon-rose)' : 'rgba(255,255,255,0.08)' }}
                  aria-label={emailsNotify ? "Disable Email Integration" : "Enable Email Integration"}
                >
                  <motion.span
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="block h-4 w-4 rounded-full bg-white shadow-md"
                    style={{ x: emailsNotify ? 20 : 0 }}
                  />
                </button>
              </li>
            </ul>
          </CardGlowWrapper>
        </motion.div>

        {/* Technical connection details (Span 2) */}
        <motion.div variants={itemVariants} className="xl:col-span-2 min-h-[160px]">
          <CardGlowWrapper glowColor="cyan" className="h-full p-6 flex flex-col justify-between bg-gradient-to-br from-zinc-900/40 to-zinc-950/60 relative group">
            <div className="grain-mesh" />
            <header className="flex justify-between items-start relative z-10 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Database Binding</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <DynamicIcon name="Database" size={18} />
              </div>
            </header>
            
            <div className="relative z-10 flex-grow py-2 text-xs text-zinc-400">
              <p>Status: <span className="text-emerald-400 font-bold">Authenticated</span></p>
              <p className="mt-1 font-semibold text-[10px]">Endpoint: <span className="text-zinc-500">{process.env.NEXT_PUBLIC_SUPABASE_URL || 'Fallback engine active'}</span></p>
            </div>

            <footer className="relative z-10 pt-3 border-t border-white/5 flex justify-end gap-3 mt-2">
              <button className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-400 cursor-pointer">
                Reset connection
              </button>
              <button className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 cursor-pointer">
                Re-validate sync
              </button>
            </footer>
          </CardGlowWrapper>
        </motion.div>
      </motion.section>
    </div>
  );
}
