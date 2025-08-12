
'use client';

import {
  Home,
  Briefcase,
  Users,
  FileText,
  Plus,
  Receipt,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarFooter } from './sidebar-footer';

const SubMenu = ({
  icon,
  title,
  items,
  pathname,
  dashboardHref,
}: {
  icon: React.ReactNode;
  title: string;
  items: { href: string; label: string }[];
  pathname: string;
  dashboardHref: string;
}) => {
  const isParentActive = pathname.startsWith(dashboardHref);
  const { open } = useSidebar();
  const [isOpen, setIsOpen] = React.useState(isParentActive);

  React.useEffect(() => {
    if (!open) {
      setIsOpen(false);
    }
  }, [open]);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <SidebarMenuButton
        asChild={!open}
        variant="ghost"
        className="w-full justify-start gap-2"
        isActive={pathname === dashboardHref && !items.some(item => pathname.startsWith(item.href))}
        tooltip={title}
      >
        <Link href={dashboardHref}>
          {icon}
          <span>{title}</span>
           {items.length > 0 && open && (
              <CollapsibleTrigger asChild>
                <button
                  className={cn(
                    'ml-auto transition-transform',
                    isOpen && 'rotate-180'
                  )}
                >
                  <ChevronDown />
                </button>
              </CollapsibleTrigger>
            )}
        </Link>
      </SidebarMenuButton>
      <CollapsibleContent>
        <SidebarMenuSub>
          {items.map((item) => (
            <SidebarMenuSubItem key={item.href}>
              <SidebarMenuSubButton
                asChild
                isActive={pathname.startsWith(item.href)}
              >
                <Link href={item.href}>{item.label}</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
};


export function CrmSidebarNav() {
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
                 <SidebarMenuButton asChild tooltip="Back to Tools Dashboard">
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
            <SidebarMenuButton asChild isActive={pathname === '/business-management/crm-suite'} tooltip="Dashboard">
              <Link href="/business-management/crm-suite">
                <Briefcase />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
           <SidebarMenuItem>
             <SubMenu
              icon={<Users />}
              title="Clients"
              pathname={pathname}
              dashboardHref="/business-management/crm-suite/clients"
              items={[
                { href: '/business-management/crm-suite/clients/new', label: 'New Client' },
              ]}
            />
          </SidebarMenuItem>

           <SidebarMenuItem>
             <SubMenu
              icon={<FileText />}
              title="Quotations"
              pathname={pathname}
              dashboardHref="/business-management/crm-suite/quotations"
              items={[
                { href: '/business-management/crm-suite/quotations/new', label: 'New Quotation' },
              ]}
            />
          </SidebarMenuItem>
          
           <SidebarMenuItem>
             <SubMenu
              icon={<Receipt />}
              title="Invoices"
              pathname={pathname}
              dashboardHref="/business-management/crm-suite/invoices"
              items={[]}
            />
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarFooter />
      </SidebarContent>
    </Sidebar>
  );
}
