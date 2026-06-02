'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StudentProfile } from '@/types/dashboard';

interface DashboardLayoutProps {
  children: React.ReactNode;
  profile: StudentProfile;
}

export function DashboardLayout({ children, profile }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#030014] text-zinc-50 overflow-hidden font-sans">
      {/* Persisted Collapsible Aside panel */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        avatarUrl={profile.avatar_url}
        studentName={profile.full_name}
        studentLevel={profile.level}
      />

      {/* Main viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          title="Academy Command Console"
        />
        {children}
      </div>
    </div>
  );
}
