import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { getDashboardData } from '@/lib/supabase/server';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Academy Dashboard | Student Command Center',
  description: 'Production-ready academic tracking bento dashboard with database analytics and dynamic workflows.',
  authors: [{ name: 'Senior Frontend Engineer AI' }],
  robots: { index: true, follow: true },
};

// Disable layout caching to re-query database updates
export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Query profile records server-side for shared layout menus
  const data = await getDashboardData();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-full flex flex-col bg-[#030014] text-zinc-50 overflow-hidden">
        <DashboardLayout profile={data.profile}>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}
