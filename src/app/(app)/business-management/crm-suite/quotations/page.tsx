
'use client';

import { Button } from '@/components/ui/button';
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import Link from 'next/link';

const mockQuotations = [
    {
        id: 'QUO-001',
        client: 'TechCorp',
        project: 'E-commerce Platform Launch',
        amount: 'MUR 250,000',
        status: 'Sent',
        date: '2024-07-20',
    },
    {
        id: 'QUO-002',
        client: 'Innovate Ltd.',
        project: 'Mobile App Development',
        amount: 'MUR 450,000',
        status: 'Won',
        date: '2024-07-18',
    },
    {
        id: 'QUO-003',
        client: 'DevHouse',
        project: 'Website Redesign',
        amount: 'MUR 120,000',
        status: 'To Send',
        date: '2024-07-17',
    },
    {
        id: 'QUO-004',
        client: 'Creative Co.',
        project: 'Marketing Campaign',
        amount: 'MUR 80,000',
        status: 'Rejected',
        date: '2024-07-15',
    },
     {
        id: 'QUO-005',
        client: 'Sun-kissed Resorts',
        project: 'Booking System Integration',
        amount: 'MUR 320,000',
        status: 'Sent',
        date: '2024-07-12',
    },
    {
        id: 'QUO-006',
        client: 'Fintech Solutions Ltd',
        project: 'Security Audit',
        amount: 'MUR 180,000',
        status: 'Won',
        date: '2024-07-10',
    },
];

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  Sent: 'secondary',
  Won: 'default',
  'To Send': 'outline',
  Rejected: 'destructive',
};


export default function CrmSuiteQuotationsPage() {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Quotations</h1>
                <p className="text-muted-foreground">
                    Manage all your quotations and track their status.
                </p>
            </div>
            <Button asChild>
                <Link href="/business-management/crm-suite/quotations/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Quotation
                </Link>
            </Button>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Quotations List</CardTitle>
                <CardDescription>A list of all your recent quotations.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockQuotations.map((quote) => (
                            <TableRow key={quote.id}>
                                <TableCell className="font-medium">{quote.id}</TableCell>
                                <TableCell>{quote.client}</TableCell>
                                <TableCell>{quote.project}</TableCell>
                                <TableCell>{quote.amount}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant[quote.status] || 'outline'}>{quote.status}</Badge>
                                </TableCell>
                                <TableCell>{quote.date}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View details</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    );
  }
