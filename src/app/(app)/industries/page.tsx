
import { AppLandingPage } from '@/components/layout/app-landing-page';
import { Building } from 'lucide-react';

export default function IndustriesPage() {
    return (
       <AppLandingPage
            icon={<Building className="h-12 w-12 text-primary" />}
            title="Specialized Apps"
            description="Tailored solutions for specific industry needs. Explore apps designed to tackle the unique challenges of your sector."
        >
             <p className="text-sm text-muted-foreground">More industry-specific apps coming soon!</p>
       </AppLandingPage>
    );
}
