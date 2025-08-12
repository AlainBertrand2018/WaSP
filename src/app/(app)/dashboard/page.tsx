
import { BentoGrid, BentoGridItem } from '@/components/aceternity/bento-grid';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileText, Lightbulb, Rocket, Wallet } from 'lucide-react';

const items = [
    {
        title: "Start a New Venture",
        description: "Begin the 4-step journey to validate your idea and create a full business plan.",
        header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>,
        icon: <Lightbulb className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-2",
    },
    {
        title: "Manage Your Business",
        description: "Access your CRM, project manager, and other operational tools.",
        header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>,
        icon: <Rocket className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-1",
    },
    {
        title: "Financial Planning",
        description: "Dive into your financial dashboard, manage expenses, and create reports.",
        header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>,
        icon: <Wallet className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-1",
    },
    {
        title: "Recent Documents",
        description: "Quickly access your recently created business plans and reports.",
        header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>,
        icon: <FileText className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-2",
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
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    className={item.className}
                />
            ))}
        </BentoGrid>
      </section>
    </div>
  );
}
