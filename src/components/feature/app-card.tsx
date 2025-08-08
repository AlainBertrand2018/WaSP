
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Rating } from '@/components/ui/rating';

type AppData = {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
    pro?: boolean;
    imageSrc: string;
    badge?: { text: string; className: string; };
};

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

    return (
        <div>
            <div className="group [perspective:1000px]">
                <Link href={app.href} className="block">
                    <Card className="relative aspect-square w-full h-full rounded-lg shadow-lg transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] border-primary">
                        {/* Card Front */}
                        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                            <Image src={app.imageSrc} alt={app.title} layout="fill" className="object-cover rounded-lg" data-ai-hint="business validation abstract"/>
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-primary/40 to-accent/40 opacity-40 rounded-lg"></div>
                        </div>
                        {/* Card Back */}
                        <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] bg-secondary rounded-lg p-4 flex flex-col justify-center items-center">
                            <p className="text-center text-sm text-secondary-foreground">
                                {app.description}
                            </p>
                        </div>
                    </Card>
                </Link>
            </div>
            <div className="mt-2">
                <h3 className="font-light text-sm text-foreground group-hover:text-primary">{app.title}</h3>
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
