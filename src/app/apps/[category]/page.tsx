
'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { appCategories } from '@/lib/app-data';
import { AppCard } from '@/components/feature/app-card';
import { Button } from '@/components/ui/button';
import { useMounted } from '@/hooks/use-mounted';

type RatingState = {
  [key: string]: {
    rating: number;
    raters: number;
    hasVoted: boolean;
  };
};

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, 'and') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

export default function CategoryPage() {
  const isMounted = useMounted();
  const params = useParams();
  const categorySlug = typeof params.category === 'string' ? params.category : '';

  const categoryData = appCategories.find(
    (cat) => slugify(cat.category) === categorySlug
  );
  
  // Initialize state for all apps in the category
  const initialRatings = React.useMemo(() => {
    if (!categoryData) return {};
    return categoryData.apps.reduce((acc, app) => {
        acc[app.title] = {
            rating: app.initialRating || 0,
            raters: app.initialRaters || 0,
            hasVoted: false
        };
        return acc;
    }, {} as RatingState);
  }, [categoryData]);

  const [ratings, setRatings] = React.useState<RatingState>(initialRatings);

  const handleRatingChange = (title: string, newRating: number) => {
    setRatings(prevRatings => {
        const current = prevRatings[title];
        if (current.hasVoted) return prevRatings;

        const newTotalRating = current.rating * current.raters + newRating;
        const newRaters = current.raters + 1;
        const newAverageRating = newTotalRating / newRaters;

        return {
            ...prevRatings,
            [title]: {
                rating: newAverageRating,
                raters: newRaters,
                hasVoted: true
            }
        }
    });
  };
  
  if (!isMounted) {
      return null; // Or a loading skeleton
  }

  if (!categoryData) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-primary-foreground">
      <main className="flex-1 bg-secondary-darker">
        <div className="container mx-auto px-4 md:px-6 py-12 lg:py-20">
            <div className="mb-8">
                <Button asChild variant="ghost" className="mb-4">
                    <Link href="/apps" className="flex items-center gap-2 text-sm">
                        <ArrowLeft size={16} />
                        Back to App Gallery
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">{categoryData.category}</h1>
                <p className="text-muted-foreground mt-2">{categoryData.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {categoryData.apps.map((app) => (
                    <AppCard
                        key={app.title}
                        app={app}
                        ratingState={ratings[app.title]}
                        onRatingChange={(newRating) => handleRatingChange(app.title, newRating)}
                    />
                ))}
            </div>
        </div>
      </main>
    </div>
  );
}
