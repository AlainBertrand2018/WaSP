import { Presentation } from 'lucide-react';

export default function ExpostandProPage() {
  return (
    <div className="flex flex-col gap-8 py-8 items-center justify-center text-center h-[calc(100vh-120px)]">
      <div className="p-6 bg-secondary rounded-full">
        <Presentation className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight">Expostand PRO</h1>
      <p className="text-muted-foreground max-w-md">
        This is where the Expostand PRO application interface would be. You can
        start creating stunning presentations from here.
      </p>
    </div>
  );
}
