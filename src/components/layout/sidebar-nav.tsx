'use client';

import { apps } from '@/lib/data';
import {
  AppWindow,
  LayoutGrid,
  PlusCircle,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tighter">StudioFlow AI</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <SidebarMenuButton
                isActive={pathname === '/dashboard'}
                icon={<LayoutGrid />}
              >
                Dashboard
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/apps" legacyBehavior passHref>
              <SidebarMenuButton
                isActive={pathname.startsWith('/apps')}
                icon={<AppWindow />}
              >
                Apps
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel>Your Apps</SidebarGroupLabel>
          <SidebarMenu>
            {apps.map((app) => (
              <SidebarMenuItem key={app.id}>
                <Link href={app.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={pathname === app.href}
                    icon={<app.icon />}
                  >
                    {app.name}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton icon={<PlusCircle />}>Add new</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarMenu className="mt-auto p-2">
        <SidebarMenuItem>
          <Link href="/settings" legacyBehavior passHref>
            <SidebarMenuButton
              isActive={pathname === '/settings'}
              icon={<Settings />}
            >
              Settings
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </Sidebar>
  );
}
