
'use client';

import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  return (
    <>
      <CardContent className="grid gap-4">
        <p className="text-sm text-center text-muted-foreground">Authentication is currently disabled for development.</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full" onClick={() => router.push('/account')}>
            Go to Account (Dev)
        </Button>
        <div className="text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </>
  );
}
