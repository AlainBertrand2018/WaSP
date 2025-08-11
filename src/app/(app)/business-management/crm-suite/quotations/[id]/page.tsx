
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
import { ArrowLeft, Download, Printer, FileCheck, Send } from 'lucide-react';

// Mock data - in a real app, you would fetch this based on the ID
const mockQuotations = {
    'QUO-001': {
        id: 'QUO-001',
        client: 'TechCorp',
        project: 'E-commerce Platform Launch',
        status: 'Sent',
        issueDate: '2024-07-20',
        validUntil: '2024-08-19',
        clientAddress: '789 Tech Park, Moka, Mauritius',
        items: [
            { description: 'Platform Customization', quantity: 1, price: 150000 },
            { description: 'Data Migration', quantity: 1, price: 50000 },
            { description: 'User Training', quantity: 1, price: 50000 },
        ],
    },
    'QUO-002': {
        id: 'QUO-002',
        client: 'Innovate Ltd.',
        project: 'Mobile App Development',
        status: 'Won',
        issueDate: '2024-07-18',
        validUntil: '2024-08-17',
        clientAddress: '123 Cybercity, Ebene, Mauritius',
        items: [
            { description: 'Phase 1: Design & Prototyping', quantity: 1, price: 150000 },
            { description: 'Phase 2: Backend Development', quantity: 1, price: 200000 },
            { description: 'Phase 3: Frontend Development', quantity: 1, price: 100000 },
        ],
    },
    'QUO-003': {
        id: 'QUO-003',
        client: 'DevHouse',
        project: 'Website Redesign',
        status: 'To Send',
        issueDate: '2024-07-17',
        validUntil: '2024-08-16',
        clientAddress: '456 Dev Avenue, Port Louis, Mauritius',
        items: [
            { description: 'UI/UX Design Mockups', quantity: 1, price: 40000 },
            { description: 'Frontend Development (5 pages)', quantity: 1, price: 80000 },
        ],
    },
    'QUO-004': {
        id: 'QUO-004',
        client: 'Creative Co.',
        project: 'Marketing Campaign',
        status: 'Rejected',
        issueDate: '2024-07-15',
        validUntil: '2024-08-14',
        clientAddress: '111 Art Street, Grand Baie, Mauritius',
        items: [
            { description: 'Social Media Strategy', quantity: 1, price: 30000 },
            { description: 'Content Creation (10 posts)', quantity: 1, price: 50000 },
        ],
    },
    'QUO-005': {
        id: 'QUO-005',
        client: 'Sun-kissed Resorts',
        project: 'Booking System Integration',
        status: 'Sent',
        issueDate: '2024-07-12',
        validUntil: '2024-08-11',
        clientAddress: '101 Coastal Road, Flic en Flac, Mauritius',
        items: [
            { description: 'API Integration Development', quantity: 1, price: 200000 },
            { description: 'On-site Setup & Configuration', quantity: 1, price: 120000 },
        ],
    },
    'QUO-006': {
        id: 'QUO-006',
        client: 'Fintech Solutions Ltd',
        project: 'Security Audit',
        status: 'Won',
        issueDate: '2024-07-10',
        validUntil: '2024-08-09',
        clientAddress: '456 Financial Hub, Port Louis, Mauritius',
        items: [
             { description: 'Vulnerability Assessment', quantity: 1, price: 80000 },
             { description: 'Penetration Testing (Web App)', quantity: 1, price: 100000 },
        ],
    }
};

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  Sent: 'secondary',
  Won: 'default',
  'To Send': 'outline',
  Rejected: 'destructive',
};


export default function QuotationDetailPage() {
  const params = useParams();
  const id = params.id as keyof typeof mockQuotations;
  const quote = mockQuotations[id];

  if (!quote) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Quotation not found</h2>
            <p className="text-muted-foreground">The quotation you are looking for does not exist.</p>
             <Button asChild>
                <Link href="/business-management/crm-suite/quotations">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Quotations
                </Link>
            </Button>
        </div>
    );
  }
  
  const subtotal = quote.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const vat = subtotal * 0.15;
  const total = subtotal + vat;
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-MU', { style: 'currency', currency: 'MUR' }).format(value);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex justify-between items-center">
             <Button asChild variant="outline">
                <Link href="/business-management/crm-suite/quotations">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Quotations
                </Link>
            </Button>
            <div className="flex gap-2">
                <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
                <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                 {quote.status === 'Won' ? (
                    <Button><FileCheck className="mr-2 h-4 w-4" /> Generate Invoice</Button>
                ) : (
                    <Button><Send className="mr-2 h-4 w-4" /> Send to Client</Button>
                )}
            </div>
        </div>
        <Card className="overflow-hidden">
            <CardHeader className="p-6 bg-muted/50">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-primary">QUOTATION</h1>
                        <p className="text-lg font-semibold">{quote.id}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-bold">Your Company Name</h2>
                        <p className="text-sm text-muted-foreground">123 Business Avenue, Port Louis</p>
                        <p className="text-sm text-muted-foreground">contact@yourcompany.com</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-1">BILLED TO</h3>
                        <p className="font-medium">{quote.client}</p>
                        <p className="text-sm text-muted-foreground">{quote.clientAddress}</p>
                    </div>
                    <div className="text-right">
                        <h3 className="text-sm font-semibold text-muted-foreground mb-1">Issue Date</h3>
                        <p className="font-medium">{quote.issueDate}</p>
                    </div>
                     <div className="text-right">
                        <h3 className="text-sm font-semibold text-muted-foreground mb-1">Valid Until</h3>
                        <p className="font-medium">{quote.validUntil}</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="p-3 text-left font-medium">Description</th>
                                <th className="p-3 text-center font-medium">Qty</th>
                                <th className="p-3 text-right font-medium">Unit Price</th>
                                <th className="p-3 text-right font-medium">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quote.items.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-3">{item.description}</td>
                                    <td className="p-3 text-center">{item.quantity}</td>
                                    <td className="p-3 text-right">{formatCurrency(item.price)}</td>
                                    <td className="p-3 text-right">{formatCurrency(item.price * item.quantity)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-3 mt-8">
                    <div className="col-span-2">
                        <h3 className="text-sm font-semibold mb-2">Notes</h3>
                        <p className="text-xs text-muted-foreground">All prices are in MUR. This quotation is valid until the date specified above.</p>
                    </div>
                    <div className="space-y-2 text-right">
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal:</span>
                            <span className="font-medium">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">VAT (15%):</span>
                            <span className="font-medium">{formatCurrency(vat)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                            <span>Grand Total:</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-6 bg-muted/50 flex justify-between items-center">
                 <div>
                    <h3 className="text-sm font-semibold mb-1">Status</h3>
                    <Badge variant={statusVariant[quote.status] || 'outline'}>{quote.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">If you have any questions, please contact us.</p>
            </CardFooter>
        </Card>
    </div>
  );
}
