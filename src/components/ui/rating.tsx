"use client";

import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

type RatingProps = {
  rating: number;
  totalStars?: number;
  className?: string;
  starClassName?: string;
};

export function Rating({ rating = 0, totalStars = 5, className, starClassName }: RatingProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStar;

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={cn('w-4 h-4 text-yellow-400 fill-yellow-400', starClassName)}
        />
      ))}
      {halfStar === 1 && (
        <StarHalf
          key="half"
          className={cn('w-4 h-4 text-yellow-400 fill-yellow-400', starClassName)}
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={cn('w-4 h-4 text-yellow-400', starClassName)}
        />
      ))}
    </div>
  );
}
