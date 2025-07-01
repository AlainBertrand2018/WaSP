import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { apps } from '@/lib/data';
import Link from 'next/link';

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
        {apps.map((app) => (
          <Card key={app.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{app.name}</CardTitle>
              <app.icon className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {app.description}
              </p>
              <Button asChild>
                <Link href={app.href}>Launch App</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
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
