
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
import { Badge } from '@/components/ui/badge';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

const mockProjects = [
  {
    id: 'PROJ-001',
    name: 'E-commerce Platform Launch',
    client: 'Glamour Boutique',
    startDate: '2024-08-01',
    endDate: '2024-12-15',
    status: 'In Progress',
  },
  {
    id: 'PROJ-002',
    name: 'Corporate Website Redesign',
    client: 'Fintech Solutions Ltd',
    startDate: '2024-09-10',
    endDate: '2025-01-20',
    status: 'Planning',
  },
  {
    id: 'PROJ-003',
    name: 'Mobile App Development',
    client: 'EatWell Restaurant',
    startDate: '2024-06-15',
    endDate: '2024-11-30',
    status: 'Completed',
  },
  {
    id: 'PROJ-004',
    name: 'Marketing Campaign for Summer',
    client: 'Sun-kissed Resorts',
    startDate: '2024-05-01',
    endDate: '2024-08-31',
    status: 'On Hold',
  },
];

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  'In Progress': 'default',
  Planning: 'secondary',
  Completed: 'default', // would be nice to have a success variant
  'On Hold': 'destructive',
};


export default function CrmSuiteProjectsPage() {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <p className="text-muted-foreground">
                    Manage all your client projects from here.
                </p>
            </div>
            <Button asChild>
                <Link href="/business-management/crm-suite/projects/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Project
                </Link>
            </Button>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Projects List</CardTitle>
                <CardDescription>A list of all current and past projects.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Project ID</TableHead>
                            <TableHead>Project Name</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockProjects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="font-medium">{project.id}</TableCell>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.client}</TableCell>
                                <TableCell>{project.startDate}</TableCell>
                                <TableCell>{project.endDate}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant[project.status] || 'default'}>{project.status}</Badge>
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
