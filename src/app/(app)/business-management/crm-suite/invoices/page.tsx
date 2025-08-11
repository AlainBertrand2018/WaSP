
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
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

const mockInvoices = [
    {
        id: 'INV-002',
        client: 'Innovate Ltd.',
        project: 'Mobile App Development',
        amount: 'MUR 450,000',
        status: 'Paid',
        issueDate: '2024-07-19',
        dueDate: '2024-08-18'
    },
    {
        id: 'INV-006',
        client: 'Fintech Solutions Ltd',
        project: 'Security Audit',
        amount: 'MUR 180,000',
        status: 'Paid',
        issueDate: '2024-07-11',
        dueDate: '2024-08-10'
    },
    {
        id: 'INV-007',
        client: 'TechCorp',
        project: 'E-commerce Platform Launch',
        amount: 'MUR 250,000',
        status: 'Unpaid',
        issueDate: '2024-07-25',
        dueDate: '2024-08-24'
    },
    {
        id: 'INV-008',
        client: 'Sun-kissed Resorts',
        project: 'Booking System Integration',
        amount: 'MUR 320,000',
        status: 'Overdue',
        issueDate: '2024-06-15',
        dueDate: '2024-07-15'
    }
];

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  Paid: 'default',
  Unpaid: 'secondary',
  Overdue: 'destructive',
};


export default function CrmSuiteInvoicesPage() {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
                <p className="text-muted-foreground">
                    Invoices are automatically generated from quotations marked as 'Won'.
                </p>
            </div>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Invoices List</CardTitle>
                <CardDescription>A list of all generated invoices.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice ID</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Issue Date</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockInvoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell className="font-medium">
                                    <Link href={`/business-management/crm-suite/invoices/${invoice.id}`} className="text-primary hover:underline">
                                        {invoice.id}
                                    </Link>
                                </TableCell>
                                <TableCell>{invoice.client}</TableCell>
                                <TableCell>{invoice.project}</TableCell>
                                <TableCell>{invoice.amount}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant[invoice.status] || 'outline'}>{invoice.status}</Badge>
                                </TableCell>
                                <TableCell>{invoice.issueDate}</TableCell>
                                <TableCell>{invoice.dueDate}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Link href={`/business-management/crm-suite/invoices/${invoice.id}`} className="w-full">
                                                    View details
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>Download PDF</DropdownMenuItem>
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
