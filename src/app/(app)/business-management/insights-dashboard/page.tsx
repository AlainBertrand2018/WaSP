
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Briefcase, FileText, Users, Receipt } from 'lucide-react';

const mockProjects = [
  {
    id: 'PROJ-001',
    name: 'E-commerce Platform Launch',
    client: 'Glamour Boutique',
    status: 'In Progress',
  },
  {
    id: 'PROJ-002',
    name: 'Corporate Website Redesign',
    client: 'Fintech Solutions Ltd',
    status: 'Planning',
  },
  {
    id: 'PROJ-003',
    name: 'Mobile App Development',
    client: 'EatWell Restaurant',
    status: 'Completed',
  },
];

const mockQuotations = [
    {
        id: 'QUO-001',
        client: 'TechCorp',
        amount: 'MUR 250,000',
        status: 'Sent',
    },
    {
        id: 'QUO-003',
        client: 'DevHouse',
        amount: 'MUR 120,000',
        status: 'To Send',
    },
     {
        id: 'QUO-005',
        client: 'Sun-kissed Resorts',
        amount: 'MUR 320,000',
        status: 'Sent',
    },
];


const projectStatusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  'In Progress': 'default',
  Planning: 'secondary',
  Completed: 'default',
  'On Hold': 'destructive',
};

const quoteStatusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  Sent: 'secondary',
  Won: 'default',
  'To Send': 'outline',
  Rejected: 'destructive',
};


export default function CrmSuiteDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Insights Dashboard</h1>
        <p className="text-muted-foreground">
          A comprehensive overview of your customer relationships and projects.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
             <p className="text-xs text-muted-foreground">1 project on hold</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Quotations</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Total value: MUR 690,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Invoices</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">1</div>
            <p className="text-xs text-muted-foreground">Total overdue: MUR 320,000</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>
                    A snapshot of your most recent client projects.
                </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/business-management/crm-suite/projects">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>
                      <Badge variant={projectStatusVariant[project.status] || 'default'}>
                        {project.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Recent Quotations */}
        <Card>
           <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle>Recent Quotations</CardTitle>
                <CardDescription>
                    Your most recently created quotations.
                </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/business-management/crm-suite/quotations">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockQuotations.map((quote) => (
                        <TableRow key={quote.id}>
                            <TableCell>{quote.client}</TableCell>
                            <TableCell>{quote.amount}</TableCell>
                            <TableCell>
                                <Badge variant={quoteStatusVariant[quote.status] || 'outline'}>{quote.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
