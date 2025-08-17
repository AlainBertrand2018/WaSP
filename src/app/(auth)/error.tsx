
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useEffect } from 'react';

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle>Authentication Error</CardTitle>
            <CardDescription>Sorry, something went wrong during the authentication process.</CardDescription>
        </CardHeader>
        <CardContent>
             <p className="text-sm text-destructive">{error.message}</p>
            <Button
                onClick={() => reset()}
                className="w-full mt-4"
            >
                Try again
            </Button>
        </CardContent>
    </Card>
  );
}
