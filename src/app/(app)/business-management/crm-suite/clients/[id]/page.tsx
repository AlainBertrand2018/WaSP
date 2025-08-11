
'use client';

import { useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Edit, Mail, Phone, Briefcase, PlusCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// Mock data - in a real app, you would fetch this based on the ID
const mockClients = [
    {
        id: 'john-doe',
        name: 'John Doe',
        title: 'Marketing Director',
        company: 'TechCorp',
        avatar: 'https://placehold.co/96x96.png',
        email: 'john.doe@techcorp.com',
        phone: '+1 234 567 890',
        status: 'Active',
        addedOn: '2024-07-15',
        projects: [
            { name: 'E-commerce Platform Launch', status: 'In Progress' },
            { name: 'Q3 Marketing Campaign', status: 'Planning' },
        ],
        recentActivity: [
            { type: 'note', content: 'Discussed Q4 budget.', date: '2 days ago'},
            { type: 'email', content: 'Sent proposal for new campaign.', date: '1 week ago'},
            { type: 'meeting', content: 'Initial discovery call.', date: '3 weeks ago'},
        ]
    },
    {
        id: 'jane-smith',
        name: 'Jane Smith',
        title: 'CEO',
        company: 'Innovate Ltd.',
        avatar: 'https://placehold.co/96x96.png',
        email: 'jane.smith@innovate.com',
        phone: '+44 123 456 789',
        status: 'Active',
        addedOn: '2024-07-10',
        projects: [
            { name: 'Mobile App Development', status: 'Completed' },
        ],
        recentActivity: [
            { type: 'invoice', content: 'Invoice #INV-002 paid.', date: '5 days ago'},
        ]
    },
    {
        id: 'samuel-brown',
        name: 'Samuel Brown',
        title: 'Lead Developer',
        company: 'DevHouse',
        avatar: 'https://placehold.co/96x96.png',
        email: 'sam.brown@devhouse.io',
        phone: '+61 412 345 678',
        status: 'Lead',
        addedOn: '2024-06-28',
        projects: [],
        recentActivity: [
            { type: 'quotation', content: 'Quotation #QUO-003 sent.', date: 'Yesterday'},
        ]
    },
    {
        id: 'emily-white',
        name: 'Emily White',
        title: 'Project Manager',
        company: 'Creative Co.',
        avatar: 'https://placehold.co/96x96.png',
        email: 'emily.w@creative.co',
        phone: '+1 987 654 321',
        status: 'Inactive',
        addedOn: '2024-05-20',
        projects: [],
        recentActivity: [
             { type: 'note', content: 'Project put on hold.', date: '2 months ago'},
        ]
    },
];

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  Active: 'default',
  Lead: 'secondary',
  Inactive: 'destructive',
};

export default function ClientDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const client = mockClients.find((c) => c.id === id);

  if (!client) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Client not found</h2>
            <p className="text-muted-foreground">The client you are looking for does not exist.</p>
             <Button asChild>
                <Link href="/business-management/crm-suite/clients">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Clients
                </Link>
            </Button>
        </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
             <Button asChild variant="outline">
                <Link href="/business-management/crm-suite/clients">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Clients
                </Link>
            </Button>
            <Button>
                <Edit className="mr-2 h-4 w-4" /> Edit Client
            </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
    </div>
  );
}
