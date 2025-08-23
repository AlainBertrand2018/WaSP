
'use client';

import { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle, Mail, Phone, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

type Project = {
    name: string;
    status: string;
};

type Activity = {
    type: string;
    content: string;
    date: string;
};

type Client = {
    id: string;
    name: string;
    title: string;
    company: string;
    avatar: string;
    email: string;
    phone: string;
    status: 'Active' | 'Lead' | 'Inactive';
    addedOn: string;
    projects: Project[];
    recentActivity: Activity[];
};

const clients: Client[] = [];

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  Active: 'default',
  Lead: 'secondary',
  Inactive: 'destructive',
};


const ClientDetailCard = ({ client }: { client: Client }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-1">
            {/* Left Column: Client Card */}
            <div className="lg:col-span-1">
                <Card className="overflow-hidden">
                    <CardHeader className="p-6 bg-muted/50 items-center text-center">
                        <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={client.avatar} alt={client.name} data-ai-hint="placeholder avatar" />
                            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle>{client.name}</CardTitle>
                        <CardDescription>{client.title} at {client.company}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a href={`mailto:${client.email}`} className="text-sm hover:underline">{client.email}</a>
                        </div>
                         <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{client.phone}</span>
                        </div>
                        <Separator />
                         <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Status</span>
                            <Badge variant={statusVariant[client.status] || 'outline'}>{client.status}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Client Since</span>
                            <span className="text-sm font-medium">{client.addedOn}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Projects & Activity */}
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Related Projects</CardTitle>
                            <CardDescription>Projects associated with {client.name}.</CardDescription>
                        </div>
                         <Button variant="outline" size="sm">
                             <PlusCircle className="mr-2 h-4 w-4" />
                             New Project
                         </Button>
                    </CardHeader>
                    <CardContent>
                        {client.projects.length > 0 ? (
                            <ul className="divide-y">
                                {client.projects.map(project => (
                                    <li key={project.name} className="py-3 flex justify-between items-center">
                                        <span className="font-medium">{project.name}</span>
                                        <Badge variant="secondary">{project.status}</Badge>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted-foreground text-sm text-center py-4">No projects found.</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>A log of recent interactions with {client.name}.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       {client.recentActivity.length > 0 ? (
                            <ul className="space-y-4">
                                {client.recentActivity.map((activity, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="bg-primary text-primary-foreground h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                                            <Briefcase className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium capitalize">{activity.type}</p>
                                            <p className="text-sm text-muted-foreground">{activity.content}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                             <p className="text-muted-foreground text-sm text-center py-4">No recent activity.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default function CrmSuiteClientsPage() {
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    return (
      <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedClient(null)}>
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
                    <p className="text-muted-foreground">
                        Manage all your clients and their information from here.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/business-management/crm-suite/clients/new">
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
                            {clients.length > 0 ? (
                                clients.map((client) => (
                                    <TableRow key={client.email}>
                                        <TableCell>
                                            <DialogTrigger asChild>
                                                <button onClick={() => setSelectedClient(client)} className="flex items-center gap-3 group text-left">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={client.avatar} alt={client.name} data-ai-hint="placeholder avatar" />
                                                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium group-hover:underline">{client.name}</p>
                                                        <p className="text-xs text-muted-foreground">{client.title}, {client.company}</p>
                                                    </div>
                                                </button>
                                            </DialogTrigger>
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
                                                    <DialogTrigger asChild>
                                                        <DropdownMenuItem onClick={() => setSelectedClient(client)}>
                                                            View details
                                                        </DropdownMenuItem>
                                                    </DialogTrigger>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        No clients found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

        {selectedClient && (
            <DialogContent className="max-w-6xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Client Details: {selectedClient.name}</DialogTitle>
                </DialogHeader>
                <div className="flex-grow overflow-hidden">
                    <ScrollArea className="h-full">
                        <ClientDetailCard client={selectedClient} />
                    </ScrollArea>
                </div>
            </DialogContent>
        )}
      </Dialog>
    );
  }
