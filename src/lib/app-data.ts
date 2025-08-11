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
    initialRaters: number;
};

export type AppCategory = {
    category: string;
    description: string;
    apps: AppData[];
};


export const appCategories: AppCategory[] = [
  {
    category: 'Business Creation',
    description: 'Tools to take your idea from concept to investor-ready.',
    apps: [
      {
        icon: Lightbulb,
        title: 'Business Idea Validation',
        description: "Get AI-powered feedback on your business concept's viability in the Mauritian market.",
        href: '/business-management/business-idea-validation?view=standalone',
        pro: true,
        imageSrc: '/images/business_validation_thbn_45sq.png',
        badge: { text: 'Top Value', className: 'bg-yellow-500' },
        initialRating: 4.5,
        initialRaters: 200,
      },
    ],
  },
  {
    category: 'Business Management',
    description: 'Tools to streamline your daily operations.',
    apps: [
        {
            icon: CheckCheck,
            title: 'Compliance Validator',
            description: 'Ensure your business complies with local regulations.',
            href: '/compliance-validator',
            pro: false,
            imageSrc: '/images/TilePics/business_ComplianceValidator_AppTile.webp',
            initialRating: 4.8,
            initialRaters: 320,
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
            initialRaters: 90,
        },
        {
            icon: GanttChartSquare,
            title: 'Project & Task Manager',
            description: 'Organize projects and track tasks efficiently.',
            href: '/business-management/project-task-manager',
            pro: false,
            imageSrc: '/images/TilePics/business_ProjectMan_AppTile.webp',
            initialRating: 4.6,
            initialRaters: 180,
        },
        {
            icon: Users,
            title: 'HR System',
            description: 'Manage payroll, leave, and employee information.',
            href: '/business-management/hr-system',
            pro: false,
            imageSrc: '/images/TilePics/business_payroll_AppTile.webp',
            initialRating: 4.1,
            initialRaters: 110,
        },
    ]
  },
  {
    category: 'Financials',
    description: 'Manage your finances and plan for growth.',
    apps: [
          {
            icon: Briefcase,
            title: 'Grants & Financing',
            description: 'Explore funding opportunities for your SME.',
            href: '/financials/grants-financing',
            pro: false,
            imageSrc: '/images/TilePics/business_GrantsLoanMan_AppTile.webp',
            initialRating: 4.7,
            initialRaters: 250,
          },
          {
            icon: LineChart,
            title: 'Asset Management',
            description: "Track and manage your company's assets.",
            href: '/financials/asset-management',
            pro: false,
            imageSrc: '/images/TilePics/business_AssetManagement_AppTile.webp',
            initialRating: 4.2,
            initialRaters: 85,
          },
          {
            icon: CircleDollarSign,
            title: 'Business Expenses Logger',
            description: 'Log and categorize your business expenses.',
            href: '/financials/expense-logger',
            pro: false,
            imageSrc: '/images/TilePics/business_ExpensesLogger_AppTile.webp',
            initialRating: 4.3,
            initialRaters: 120,
          },
          {
            icon: CircleDollarSign,
            title: 'VAT Calculator & Reporter',
            description: 'Calculate and prepare your VAT reports for MRA.',
            href: '/financials/vat-calculator',
            pro: false,
            imageSrc: '/images/TilePics/business_VatCalculator_AppTile-.webp',
            initialRating: 4.9,
            initialRaters: 410,
          },
          {
            icon: BookText,
            title: 'Digital Logbook',
            description: 'Maintain your required digital log of business transactions.',
            href: '/financials/digital-logbook',
            pro: false,
            imageSrc: '/images/TilePics/business_DigitalLogbook_AppTile.webp',
            initialRating: 4.4,
            initialRaters: 150,
          },
          {
            icon: FileText,
            title: 'Annual Reports Generator',
            description: 'Generate professional annual financial reports.',
            href: '/financials/reports',
            pro: false,
            imageSrc: '/images/TilePics/business_AnnReportBuilder_AppTile.webp',
            initialRating: 4.6,
            initialRaters: 190,
          }
    ]
  },
  {
    category: 'Marketing & Ads',
    description: 'Tools to grow your audience and drive sales.',
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
            initialRaters: 130,
        },
        {
            icon: LayoutTemplate,
            title: 'Landing Page Builder',
            description: 'Create and publish high-converting landing pages.',
            href: '/marketing/landing-page-builder',
            pro: false,
            imageSrc: '/images/TilePics/marketing_LandPageBuilder_AppTile.webp',
            initialRating: 4.5,
            initialRaters: 150,
        },
        {
            icon: FileText,
            title: 'Blog and Podcast Content Generator',
            description: 'Generate, schedule, and post content automatically.',
            href: '/marketing/content-generator',
            pro: false,
            imageSrc: '/images/TilePics/marketing_BlogPostGen_AppTile.webp',
            initialRating: 4.4,
            initialRaters: 140,
        },
        {
            icon: FileText,
            title: 'Social Posts Generator',
            description: 'Generate and schedule posts for your social media channels.',
            href: '/marketing/social-posts-generator',
            pro: false,
            imageSrc: '/images/TilePics/marketing_ContentGenerator_AppTile.webp',
            initialRating: 4.2,
            initialRaters: 115,
        },
        {
            icon: Video,
            title: 'Video Script Generator',
            description: 'Create engaging video content with AI assistance.',
            href: '/marketing/video-generator',
            pro: false,
            imageSrc: '/images/TilePics/marketing_VideoScriptGen_AppTile.webp',
            initialRating: 4.1,
            initialRaters: 105,
        },
    ]
  },
  {
    category: 'Products',
    description: 'Manage your product lifecycle from sourcing to sale.',
    apps: [
        {
            icon: Package,
            title: 'Product Creator',
            description: 'Design and define new products for your business.',
            href: '/products/creator',
            pro: false,
            imageSrc: '/images/TilePics/product_Creation_AppTile.webp',
            initialRating: 4.2,
            initialRaters: 75,
        },
        {
            icon: Package,
            title: 'Product Inventory',
            description: 'Track and manage your stock levels and product info.',
            href: '/products/inventory',
            pro: false,
            imageSrc: '/images/TilePics/product_Inventory_AppTile.webp',
            initialRating: 4.4,
            initialRaters: 160,
        },
        {
            icon: CircleDollarSign,
            title: 'Product Pricing Manager',
            description: 'Set and manage your product pricing strategies.',
            href: '/products/pricing',
            pro: false,
            imageSrc: '/images/TilePics/product_Pricing_AppTile.webp',
            initialRating: 4.3,
            initialRaters: 95,
        }
    ]
  }
];