
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCheck } from 'lucide-react';
import Link from 'next/link';

export default function StandaloneComplianceValidatorPage() {
    return (
        <Card className="w-full max-w-lg text-center shadow-lg">
            <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full">
                    <CheckCheck className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="mt-4 text-3xl">Compliance Validator</CardTitle>
                <CardDescription className="max-w-md">
                    Ready to check your business compliance? Let our AI analyze your business against local regulations to ensure you're on the right track.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="lg" className="w-full group">
                    <span>Start Compliance Check</span>
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Button>
            </CardContent>
        </Card>
    );
}
