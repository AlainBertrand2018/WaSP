
'use client';

import {
  CalendarCheck,
  Circle,
  Home,
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
    { href: '/7-day-blueprint', label: 'Blueprint Overview', icon: <CalendarCheck /> },
    { href: '/7-day-blueprint/d1', label: 'Day 1: Discovery', icon: <Circle /> },
    // Add other days here as they are created
];

export function SevenDayBlueprintSidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
       <SidebarHeader className="p-4 h-[60px] flex items-center">
        {/* Spacing for consistency with main header */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
           <SidebarMenuItem>
                 <SidebarMenuButton asChild>
                    <Link href="/dashboard">
                        <Home />
                        <span>Back to Dashboard</span>
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
      </SidebarContent>
    </Sidebar>
  );
}
