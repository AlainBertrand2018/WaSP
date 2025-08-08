
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
            <h2 className="text-2xl font-semibold tracking-tight">
              {category.category}
            </h2>
            <p className="text-muted-foreground mt-1">
              {category.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              {category.apps.map((app) => (
                <Card
                  key={app.title}
                  className="flex flex-col hover:border-primary transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      {app.icon}
                      {app.pro && (
                        <div className="text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-full">
                          PRO
                        </div>
                      )}
                    </div>
                    <CardTitle className="pt-4">{app.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{app.description}</CardDescription>
                  </CardContent>
                  <CardContent>
                    <Button asChild className="w-full group">
                      <Link href={app.href}>
                        <span>Launch App</span>
                        <ArrowRight className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
