
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Rating } from '@/components/ui/rating';
import { cn } from '@/lib/utils';
import type { AppData } from '@/lib/app-data';

type RatingState = {
    rating: number;
    raters: number;
    hasVoted: boolean;
};

type AppCardProps = {
    app: AppData;
    ratingState: RatingState;
    onRatingChange: (newRating: number) => void;
};

export function AppCard({ app, ratingState, onRatingChange }: AppCardProps) {
    const { rating, raters, hasVoted } = ratingState;
    const Icon = app.icon;

    const isExternal = app.href.startsWith('http');

    const CardContent = () => (
         <div className="group [perspective:1000px]">
            <Card className="relative aspect-square w-full h-full rounded-lg shadow-lg transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] border-primary">
                {/* Card Front */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                    <Image 
                        src={app.imageSrc} 
                        alt={app.title} 
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                        className="object-cover rounded-lg" 
                        data-ai-hint="business validation abstract"
                    />
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-primary/40 to-accent/40 opacity-40 rounded-lg"></div>
                        {app.badge && (
                        <div className={cn(
                            "absolute top-2 right-2 text-xs font-bold text-white py-1 px-3 rounded-full",
                            app.badge.className
                        )}>
                            {app.badge.text}
                        </div>
                    )}
                </div>
                {/* Card Back */}
                <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] bg-secondary rounded-lg p-4 flex flex-col justify-center items-center">
                    <p className="text-center text-sm text-secondary-foreground">
                        {app.description}
                    </p>
                </div>
            </Card>
        </div>
    );


    return (
        <div>
           {isExternal ? (
                <a href={app.href} target="_blank" rel="noopener noreferrer" className="block">
                   <CardContent />
                </a>
            ) : (
                <Link href={app.href} className="block">
                    <CardContent />
                </Link>
            )}
            <div className="mt-2">
                <h3 className="font-light text-sm text-gray-500 dark:text-foreground group-hover:text-primary">{app.title}</h3>
                <Rating 
                    value={rating}
                    raters={raters}
                    onChange={onRatingChange}
                    disabled={hasVoted}
                />
            </div>
        </div>
    );
}
