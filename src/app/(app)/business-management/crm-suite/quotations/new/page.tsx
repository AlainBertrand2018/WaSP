
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const quotationItemSchema = z.object({
    standReservation: z.string().min(1, 'Stand reservation is required.'),
    description: z.string().optional(),
    quantity: z.coerce.number().min(1, 'Quantity must be at least 1.'),
    unitPrice: z.coerce.number().min(0, 'Unit price cannot be negative.'),
});

const formSchema = z.object({
  clientId: z.string({ required_error: 'Please select a client.' }),
  projectId: z.string().optional(),
  items: z.array(quotationItemSchema).min(1, "You must add at least one item."),
  notes: z.string().optional(),
  status: z.string({ required_error: 'Please select a status.' }),
  discount: z.coerce.number().min(0).optional().default(0),
});

type QuotationFormValues = z.infer<typeof formSchema>;

const standOptions = [
    { value: 'stand-9-barebone', label: '9m² Barebone Booth', price: 75000, description: '9m² barebone booth with melamine partitions + 2x 230V/13A Eletricity outlet + 1 Table + 2 Chairs + 1 A2 Flag-Style signage + 1 parking + 2 lanyard passes.'},
    { value: 'stand-9-premium', label: '9m² Premium Booth', price: 95000, description: 'A premium 9m² booth with upgraded lighting and flooring.'},
    { value: 'stand-18-premium', label: '18m² Premium Booth', price: 180000, description: 'A large, premium 18m² booth with extra features.'}
]

export default function NewQuotationPage() {
  const [summary, setSummary] = useState({
    subtotal: 0,
    discount: 0,
    beforeVat: 0,
    vat: 0,
    grandTotal: 0,
  });

  const form = useForm<QuotationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [
        { standReservation: '', description: '', quantity: 1, unitPrice: 0 },
      ],
      status: 'To Send',
      discount: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const watchItems = form.watch('items');
  const watchDiscount = form.watch('discount');

  useEffect(() => {
    const newSubtotal = watchItems.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
    const discountAmount = watchDiscount || 0;
    const newBeforeVat = newSubtotal - discountAmount;
    const newVat = newBeforeVat * 0.15;
    const newGrandTotal = newBeforeVat + newVat;

    setSummary({
        subtotal: newSubtotal,
        discount: discountAmount,
        beforeVat: newBeforeVat,
        vat: newVat,
        grandTotal: newGrandTotal,
    });

  }, [watchItems, watchDiscount]);

  function onSubmit(values: QuotationFormValues) {
    toast({
        title: "Quotation Created!",
        description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(values, null, 2)}</code>
            </pre>
        )
    })
  }
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-MU', { style: 'currency', currency: 'MUR' }).format(value);
  }

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">New Quotation</h1>
            <p className="text-muted-foreground">Fill in the details below to generate a new quotation.</p>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                 {/* Client & Project Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Client & Project Details</CardTitle>
                        <CardDescription>Select an existing client and optionally link this quotation to a project.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="clientId"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Client*</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a client" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="techcorp">TechCorp</SelectItem>
                                        <SelectItem value="innovate">Innovate Ltd.</SelectItem>
                                        <SelectItem value="devhouse">DevHouse</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="projectId"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Project (Optional)</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="None" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="proj-001">PROJ-001 - E-commerce Platform</SelectItem>
                                        <SelectItem value="proj-002">PROJ-002 - Mobile App Dev</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Quotation Items */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quotation Items</CardTitle>
                        <CardDescription>Add one or more items to the quotation.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {fields.map((field, index) => (
                             <div key={field.id} className="grid grid-cols-12 gap-4 items-end border p-4 rounded-md relative">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.standReservation`}
                                    render={({ field }) => (
                                        <FormItem className="col-span-12 md:col-span-4">
                                            <FormLabel>Stand Reservation*</FormLabel>
                                            <Select onValueChange={(value) => {
                                                field.onChange(value);
                                                const selectedStand = standOptions.find(opt => opt.value === value);
                                                if (selectedStand) {
                                                    form.setValue(`items.${index}.description`, selectedStand.description);
                                                    form.setValue(`items.${index}.unitPrice`, selectedStand.price);
                                                }
                                            }} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select stand..."/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {standOptions.map(opt => (
                                                         <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name={`items.${index}.description`}
                                    render={({ field }) => (
                                        <FormItem className="col-span-12 md:col-span-4">
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled placeholder="Description will be auto-filled"/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.quantity`}
                                    render={({ field }) => (
                                        <FormItem className="col-span-6 md:col-span-1">
                                            <FormLabel>Qty*</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.unitPrice`}
                                    render={({ field }) => (
                                        <FormItem className="col-span-6 md:col-span-2">
                                            <FormLabel>Unit Price*</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="col-span-12 md:col-span-1">
                                    <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2 gap-2"
                            onClick={() => append({ standReservation: '', description: '', quantity: 1, unitPrice: 0 })}
                        >
                            <PlusCircle />
                            Add Item
                        </Button>
                    </CardContent>
                </Card>

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Notes & Status */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Notes & Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="Add any relevant notes for the client or for internal reference..."
                                        className="resize-y min-h-[120px]"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a status" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="To Send">To Send</SelectItem>
                                                <SelectItem value="Sent">Sent</SelectItem>
                                                <SelectItem value="Won">Won</SelectItem>
                                                <SelectItem value="Rejected">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    
                    {/* Summary */}
                    <Card>
                         <CardHeader>
                            <CardTitle>Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="discount"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Discount (MUR)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-2 text-sm bg-muted p-4 rounded-md">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal:</span>
                                    <span>{formatCurrency(summary.subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Discount:</span>
                                    <span>- {formatCurrency(summary.discount)}</span>
                                </div>
                                 <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                                    <span>Before VAT:</span>
                                    <span>{formatCurrency(summary.beforeVat)}</span>
                                </div>
                                 <div className="flex justify-between">
                                    <span className="text-muted-foreground">VAT (15%):</span>
                                    <span>{formatCurrency(summary.vat)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                                    <span>Grand Total:</span>
                                    <span className="text-primary">{formatCurrency(summary.grandTotal)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" asChild>
                        <Link href="/business-management/crm-suite/quotations">Cancel</Link>
                    </Button>
                    <Button type="submit">Create Quotation</Button>
                </div>
            </form>
        </Form>
    </div>
  );
}
