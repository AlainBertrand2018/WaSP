
'use client';

import {
  BookText,
  Briefcase,
  CheckCheck,
  CircleDollarSign,
  FileText,
  GanttChartSquare,
  HeartHandshake,
  LayoutTemplate,
  Lightbulb,
  LineChart,
  Megaphone,
  Package,
  Users,
  Video,
  type LucideIcon,
  BrainCircuit,
  CalendarCheck,
  Building,
  Rocket,
} from 'lucide-react';
import React from 'react';

export type AppData = {
    icon: LucideIcon;
    title: string;
    description: string;
    href: string;
    pro?: boolean;
    imageSrc: string;
    badge?: { text: string; className: string; };
    initialRating: number;
    initialRaters?: number;
};

export type AppCategory = {
    category: string;
    description: string;
    href: string;
    icon: LucideIcon;
    apps: AppData[];
};


export const appCategories: AppCategory[] = [
  {
    category: 'Business Creation',
    description: 'Tools to take your idea from concept to investor-ready.',
    href: '/business-creation',
    icon: Rocket,
    apps: [
      {
        icon: BrainCircuit,
        title: 'Brainstorming Tool',
        description: 'A multi-step, guided app to find a business idea that fits your profile and the Mauritian market.',
        href: '/ideation/brainstorming',
        pro: false,
        imageSrc: '/images/business_Ideation_Apptile_4.webp',
        badge: { text: 'New', className: 'bg-blue-500' },
        initialRating: 0,
      },
      {
        icon: Lightbulb,
        title: 'Business Idea Validation',
        description: "Get AI-powered feedback on your business concept's viability in the Mauritian market.",
        href: '/business-creation/business-idea-validation',
        pro: true,
        imageSrc: '/images/business_Validation-Apptile_2.webp',
        badge: { text: 'Top Value', className: 'bg-yellow-500' },
        initialRating: 4.5,
        initialRaters: 20,
      },
      {
        icon: CalendarCheck,
        title: '7-Day Business Blueprint',
        description: 'A guided, week-long sprint to take you from initial idea to a launch-ready business plan.',
        href: '/7-day-blueprint',
        pro: true,
        imageSrc: '/images/buisiness-7day_apptile.webp',
        badge: { text: 'New', className: 'bg-blue-500' },
        initialRating: 0,
      }
    ],
  },
  {
    category: 'Business Management',
    description: 'Tools to streamline your daily operations.',
    href: '/business-management',
    icon: Briefcase,
    apps: [
        {
            icon: CheckCheck,
            title: 'Compliance Validator',
            description: 'Ensure your business complies with local regulations.',
            href: '/compliance-validator',
            pro: false,
            imageSrc: '/images/TilePics/business_ComplianceValidator_AppTile.webp',
            initialRating: 4.8,
            initialRaters: 35,
        },
        {
            icon: HeartHandshake,
            title: 'CRM SUITE',
            description: 'Manage customers, appointments, and invoices.',
            href: '/business-management/crm-suite',
            pro: false,
            imageSrc: '/images/TilePics/business_CRM_AppTile.webp',
            badge: { text: 'Hot', className: 'bg-red-600' },
            initialRating: 4.0,
            initialRaters: 15,
        },
        {
            icon: GanttChartSquare,
            title: 'Project & Task Manager',
            description: 'Organize projects and track tasks efficiently.',
            href: '/business-management/project-task-manager',
            pro: false,
            imageSrc: '/images/TilePics/business_ProjectMan_AppTile.webp',
            initialRating: 4.6,
            initialRaters: 18,
        },
        {
            icon: Users,
            title: 'HR System',
            description: 'Manage payroll, leave, and employee information.',
            href: '/business-management/hr-system',
            pro: false,
            imageSrc: '/images/TilePics/business_payroll_AppTile.webp',
            initialRating: 4.1,
            initialRaters: 9,
        },
    ]
  },
  {
    category: 'Financials',
    description: 'Manage your finances and plan for growth.',
    href: '/financials',
    icon: CircleDollarSign,
    apps: [
          {
            icon: Briefcase,
            title: 'Grants & Financing',
            description: 'Explore funding opportunities for your SME.',
            href: '/financials/grants-financing',
            pro: false,
            imageSrc: '/images/TilePics/business_GrantsLoanMan_AppTile.webp',
            initialRating: 4.7,
            initialRaters: 25,
          },
          {
            icon: LineChart,
            title: 'Asset Management',
            description: "Track and manage your company's assets.",
            href: '/financials/asset-management',
            pro: false,
            imageSrc: '/images/TilePics/business_AssetManagement_AppTile.webp',
            initialRating: 4.2,
            initialRaters: 11,
          },
          {
            icon: CircleDollarSign,
            title: 'Business Expenses Logger',
            description: 'Log and categorize your business expenses.',
            href: '/financials/expense-logger',
            pro: false,
            imageSrc: '/images/TilePics/business_ExpensesLogger_AppTile.webp',
            initialRating: 4.3,
            initialRaters: 22,
          },
          {
            icon: CircleDollarSign,
            title: 'VAT Calculator & Reporter',
            description: 'Calculate and prepare your VAT reports for MRA.',
            href: '/financials/vat-calculator',
            pro: false,
            imageSrc: '/images/TilePics/business_VatCalculator_AppTile-.webp',
            initialRating: 4.9,
            initialRaters: 40,
          },
          {
            icon: BookText,
            title: 'Digital Logbook',
            description: 'Maintain your required digital log of business transactions.',
            href: '/financials/digital-logbook',
            pro: false,
            imageSrc: '/images/TilePics/business_DigitalLogbook_AppTile.webp',
            initialRating: 4.4,
            initialRaters: 14,
          },
          {
            icon: FileText,
            title: 'Annual Reports Generator',
            description: 'Generate professional annual financial reports.',
            href: '/financials/reports',
            pro: false,
            imageSrc: '/images/TilePics/business_AnnReportBuilder_AppTile.webp',
            initialRating: 4.6,
            initialRaters: 17,
          }
    ]
  },
  {
    category: 'Marketing & Ads',
    description: 'Tools to grow your audience and drive sales.',
    href: '/marketing',
    icon: Megaphone,
    apps: [
        {
            icon: Megaphone,
            title: 'Marketing Campaign Builder',
            description: 'Build and manage your marketing campaigns.',
            href: '/marketing/campaign-builder',
            pro: false,
            badge: { text: 'Most Wanted', className: 'bg-purple-600' },
            imageSrc: '/images/TilePics/marketing_CampaignBuilder_AppTile.webp',
            initialRating: 4.3,
            initialRaters: 30,
        },
        {
            icon: LayoutTemplate,
            title: 'Landing Page Builder',
            description: 'Create and publish high-converting landing pages.',
            href: '/marketing/landing-page-builder',
            pro: false,
            imageSrc: '/images/TilePics/marketing_LandPageBuilder_AppTile.webp',
            initialRating: 4.5,
            initialRaters: 28,
        },
        {
            icon: FileText,
            title: 'Blog and Podcast Content Generator',
            description: 'Generate, schedule, and post content automatically.',
            href: '/marketing/content-generator',
            pro: false,
            imageSrc: '/images/TilePics/marketing_BlogPostGen_AppTile.webp',
            initialRating: 4.4,
            initialRaters: 19,
        },
        {
            icon: FileText,
            title: 'Social Posts Generator',
            description: 'Generate and schedule posts for your social media channels.',
            href: '/marketing/social-posts-generator',
            pro: false,
            imageSrc: '/images/TilePics/marketing_ContentGenerator_AppTile.webp',
            initialRating: 4.2,
            initialRaters: 23,
        },
    ]
  },
  {
    category: 'Products',
    description: 'Manage your product lifecycle from sourcing to sale.',
    href: '/products',
    icon: Package,
    apps: [
        {
            icon: Package,
            title: 'Product Creator',
            description: 'Design and define new products for your business.',
            href: '/products/creator',
            pro: false,
            imageSrc: '/images/TilePics/product_Creation_AppTile.webp',
            initialRating: 4.2,
            initialRaters: 12,
        },
        {
            icon: Package,
            title: 'Product Inventory',
            description: 'Track and manage your stock levels and product info.',
            href: '/products/inventory',
            pro: false,
            imageSrc: '/images/TilePics/product_Inventory_AppTile.webp',
            initialRating: 4.4,
            initialRaters: 21,
        },
        {
            icon: CircleDollarSign,
            title: 'Product Pricing Manager',
            description: 'Set and manage your product pricing strategies.',
            href: '/products/pricing',
            pro: false,
            imageSrc: '/images/TilePics/product_Pricing_AppTile.webp',
            initialRating: 4.3,
            initialRaters: 13,
        }
    ]
  },
  {
    category: 'Specialized Apps',
    description: 'Tailored solutions for specific industry needs.',
    href: '/industries',
    icon: Building,
    apps: [
      {
        icon: HeartHandshake,
        title: 'Serena',
        description: 'A Management app dedicated to Homecare Service Providers.',
        href: 'https://serena.avantaz.online/',
        pro: false,
        imageSrc: '/images/TilePics/serena_apptile.webp',
        badge: { text: 'New', className: 'bg-blue-500' },
        initialRating: 0,
      },
    ],
  },
];
