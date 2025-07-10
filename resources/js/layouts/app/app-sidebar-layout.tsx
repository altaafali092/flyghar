import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({
  children,
  breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
  return (
    <AppShell variant="sidebar">
      <AppSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden flex flex-col min-h-screen">
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        
        <main className="flex-1">{children}</main>

        <footer className="mt-auto text-center text-xs text-muted-foreground py-4 border-t">
          © {new Date().getFullYear()} <span className='font-bold text-red-500'>FlyGhar</span>. All rights reserved.
        </footer>
      </AppContent>
    </AppShell>
  );
}
