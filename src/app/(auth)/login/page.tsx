
import { Suspense } from 'react';
import type { Metadata } from 'next';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoginForm from './login-form';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Sign in to your BusinessStudio AI account to access your dashboard and tools.',
    openGraph: {
        title: 'Login | BusinessStudio AI',
        description: 'Sign in to your BusinessStudio AI account to access your dashboard and tools.',
    },
    twitter: {
        title: 'Login | BusinessStudio AI',
        description: 'Sign in to your BusinessStudio AI account to access your dashboard and tools.',
    }
};


function LoginFormSkeleton() {
    return (
        <div className="grid gap-4">
            <div className="grid gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    )
}

export default function LoginPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <Suspense fallback={<CardContentSkeleton />}>
        <LoginForm />
      </Suspense>
    </Card>
  );
}

function CardContentSkeleton() {
    return (
        <div className="p-6 pt-0">
            <LoginFormSkeleton />
        </div>
    )
}
