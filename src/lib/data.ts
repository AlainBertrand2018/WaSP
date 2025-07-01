import { AppWindow, Presentation, Wand2, type LucideIcon } from 'lucide-react';

export type App = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export type RecentFile = {
  id:string;
  name: string;
  app: string;
  appIcon: LucideIcon;
  date: string;
  size: string;
};

export const apps: App[] = [
  {
    id: 'fidsflow',
    name: 'FidsFlow',
    description: 'Generate engaging social media content.',
    icon: Wand2,
    href: 'https://fidsflow.netlify.app/',
  },
  {
    id: 'expostand-pro',
    name: 'Expostand PRO',
    description: 'Create stunning presentations.',
    icon: Presentation,
    href: 'https://expostandpro.netlify.app/',
  },
];

export const navLinks = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: AppWindow
    },
    {
        name: "Apps",
        href: "/apps",
        icon: AppWindow
    }
]


export const recentFiles: RecentFile[] = [
  {
    id: '1',
    name: 'Q3_Marketing_Deck.pdf',
    app: 'Expostand PRO',
    appIcon: Presentation,
    date: '2024-07-29',
    size: '2.3 MB',
  },
  {
    id: '2',
    name: 'New_Feature_Launch.txt',
    app: 'FidsFlow',
    appIcon: Wand2,
    date: '2024-07-28',
    size: '12 KB',
  },
  {
    id: '3',
    name: 'Weekly_Update.txt',
    app: 'FidsFlow',
    appIcon: Wand2,
    date: '2024-07-26',
    size: '5 KB',
  },
  {
    id: '4',
    name: 'Investor_Pitch_v2.pdf',
    app: 'Expostand PRO',
    appIcon: Presentation,
    date: '2024-07-25',
    size: '4.1 MB',
  },
];
