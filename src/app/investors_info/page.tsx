import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InvestorsInfoPage() {
    return (
        <div className="container mx-auto p-8">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl">Investors' Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">This page is currently under construction. Please check back later for more information.</p>
                </CardContent>
            </Card>
        </div>
    )
}
