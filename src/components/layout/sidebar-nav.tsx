
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
  Building,
  Lightbulb,
  ChevronRight,
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

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className='flex items-center h-auto'>
            <SidebarMenuButton
                asChild
                variant="ghost"
                className="w-full justify-start h-auto flex-grow"
                isActive={pathname === dashboardHref && !items.some(item => pathname.startsWith(item.href))}
                tooltip={title}
            >
                <Link href={dashboardHref} className='flex items-center gap-2'>
                    {icon}
                    <span>{title}</span>
                </Link>
            </SidebarMenuButton>
            {items.length > 0 && open && (
                <CollapsibleTrigger asChild>
                    <button
                        className={cn(
                        'p-1 ml-auto transition-transform rounded-md hover:bg-muted',
                        isOpen && 'rotate-180'
                        )}
                    >
                        <ChevronDown />
                    </button>
                </CollapsibleTrigger>
            )}
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


const BusinessCreationSubMenu = () => {
    const pathname = usePathname();
    const { open } = useSidebar();
    const isParentActive = pathname.startsWith('/business-creation') || pathname.startsWith('/ideation') || pathname.startsWith('/7-day-blueprint');
    const [isOpen, setIsOpen] = React.useState(isParentActive);

    const isValidationActive = pathname.startsWith('/business-creation/business-idea-validation') || pathname.startsWith('/business-creation/mvp-planner') || pathname.startsWith('/business-creation/startup-budget-planner') || pathname.startsWith('/business-creation/business-plan-generator');
    const [isValidationOpen, setIsValidationOpen] = React.useState(isValidationActive);
    
    React.useEffect(() => {
        if (!open) {
        setIsOpen(false);
        setIsValidationOpen(false);
        }
    }, [open]);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div className='flex items-center h-auto'>
                <SidebarMenuButton
                    asChild
                    variant="ghost"
                    className="w-full justify-start h-auto flex-grow"
                    isActive={pathname === '/business-creation'}
                    tooltip="Business Creation"
                >
                    <Link href="/business-creation" className='flex items-center gap-2'>
                        <Rocket />
                        <span>Business Creation</span>
                    </Link>
                </SidebarMenuButton>
                 {open && (
                    <CollapsibleTrigger asChild>
                        <button
                            className={cn(
                            'p-1 ml-auto transition-transform rounded-md hover:bg-muted',
                            isOpen && 'rotate-180'
                            )}
                        >
                            <ChevronDown />
                        </button>
                    </CollapsibleTrigger>
                )}
            </div>
            <CollapsibleContent>
                <SidebarMenu className="ml-7 border-l pl-4 py-2 gap-1">
                    {/* Ideation */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="sm" variant="ghost" className="w-full justify-start" isActive={pathname.startsWith('/ideation/brainstorming')}>
                            <Link href="/ideation/brainstorming" className="flex items-center gap-2">
                                <BrainCircuit className="h-3.5 w-3.5" />
                                <span>Ideation</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Idea Validation Group */}
                    <SidebarMenuItem>
                       <Collapsible open={isValidationOpen} onOpenChange={setIsValidationOpen}>
                           <div className="flex items-center">
                                <SidebarMenuButton asChild size="sm" variant="ghost" className="w-full justify-start flex-grow" isActive={isValidationActive && pathname !== '/business-creation/business-idea-validation'}>
                                     <Link href="/business-creation/business-idea-validation" className="flex items-center gap-2">
                                        <Lightbulb className="h-3.5 w-3.5" />
                                        <span>Idea Validation</span>
                                    </Link>
                                </SidebarMenuButton>
                                {open && (
                                    <CollapsibleTrigger asChild>
                                        <button className={cn('p-1 ml-auto transition-transform rounded-md hover:bg-muted', isValidationOpen && 'rotate-180')}>
                                            <ChevronDown className="h-4 w-4"/>
                                        </button>
                                    </CollapsibleTrigger>
                                )}
                           </div>
                            <CollapsibleContent>
                                <SidebarMenu className="ml-7 border-l pl-4 py-1 gap-0">
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild size="sm" variant="ghost" className="w-full justify-start text-xs" isActive={pathname.startsWith('/business-creation/business-idea-validation')}>
                                            <Link href="/business-creation/business-idea-validation">Business Idea Validation</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                     <SidebarMenuItem>
                                        <SidebarMenuButton asChild size="sm" variant="ghost" className="w-full justify-start text-xs" isActive={pathname.startsWith('/business-creation/mvp-planner')}>
                                            <Link href="/business-creation/mvp-planner">MVP Planner</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                     <SidebarMenuItem>
                                        <SidebarMenuButton asChild size="sm" variant="ghost" className="w-full justify-start text-xs" isActive={pathname.startsWith('/business-creation/startup-budget-planner')}>
                                            <Link href="/business-creation/startup-budget-planner">Startup Budget</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                     <SidebarMenuItem>
                                        <SidebarMenuButton asChild size="sm" variant="ghost" className="w-full justify-start text-xs" isActive={pathname.startsWith('/business-creation/business-plan-generator')}>
                                            <Link href="/business-creation/business-plan-generator">Business Plan Generator</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </CollapsibleContent>
                       </Collapsible>
                    </SidebarMenuItem>

                    {/* Quick Start */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="sm" variant="ghost" className="w-full justify-start" isActive={pathname.startsWith('/7-day-blueprint')}>
                            <Link href="/7-day-blueprint" className="flex items-center gap-2">
                                <CalendarCheck className="h-3.5 w-3.5" />
                                <span>Quick Start</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </CollapsibleContent>
        </Collapsible>
    )
}


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
          <SidebarTrigger className="hidden md:flex" />
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
            <SidebarMenuButton asChild isActive={pathname.startsWith('/apps')} tooltip="App Gallery">
              <Link href="/apps">
                <LayoutGrid />
                <span>App Gallery</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <BusinessCreationSubMenu />
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SubMenu
              icon={<Briefcase />}
              title="Business Management"
              pathname={pathname}
              dashboardHref="/business-management"
              items={[
                { href: '/business-management/crm-suite', label: 'CRM Suite' },
                { href: '/business-management/project-task-manager', label: 'Project & Task Manager' },
                { href: '/business-management/hr-system', label: 'HR System' },
                { href: '/compliance-validator', label: 'Compliance Validator' },
              ]}
            />
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SubMenu
              icon={<Package />}
              title="Products"
              pathname={pathname}
              dashboardHref="/products"
              items={[
                { href: '/products/creator', label: 'Product Creator' },
                { href: '/products/inventory', label: 'Product Inventory' },
                { href: '/products/pricing', label: 'Pricing Manager' },
              ]}
            />
          </SidebarMenuItem>

           <SidebarMenuItem>
            <SubMenu
              icon={<CircleDollarSign />}
              title="Financials"
              pathname={pathname}
              dashboardHref="/financials"
              items={[
                { href: '/financials/asset-management', label: 'Asset Management' },
                { href: '/financials/expense-logger', label: 'Business Expense Logger' },
                { href: '/financials/vat-calculator', label: 'VAT Calculator & Reporter' },
                { href: '/financials/digital-logbook', label: 'Digital Logbook (for BRN)' },
                { href: '/financials/reports', label: 'Annual Reports Generator' },
                 { href: '/financials/grants-financing', label: 'Grants & Financing' },
              ]}
            />
          </SidebarMenuItem>

           <SidebarMenuItem>
            <SubMenu
              icon={<Megaphone />}
              title="Marketing & Ads"
              pathname={pathname}
              dashboardHref="/marketing"
              items={[
                { href: '/marketing/campaign-builder', label: 'Campaign Builder' },
                { href: '/marketing/landing-page-builder', label: 'Landing Page Builder' },
                { href: '/marketing/content-generator', label: 'Content Generator' },
                { href: '/marketing/video-generator', label: 'Video Script Generator' },
                { href: '/marketing/social-posts-generator', label: 'Social Posts Generator' },
              ]}
            />
          </SidebarMenuItem>

           <SidebarMenuItem>
            <SubMenu
              icon={<Building />}
              title="Specialized Apps"
              pathname={pathname}
              dashboardHref="/industries"
              items={[
                 { href: 'https://serena.avantaz.online/', label: 'Serena (for Homecare)' },
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
