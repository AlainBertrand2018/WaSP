
'use client';

import { VideoGeneratorClient } from '@/components/feature/video-generator-client';

export default function VideoGeneratorPage() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          AI Video Script Generator
        </h1>
        <p className="text-muted-foreground">
          Create engaging video scripts from a simple prompt.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <VideoGeneratorClient />
      </div>
    </div>
  );
}
