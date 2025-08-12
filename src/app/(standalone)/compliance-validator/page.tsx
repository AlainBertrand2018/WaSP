
'use client';

import { AppLandingPage } from '@/components/layout/app-landing-page';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCheck } from 'lucide-react';

export default function StandaloneComplianceValidatorPage() {
    return (
       <AppLandingPage
            icon={<CheckCheck className="h-12 w-12 text-primary" />}
            title="Compliance Validator"
            description="Ready to check your business compliance? Let our AI analyze your business against local regulations to ensure you're on the right track."
        >
             <Button size="lg" className="w-full group">
                <span>Start Compliance Check</span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
       </AppLandingPage>
    );
}
