"use client";

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

type RatingProps = {
  value: number;
  totalStars?: number;
  className?: string;
  starClassName?: string;
  raters?: number;
  onChange?: (rating: number) => void;
};

export function Rating({
  value = 0,
  totalStars = 5,
  raters,
  className,
  starClassName,
  onChange,
}: RatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | undefined>(undefined);

  const handleStarClick = (rating: number) => {
    if (onChange) {
      onChange(rating);
    }
  };

  const displayValue = hoverValue ?? value;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className="flex items-center gap-0.5"
        onMouseLeave={() => setHoverValue(undefined)}
      >
        {[...Array(totalStars)].map((_, i) => {
          const ratingValue = i + 1;
          const isFilled = ratingValue <= displayValue;
          return (
            <Star
              key={ratingValue}
              className={cn(
                'w-4 h-4 cursor-pointer',
                isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400',
                starClassName
              )}
              onMouseEnter={() => setHoverValue(ratingValue)}
              onClick={() => handleStarClick(ratingValue)}
            />
          );
        })}
      </div>
      {value > 0 && (
        <span className="text-xs font-semibold text-muted-foreground">
          {value.toFixed(1)}
        </span>
      )}
      {raters !== undefined && value > 0 && (
         <span className="text-xs text-muted-foreground">•</span>
      )}
      {raters !== undefined && (
        <span className="text-xs text-muted-foreground">{raters} ratings</span>
      )}
    </div>
  );
}
