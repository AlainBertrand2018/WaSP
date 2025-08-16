
'use client';

import {
  BrainCircuit,
  CalendarCheck,
  Home,
  Lightbulb,
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
    {
        href: '/ideation/brainstorming',
        title: 'Brainstorming Tool',
        subtitle: 'Imagine your next venture',
        icon: <BrainCircuit />,
    },
    {
        href: '/business-creation/business-idea-validation',
        title: 'Idea Validation',
        subtitle: 'From Idea to Pitch Deck',
        icon: <Lightbulb />,
    },
    {
        href: '/7-day-blueprint',
        title: 'Quickstarter',
        subtitle: 'A 7-day plan to start your business',
        icon: <CalendarCheck />,
    },
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
                <SidebarMenuButton asChild size="lg" className="h-auto py-2" isActive={pathname.startsWith(item.href)}>
                <Link href={item.href} className="flex items-center gap-3">
                    <div className="shrink-0">{item.icon}</div>
                    <div className="flex flex-col items-start">
                        <span className="font-semibold">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.subtitle}</span>
                    </div>
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
