
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
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import React from 'react';
import { ChevronDown } from 'lucide-react';

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
  const [isOpen, setIsOpen] = React.useState(
    items.some((item) => pathname.startsWith(item.href)) || pathname === dashboardHref
  );

  // Special case for CRM suite
  if (title === 'Business Management') {
      const isCrmActive = pathname.startsWith('/business-management/crm-suite');
       return (
        <Collapsible open={isOpen || isCrmActive} onOpenChange={setIsOpen}>
          <div className="flex items-center">
            <SidebarMenuButton
              asChild
              variant="ghost"
              className="w-full justify-start gap-2"
              isActive={pathname === dashboardHref && !isCrmActive}
            >
              <Link href={dashboardHref}>
                {icon}
                <span>{title}</span>
              </Link>
            </SidebarMenuButton>
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
          </div>
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
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center">
        <SidebarMenuButton
          asChild
          variant="ghost"
          className="w-full justify-start gap-2"
          isActive={pathname === dashboardHref}
        >
          <Link href={dashboardHref}>
            {icon}
            <span>{title}</span>
          </Link>
        </SidebarMenuButton>
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
      </div>
      <CollapsibleContent>
        <SidebarMenu className="ml-7 border-l pl-4 py-2 gap-0">
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
  );
};

export function SidebarNav() {
  const pathname = usePathname();

  if (pathname.startsWith('/business-management/crm-suite')) {
      return null; // The CRM layout will render its own sidebar
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4 h-[60px] flex items-center">
          {/* The logo and title are now in the main app layout header */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
              <Link href="/dashboard">
                <Home />
                <span>360° Business Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

           <SidebarMenuItem>
            <SubMenu
              icon={<BrainCircuit />}
              title="Ideation"
              pathname={pathname}
              dashboardHref="/ideation"
              items={[
                { href: '/ideation/brainstorming', label: 'Brainstorming Tool' },
              ]}
            />
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SubMenu
              icon={<Rocket />}
              title="Business Creation"
              pathname={pathname}
              dashboardHref="/business-management"
              items={[
                { href: '/business-management/business-idea-validation', label: 'Business Idea Validation' },
                { href: '/business-management/7-day-blueprint', label: '7-Day Business Blueprint' },
                { href: '/business-management/mvp-planner', label: 'MVP Planner' },
                { href: '/financials/startup-budget-planner', label: 'Startup Budget Planner'},
                { href: '/business-management/business-plan-generator', label: 'Business Plan Generator' },
              ]}
            />
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SubMenu
              icon={<Briefcase />}
              title="Business Management"
              pathname={pathname}
              dashboardHref="/business-management/insights-dashboard"
              items={[
                { href: '/business-management/insights-dashboard', label: 'Insights Dashboard' },
                { href: '/business-management/compliance-validator', label: 'Compliance Validator' },
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
            <SidebarMenuButton asChild isActive={pathname === '/todo'}>
              <Link href="/todo">
                <ClipboardList />
                <span>To-do</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/business-resources'}>
              <Link href="/business-resources">
                <Book />
                <span>Business Resources</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
