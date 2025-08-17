
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SmeInfoPage() {
    return (
        <div className="flex flex-col flex-1 w-full p-4">
            <Card className="w-full flex-1 flex flex-col">
                <CardHeader>
                    <CardTitle className="text-3xl">SME & Startup Dashboard for Mauritius</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                    <iframe
                        src="/documents/mauritius_sme_startup_dashboard.html"
                        title="SME & Startup Dashboard for Mauritius"
                        className="w-full h-full flex-1 border-0"
                    />
                </CardContent>
            </Card>
        </div>
    )
}
