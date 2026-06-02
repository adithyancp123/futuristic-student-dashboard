'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StudentProfile } from '@/types/dashboard';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { OnboardingOverlay } from '@/components/ui/OnboardingOverlay';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  profile: StudentProfile;
}

export function DashboardLayout({ children, profile }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar_open');
      return saved === 'true';
    }
    return false;
  });
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const pathname = usePathname();

  // Listen for global keyboard provider events
  useEffect(() => {
    const openHandler = () => setCommandPaletteOpen(true);
    const closeHandler = () => setCommandPaletteOpen(false);
    window.addEventListener('toggle-command-palette', openHandler);
    window.addEventListener('close-overlays', closeHandler);
    return () => {
      window.removeEventListener('toggle-command-palette', openHandler);
      window.removeEventListener('close-overlays', closeHandler);
    };
  }, []);


  // Hydration-safe load of collapse settings moved to lazy state initialization.


  // Cache path coordinates on route adjustments
  useEffect(() => {
    if (typeof window !== 'undefined' && pathname && pathname !== '/') {
      localStorage.setItem('last_visited_route', pathname);
    }
  }, [pathname]);

  const handleSetSidebarOpen = (open: boolean) => {
    setSidebarOpen(open);
    localStorage.setItem('sidebar_open', String(open));
  };

  return (
    <div className="flex min-h-screen bg-[#030014] text-zinc-50 overflow-hidden font-sans">
      {/* Onboarding Welcome Screen overlay */}
      <OnboardingOverlay />

      {/* Persisted Collapsible Aside panel */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={handleSetSidebarOpen}
        avatarUrl={profile.avatar_url}
        studentName={profile.full_name}
        studentLevel={profile.level}
      />

      {/* Main viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={handleSetSidebarOpen}
          title="Academy Command Console"
          onSearchClick={() => setCommandPaletteOpen(true)}
        />
        {children}
      </div>

      {/* Global Command Palette dialog (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        setIsOpen={setCommandPaletteOpen}
        toggleSidebar={() => handleSetSidebarOpen(!sidebarOpen)}
      />
    </div>
  );
}
