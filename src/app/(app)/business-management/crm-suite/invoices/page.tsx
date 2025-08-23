
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

type Invoice = {
    id: string;
    client: string;
    project: string;
    amount: string;
    status: 'Paid' | 'Unpaid' | 'Overdue';
    issueDate: string;
    dueDate: string;
};

const invoices: Invoice[] = [];

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
                        {invoices.length > 0 ? (
                            invoices.map((invoice) => (
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
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center">
                                    No invoices found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    );
  }
