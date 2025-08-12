
'use client';

import {
  BrainCircuit,
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
  SidebarTrigger,
} from '@/components/ui/sidebar';
import React from 'react';
import { SidebarFooter } from './sidebar-footer';

export function IdeationSidebarNav() {
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
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith('/ideation/brainstorming')}>
              <Link href="/ideation/brainstorming">
                <BrainCircuit />
                <span>Brainstorming Tool</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarFooter />
      </SidebarContent>
    </Sidebar>
  );
}
