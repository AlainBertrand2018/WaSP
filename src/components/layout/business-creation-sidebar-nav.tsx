'use client';

import {
  FileText,
  Lightbulb,
  Rocket,
  Wallet,
  CalendarCheck,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import React from 'react';

const navigationItems = [
    { href: '/business-creation/business-idea-validation', label: '1. Idea Validation', icon: <Lightbulb /> },
    { href: '/business-creation/mvp-planner', label: '2. MVP Planner', icon: <Rocket /> },
    { href: '/business-creation/startup-budget-planner', label: '3. Startup Budget', icon: <Wallet /> },
    { href: '/business-creation/business-plan-generator', label: '4. Business Plan', icon: <FileText /> },
    { href: '/business-creation/7-day-blueprint', label: '7-Day Blueprint', icon: <CalendarCheck /> },
];

export function BusinessCreationSidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
       <SidebarHeader className="p-4 h-[60px] flex items-center">
        {/* Spacing for consistency with main header */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item) => (
             <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)}>
                <Link href={item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
