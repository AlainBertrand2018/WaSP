import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          360° Business Dashboard
        </h1>
        <p className="text-muted-foreground">
          A comprehensive overview of your entire business ecosystem.
        </p>
      </div>

      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Welcome!</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Your business summary will appear here.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
