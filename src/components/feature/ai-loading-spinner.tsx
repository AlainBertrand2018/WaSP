
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import React from 'react';

type AiLoadingSpinnerProps = {
  show: boolean;
  title?: string;
  description?: string;
};

export function AiLoadingSpinner({
  show,
  title = "CLAIRE is thinking...",
  description = "This may take a moment. Great insights are on their way!",
}: AiLoadingSpinnerProps) {
  return (
    <Dialog open={show}>
      <DialogContent
        className="bg-transparent border-none shadow-none p-0 w-full h-full max-w-full max-h-full flex items-center justify-center"
        style={{
           backgroundColor: 'rgba(17, 24, 39, 0.1)', // Equivalent to dark theme bg-gray-900/10
           backdropFilter: 'blur(10px)',
           WebkitBackdropFilter: 'blur(10px)',
         }}
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center p-8 bg-card rounded-xl shadow-2xl max-w-sm text-center">
            {/* The title is visually hidden but available for screen readers */}
            <DialogHeader className="sr-only">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            <div className="relative w-32 h-32 mb-6">
                {/* Spinner */}
                <div className="absolute inset-0 border-4 border-solid rounded-full border-primary/50 border-t-primary animate-spin"></div>
                {/* Image */}
                <Image
                    src="/images/claire-1.webp"
                    alt="CLAIRE Headshot"
                    width={128}
                    height={128}
                    className="w-full h-full rounded-full object-cover border-4 border-card shadow-md"
                />
            </div>
            <p className="text-2xl font-bold text-primary mb-2">{title}</p>
            <p className="text-base text-muted-foreground">{description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
