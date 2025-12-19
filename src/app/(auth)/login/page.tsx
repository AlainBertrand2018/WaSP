
import { Suspense } from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoginForm from './login-form';
import { Skeleton } from '@/components/ui/skeleton';

function LoginFormSkeleton() {
    return (
        <div className="grid gap-4">
            <p className="text-sm text-center text-muted-foreground p-4">Loading...</p>
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
