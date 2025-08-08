
'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  ArrowRight,
  Briefcase,
  CheckCheck,
  CircleDollarSign,
  FileText,
  GanttChartSquare,
  HeartHandshake,
  Lightbulb,
  LineChart,
  Megaphone,
  Package,
  Rocket,
  Users,
} from 'lucide-react';
import Link from 'next/link';

const appCategories = [
  {
    category: 'Business Creation',
    description: 'Tools to take your idea from concept to investor-ready.',
    apps: [
      {
        icon: <Lightbulb className="h-8 w-8 text-primary" />,
        title: 'Business Idea Validation',
        description: 'Assess your business idea against the Mauritian market.',
        href: '/business-management/business-idea-validation',
        pro: true,
        badge: { text: 'Popular', className: 'bg-blue-600' },
      },
      {
        icon: <Rocket className="h-8 w-8 text-primary" />,
        title: 'MVP Planner',
        description: 'Define the core features and plan for your MVP.',
        href: '/business-management/mvp-planner',
        pro: true,
      },
      {
        icon: <FileText className="h-8 w-8 text-primary" />,
        title: 'Business Plan Generator',
        description: 'Synthesize data into a professional business plan.',
        href: '/business-management/business-plan-generator',
        pro: true,
        badge: { text: 'Best Rated', className: 'bg-yellow-500' },
      },
    ],
  },
  {
    category: 'Business Management',
    description: 'Tools to streamline your daily operations.',
    apps: [
        {
            icon: <LineChart className="h-8 w-8 text-primary" />,
            title: 'Insights Dashboard',
            description: 'AI-powered insights for your business.',
            href: '/business-management/insights-dashboard',
            pro: true,
        },
        {
            icon: <CheckCheck className="h-8 w-8 text-primary" />,
            title: 'Compliance Validator',
            description: 'Ensure your business complies with local regulations.',
            href: '/business-management/compliance-validator',
            pro: false,
        },
        {
            icon: <HeartHandshake className="h-8 w-8 text-primary" />,
            title: 'CRM Suite',
            description: 'Manage customers, appointments, and invoices.',
            href: '/business-management/crm-suite',
            pro: false,
        },
        {
            icon: <GanttChartSquare className="h-8 w-8 text-primary" />,
            title: 'Project & Task Manager',
            description: 'Organize projects and track tasks efficiently.',
            href: '/business-management/project-task-manager',
            pro: false,
        },
        {
            icon: <Users className="h-8 w-8 text-primary" />,
            title: 'HR System',
            description: 'Manage payroll, leave, and employee information.',
            href: '/business-management/hr-system',
            pro: false,
        },
    ]
  },
  {
    category: 'Financials',
    description: 'Manage your finances and plan for growth.',
    apps: [
        {
            icon: <CircleDollarSign className="h-8 w-8 text-primary" />,
            title: 'Startup Budget Planner',
            description: 'Map out costs and calculate your break-even point.',
            href: '/financials/startup-budget-planner',
            pro: true,
            badge: { text: 'HOT', className: 'bg-red-600' },
          },
          {
            icon: <Briefcase className="h-8 w-8 text-primary" />,
            title: 'Grants & Financing',
            description: 'Explore funding opportunities for your SME.',
            href: '/financials/grants-financing',
            pro: false,
          }
    ]
  },
  {
    category: 'Marketing & Ads',
    description: 'Tools to grow your audience and drive sales.',
    apps: [
        {
            icon: <Megaphone className="h-8 w-8 text-primary" />,
            title: 'Marketing Campaign Builder',
            description: 'Build and manage your marketing campaigns.',
            href: '/marketing/campaign-builder',
            pro: false,
        }
    ]
  },
  {
    category: 'Products',
    description: 'Manage your product lifecycle from sourcing to sale.',
    apps: [
        {
            icon: <Package className="h-8 w-8 text-primary" />,
            title: 'Product & Inventory',
            description: 'Track and manage your stock levels and product info.',
            href: '/products/inventory',
            pro: false,
        }
    ]
  }
];

export default function AppGalleryPage() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">App Gallery</h1>
        <p className="text-muted-foreground">
          Launch powerful, AI-driven tools to build and manage your business.
        </p>
      </div>

      <div className="space-y-12">
        {appCategories.map((category) => (
          <section key={category.category}>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                        {category.category}
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        {category.description}
                    </p>
                </div>
                <Link href="#" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                    See all
                    <ArrowRight size={16} />
                </Link>
            </div>
            <Carousel opts={{
                align: "start",
                slidesToScroll: 'auto',
            }}
            className="w-full">
                <CarouselContent>
                    {category.apps.map((app) => (
                        <CarouselItem key={app.title} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                             <Link href={app.href} className="block group">
                                <Card
                                    key={app.title}
                                    className="aspect-square flex flex-col items-center justify-center hover:border-primary transition-colors p-4 relative overflow-hidden"
                                >
                                    {app.badge && (
                                        <div className="absolute top-0 left-0 w-24 h-24">
                                            <div className={`absolute transform -rotate-45 text-center text-white font-semibold py-1 left-[-50px] top-[22px] w-[170px] ${app.badge.className}`}>
                                                {app.badge.text}
                                            </div>
                                        </div>
                                     )}
                                    <CardContent className="p-0 flex flex-col items-center text-center gap-4">
                                        <div className="relative">
                                            {app.icon}
                                            {app.pro && (
                                                <div className="absolute -top-2 -right-2 text-xs font-semibold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full text-[10px]">
                                                PRO
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm group-hover:text-primary">{app.title}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
          </section>
        ))}
      </div>
    </div>
  );
}
