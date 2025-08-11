
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const mockClients = [
    {
        name: 'John Doe',
        title: 'Marketing Director, TechCorp',
        avatar: 'https://placehold.co/32x32.png',
        email: 'john.doe@techcorp.com',
        phone: '+1 234 567 890',
        status: 'Active',
        addedOn: '2024-07-15',
    },
    {
        name: 'Jane Smith',
        title: 'CEO, Innovate Ltd.',
        avatar: 'https://placehold.co/32x32.png',
        email: 'jane.smith@innovate.com',
        phone: '+44 123 456 789',
        status: 'Active',
        addedOn: '2024-07-10',
    },
    {
        name: 'Samuel Brown',
        title: 'Lead Developer, DevHouse',
        avatar: 'https://placehold.co/32x32.png',
        email: 'sam.brown@devhouse.io',
        phone: '+61 412 345 678',
        status: 'Lead',
        addedOn: '2024-06-28',
    },
    {
        name: 'Emily White',
        title: 'Project Manager, Creative Co.',
        avatar: 'https://placehold.co/32x32.png',
        email: 'emily.w@creative.co',
        phone: '+1 987 654 321',
        status: 'Inactive',
        addedOn: '2024-05-20',
    },
];

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  Active: 'default',
  Lead: 'secondary',
  Inactive: 'destructive',
};


export default function CrmSuiteClientsPage() {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
                <p className="text-muted-foreground">
                    Manage all your clients and their information from here.
                </p>
            </div>
            <Button asChild>
                <Link href="#">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Client
                </Link>
            </Button>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Client List</CardTitle>
                <CardDescription>A comprehensive list of all your clients.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Added on</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockClients.map((client) => (
                            <TableRow key={client.email}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={client.avatar} alt={client.name} data-ai-hint="placeholder avatar" />
                                            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{client.name}</p>
                                            <p className="text-xs text-muted-foreground">{client.title}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <p className="font-medium">{client.email}</p>
                                    <p className="text-xs text-muted-foreground">{client.phone}</p>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant[client.status] || 'outline'}>{client.status}</Badge>
                                </TableCell>
                                <TableCell>{client.addedOn}</TableCell>
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
