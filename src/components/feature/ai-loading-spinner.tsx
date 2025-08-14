
'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
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
        className="max-w-sm"
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center justify-center text-center p-8 gap-6">
          <div className="relative w-32 h-32">
            <Image
              src="/images/claire-1.webp"
              alt="CLAIRE, the AI Assistant"
              width={128}
              height={128}
              className="rounded-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-40 h-40 text-primary animate-spin-slow opacity-80" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-muted-foreground mt-2">{description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// We can add a custom animation to tailwind.config.ts if needed
// For now, let's just use a slower spin.
// In tailwind.config.ts, under animation:
// 'spin-slow': 'spin 3s linear infinite',
