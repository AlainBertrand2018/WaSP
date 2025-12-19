
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';

export function SignUpForm() {
  const router = useRouter();

  return (
    <>
      <CardContent className="space-y-6">
        <p className="text-sm text-center text-muted-foreground">Authentication is currently disabled for development.</p>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button className="w-full" onClick={() => router.push('/account')}>
            Go to Account (Dev)
        </Button>
        <div className="text-sm text-muted-foreground mt-4">
          Already have an account?{' '}
          <Link href="/login" className="underline hover:text-primary">
            Login
          </Link>
        </div>
      </CardFooter>
    </>
  );
}
