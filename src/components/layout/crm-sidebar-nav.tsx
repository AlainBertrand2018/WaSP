
'use client';

import {
  Home,
  Briefcase,
  Users,
  FileText,
  Plus,
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
  SidebarMenuSubItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [isOpen, setIsOpen] = React.useState(isParentActive);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center">
        <SidebarMenuButton
          asChild
          variant="ghost"
          className="w-full justify-start gap-2"
          isActive={pathname === dashboardHref && !items.some(item => pathname.startsWith(item.href))}
        >
          <Link href={dashboardHref}>
            {icon}
            <span>{title}</span>
          </Link>
        </SidebarMenuButton>
        {items.length > 0 && (
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              size="icon"
              variant="ghost"
              className={cn(
                'ml-auto transition-transform',
                isOpen && 'rotate-180'
              )}
            >
              <ChevronDown />
            </SidebarMenuButton>
          </CollapsibleTrigger>
        )}
      </div>
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
       <SidebarHeader className="p-4 h-[60px] flex items-center">
        {/* The logo is now in the main app header, this is for spacing */}
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
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/business-management/crm-suite' || pathname === '/business-management/crm-suite/projects'}>
              <Link href="/business-management/crm-suite/projects">
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
              icon={<FileText />}
              title="Invoices"
              pathname={pathname}
              dashboardHref="/business-management/crm-suite/invoices"
              items={[]}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
