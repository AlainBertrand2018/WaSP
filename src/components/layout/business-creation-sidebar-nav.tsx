
'use client';

import {
  FileText,
  Home,
  Lightbulb,
  Rocket,
  Wallet,
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
  SidebarTrigger,
} from '@/components/ui/sidebar';
import React from 'react';
import { SidebarFooter } from './sidebar-footer';

const navigationItems = [
    { href: '/business-creation/business-idea-validation', label: '1. Idea Validation', icon: <Lightbulb /> },
    { href: '/business-creation/mvp-planner', label: '2. MVP Planner', icon: <Rocket /> },
    { href: '/business-creation/startup-budget-planner', label: '3. Startup Budget', icon: <Wallet /> },
    { href: '/business-creation/business-plan-generator', label: '4. Business Plan', icon: <FileText /> },
];

export function BusinessCreationSidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
       <SidebarHeader className="p-4 h-[60px] flex items-center justify-between">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <div className="flex-grow"></div>
          <SidebarTrigger className="hidden md:flex" tooltip="Toggle Sidebar" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
            <SidebarMenuItem>
                 <SidebarMenuButton asChild>
                    <Link href="/dashboard">
                        <Home />
                        <span>Back to Tools Dashboard</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <li className='px-2'>
                <hr className='my-2' />
            </li>
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
        <SidebarFooter />
      </SidebarContent>
    </Sidebar>
  );
}
