
'use client';

import {
  Book,
  Briefcase,
  CircleDollarSign,
  ClipboardList,
  Home,
  LayoutGrid,
  Megaphone,
  Package,
  Rocket,
  FileText,
  HelpCircle,
  BrainCircuit,
  CalendarCheck,
  CheckCheck,
  PanelLeft,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
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
  const { open } = useSidebar();
  const isParentActive = pathname.startsWith(dashboardHref);

  const [isOpen, setIsOpen] = React.useState(isParentActive);
  
  React.useEffect(() => {
    if (!open) {
      setIsOpen(false);
    }
  }, [open]);


  // Special case for CRM suite
  if (title === 'Business Management') {
      const isCrmActive = pathname.startsWith('/business-management/crm-suite');
       return (
        <Collapsible open={(isOpen || isCrmActive) && open} onOpenChange={setIsOpen}>
          <SidebarMenuButton
            asChild
            variant="ghost"
            className="w-full justify-start gap-2"
            isActive={pathname === dashboardHref && !isCrmActive}
            tooltip={title}
          >
            <Link href={dashboardHref}>
              {icon}
              <span>{title}</span>
              <CollapsibleTrigger asChild>
                <SidebarMenuAction
                  className={cn(
                    'relative ml-auto transition-transform',
                    (isOpen || isCrmActive) && 'rotate-180'
                  )}
                >
                  <ChevronDown />
                </SidebarMenuAction>
              </CollapsibleTrigger>
            </Link>
          </SidebarMenuButton>
          <CollapsibleContent>
            <SidebarMenu className="ml-7 border-l pl-4 py-2 gap-0">
                 <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        size="sm"
                        variant="ghost"
                        className="w-full justify-start"
                        isActive={isCrmActive}
                    >
                        <Link href="/business-management/crm-suite">CRM Suite</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
              {items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    size="sm"
                    variant="ghost"
                    className="w-full justify-start"
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>
       )
  }

  return (
    <Collapsible open={isOpen && open} onOpenChange={setIsOpen}>
        <SidebarMenuButton
            asChild
            variant="ghost"
            className="w-full justify-start gap-2"
            isActive={pathname === dashboardHref && !items.some(item => pathname.startsWith(item.href))}
            tooltip={title}
        >
            <Link href={dashboardHref}>
                {icon}
                <span>{title}</span>
                {items.length > 0 && (
                    <CollapsibleTrigger asChild>
                        <SidebarMenuAction
                            className={cn(
                            'relative ml-auto transition-transform',
                            isOpen && 'rotate-180'
                            )}
                        >
                            <ChevronDown />
                        </SidebarMenuAction>
                    </CollapsibleTrigger>
                )}
            </Link>
        </SidebarMenuButton>
      <CollapsibleContent>
        <SidebarMenu className="ml-7 border-l pl-4 py-2 gap-0">
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                size="sm"
                variant="ghost"
                className="w-full justify-start"
                isActive={pathname.startsWith(item.href)}
              >
                <Link href={item.href}>{item.label}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </CollapsibleContent>
    </Collapsible>
  );
};

export function SidebarNav() {
  const pathname = usePathname();

  if (pathname.startsWith('/business-management/crm-suite') || pathname.startsWith('/ideation') || pathname.startsWith('/business-creation') || pathname.startsWith('/7-day-blueprint')) {
      return null; // The layout for the specific suite will render its own sidebar
  }

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
            <SidebarMenuButton asChild isActive={pathname === '/dashboard'} tooltip="Active Tool Kits">
              <Link href="/dashboard">
                <Home />
                <span>Active Tool Kits</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

           <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith('/ideation')} tooltip="Ideation">
              <Link href="/ideation">
                <BrainCircuit />
                <span>Ideation</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith('/business-creation')} tooltip="Business Creation">
              <Link href="/business-creation">
                <Rocket />
                <span>Business Creation</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
           <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith('/7-day-blueprint')} tooltip="7-Day Blueprint">
              <Link href="/7-day-blueprint">
                <CalendarCheck />
                <span>7-Day Blueprint</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SubMenu
              icon={<Briefcase />}
              title="Business Management"
              pathname={pathname}
              dashboardHref="/business-management/insights-dashboard"
              items={[
                { href: '/business-management/insights-dashboard', label: 'Insights Dashboard' },
                { href: '/business-management/project-task-manager', label: 'Project & Task Manager' },
                { href: '/business-management/hr-system', label: 'HR System' },
              ]}
            />
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SubMenu
              icon={<Package />}
              title="Products"
              pathname={pathname}
              dashboardHref="/products/dashboard"
              items={[
                { href: '/products/dashboard', label: 'Products Dashboard' },
                { href: '/products/market-ready', label: 'Market-Ready Products' },
                { href: '/products/upcoming', label: 'Upcoming Products' },
                { href: '/products/pricing', label: 'Pricing' },
                { href: '/products/inventory', label: 'Inventory' },
                { href: '/products/sourcing', label: 'Sourcing' },
              ]}
            />
          </SidebarMenuItem>

           <SidebarMenuItem>
            <SubMenu
              icon={<CircleDollarSign />}
              title="Financials"
              pathname={pathname}
              dashboardHref="/financials/dashboard"
              items={[
                { href: '/financials/dashboard', label: 'Finance Dashboard' },
                { href: '/financials/asset-management', label: 'Asset Management' },
                { href: '/financials/expense-logger', label: 'Business Expense Logger' },
                { href: '/financials/vat-calculator', label: 'VAT Calculator & Reporter' },
                { href: '/financials/digital-logbook', label: 'Digital Logbook (for BRN)' },
                { href: '/financials/reports', label: 'Monthly & Annual Reports' },
                 { href: '/financials/grants-financing', label: 'Grants & Financing' },
              ]}
            />
          </SidebarMenuItem>

           <SidebarMenuItem>
            <SubMenu
              icon={<Megaphone />}
              title="Marketing & Ads"
              pathname={pathname}
              dashboardHref="/marketing/dashboard"
              items={[
                { href: '/marketing/dashboard', label: 'Marketing Dashboard' },
                { href: '/marketing/landing-page-builder', label: 'Landing Page Builder' },
                { href: '/marketing/campaign-builder', label: 'Campaign Builder' },
                { href: '/marketing/content-generator', label: 'Content Generator' },
                { href: '/marketing/video-generator', label: 'Video Script Generator' },
                { href: '/marketing/social-posts-generator', label: 'Social Posts Generator' },
              ]}
            />
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/todo'} tooltip="To-do">
              <Link href="/todo">
                <ClipboardList />
                <span>To-do</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/business-resources'} tooltip="Business Resources">
              <Link href="/business-resources">
                <Book />
                <span>Business Resources</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarFooter />
      </SidebarContent>
    </Sidebar>
  );
}
