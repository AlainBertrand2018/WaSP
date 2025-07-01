import { Wand2 } from 'lucide-react';

export default function FidsFlowPage() {
  return (
    <div className="flex flex-col gap-8 py-8 items-center justify-center text-center h-[calc(100vh-120px)]">
      <div className="p-6 bg-secondary rounded-full">
        <Wand2 className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight">FidsFlow</h1>
      <p className="text-muted-foreground max-w-md">
        This is where the FidsFlow application interface would be. You can start
        generating engaging social media content from here.
      </p>
    </div>
  );
}
