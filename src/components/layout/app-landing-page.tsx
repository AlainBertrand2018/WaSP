// @source: This is a new custom component.

"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Spotlight } from '@/components/aceternity/spotlight';
import { cn } from '@/lib/utils';

type AppLandingPageProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
};

export function AppLandingPage({
  icon,
  title,
  description,
  children,
  className,
}: AppLandingPageProps) {
  return (
    <div className="relative flex min-h-[calc(100vh-12rem)] w-full items-center justify-center overflow-hidden rounded-lg bg-background antialiased md:min-h-[calc(100vh-16rem)]">
        <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
        />
        <Card className={cn("w-full max-w-lg text-center shadow-2xl z-10 bg-card/80 backdrop-blur-sm", className)}>
            <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full">
                    {icon}
                </div>
                <CardTitle className="mt-4 text-3xl">{title}</CardTitle>
                <CardDescription className="max-w-md">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    </div>
  );
}
