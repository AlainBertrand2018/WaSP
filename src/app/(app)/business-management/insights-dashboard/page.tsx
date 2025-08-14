
'use client';

import { BentoGrid, BentoGridItem } from '@/components/aceternity/bento-grid';
import Spline from '@splinetool/react-spline';
import {
  ChevronDown,
  FileText,
  Lightbulb,
  Rocket,
  Wallet,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const items = [
  {
    title: 'Start a New Venture',
    description:
      'Begin the 4-step journey to validate your idea and create a full business plan.',
    header: (
      <Image
        src="/images/TilePics/val2Bp_600x300.webp"
        width={600}
        height={300}
        alt="Start a new venture"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl object-cover"
        data-ai-hint="business plan journey"
      />
    ),
    icon: <Lightbulb className="h-4 w-4 text-neutral-500" />,
    className: 'md:col-span-2',
    href: '/business-creation',
  },
  {
    title: 'Manage Your Business',
    description:
      'Access your CRM, project manager, and other operational tools.',
    header: (
      <Image
        src="/images/TilePics/business_CRM_AppTile.webp"
        width={300}
        height={300}
        alt="Manage your business"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl object-cover"
        data-ai-hint="customer relationship management"
      />
    ),
    icon: <Rocket className="h-4 w-4 text-neutral-500" />,
    className: 'md:col-span-1',
    href: '/business-management/crm-suite',
  },
  {
    title: 'Financial Planning',
    description:
      'Dive into your financial dashboard, manage expenses, and create reports.',
    header: (
      <Image
        src="/images/TilePics/business_ExpensesLogger_AppTile.webp"
        width={300}
        height={300}
        alt="Financial Planning"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl object-cover"
        data-ai-hint="financial planning"
      />
    ),
    icon: <Wallet className="h-4 w-4 text-neutral-500" />,
    className: 'md:col-span-1',
    href: '/financials/dashboard',
  },
  {
    title: 'Recent Documents',
    description:
      'Quickly access your recently created business plans and reports.',
    header: (
      <Image
        src="/images/TilePics/recDoc_600x300.webp"
        width={600}
        height={300}
        alt="Recent Documents"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl object-cover"
        data-ai-hint="documents folder"
      />
    ),
    icon: <FileText className="h-4 w-4 text-neutral-500" />,
    className: 'md:col-span-2',
    href: '/business-creation',
  },
];

export default function InsightsDashboardPage() {
  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      <section className="relative w-full h-[40vh] md:min-h-[90vh]">
        <Spline
          scene="https://prod.spline.design/FKmWkI9k5Dkb9cLz/scene.splinecode"
          className="!absolute !top-0 !left-0 !w-full !h-full"
        />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <Link
            href="#toolkits"
            onClick={(e) => handleScrollTo(e, 'toolkits')}
            className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/50 flex items-center justify-center text-primary-foreground hover:bg-primary/40 transition-colors animate-bounce"
            aria-label="Scroll to next section"
          >
            <ChevronDown size={32} />
          </Link>
        </div>
      </section>

      <div className="px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <section className="text-center mb-12" id="toolkits">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Your Active Toolkits
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of your entire business ecosystem.
          </p>
        </section>
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
    </div>
  );
}
