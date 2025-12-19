
import { Suspense } from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignUpForm } from './signup-form';
import { Skeleton } from '@/components/ui/skeleton';

function SignUpFormSkeleton() {
    return (
        <div className="p-6">
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
