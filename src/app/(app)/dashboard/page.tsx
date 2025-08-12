
import { BentoGrid, BentoGridItem } from '@/components/aceternity/bento-grid';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileText, Lightbulb, Rocket, Wallet } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const items = [
    {
        title: "Start a New Venture",
        description: "Begin the 4-step journey to validate your idea and create a full business plan.",
        header: <Image src="/images/TilePics/val2Bp_600x300.webp" width={600} height={300} alt="Start a new venture" className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl object-cover" data-ai-hint="business plan journey" />,
        icon: <Lightbulb className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-2",
        href: "/business-creation",
    },
    {
        title: "Manage Your Business",
        description: "Access your CRM, project manager, and other operational tools.",
        header: <Image src="/images/TilePics/business_CRM_AppTile.webp" width={300} height={300} alt="Manage your business" className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl object-cover" data-ai-hint="customer relationship management" />,
        icon: <Rocket className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-1",
        href: "/business-management/crm-suite",
    },
    {
        title: "Financial Planning",
        description: "Dive into your financial dashboard, manage expenses, and create reports.",
        header: <Image src="/images/TilePics/business_ExpensesLogger_AppTile.webp" width={300} height={300} alt="Financial Planning" className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl object-cover" data-ai-hint="financial planning" />,
        icon: <Wallet className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-1",
        href: "/financials/dashboard",
    },
    {
        title: "Recent Documents",
        description: "Quickly access your recently created business plans and reports.",
        header: <Image src="/images/TilePics/recDoc_600x300.webp" width={600} height={300} alt="Recent Documents" className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl object-cover" data-ai-hint="documents folder" />,
        icon: <FileText className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-2",
        href: "/business-creation",
    },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          360° Business Dashboard
        </h1>
        <p className="text-muted-foreground">
          A comprehensive overview of your entire business ecosystem.
        </p>
      </div>

      <section>
        <BentoGrid className="max-w-4xl mx-auto">
            {items.map((item, i) => (
              <Link href={item.href || '#'} key={i} className={item.className}>
                <BentoGridItem
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    className="h-full"
                />
              </Link>
            ))}
        </BentoGrid>
      </section>
    </div>
  );
}
