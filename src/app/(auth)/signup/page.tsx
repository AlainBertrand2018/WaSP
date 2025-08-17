
import { Suspense } from 'react';
import type { Metadata } from 'next';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignUpForm } from './signup-form';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
    title: 'Sign Up',
    description: 'Create an account with BusinessStudio AI to start building your business.',
    openGraph: {
        title: 'Sign Up | BusinessStudio AI',
        description: 'Create an account with BusinessStudio AI to start building your business.',
    },
    twitter: {
        title: 'Sign Up | BusinessStudio AI',
        description: 'Create an account with BusinessStudio AI to start building your business.',
    }
};


function SignUpFormSkeleton() {
    return (
        <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-10 w-full" />
                </div>
                 <div className="grid gap-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
             <div className="grid gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-10 w-full" />
            </div>
            {/* ... more skeletons ... */}
             <Skeleton className="h-10 w-full" />
        </div>
    )
}

export default function SignupPage() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Enter your information to create an account and get started.
        </CardDescription>
      </CardHeader>
      <Suspense fallback={<SignUpFormSkeleton />}>
        <SignUpForm />
      </Suspense>
    </Card>
  );
}
