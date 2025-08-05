import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

export default function AppsPage() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Applications</h1>
        <p className="text-muted-foreground">
          Manage and launch your content generation applications.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
         <Card className="flex items-center justify-center border-dashed">
            <CardContent className="text-center p-6">
                <h3 className="text-lg font-medium">Add New App</h3>
                <p className="text-sm text-muted-foreground mb-4">Explore and integrate new tools.</p>
                <Button variant="outline">Browse Marketplace</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
