
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type ComplianceMeterProps = {
  percentage: number;
  score: number;
};

const ComplianceMeter: React.FC<ComplianceMeterProps> = ({ percentage, score }) => {
  const getFeedback = (
    value: number
  ): { text: string; className: string } => {
    if (value <= 3) { // 30%
      return {
        text: 'Urgent actions required',
        className: 'text-destructive',
      };
    } else if (value <= 7) { // 70%
      return {
        text: 'Compliance process to be completed',
        className: 'text-orange-500', 
      };
    } else {
      return {
        text: 'Comfortably Compliant',
        className: 'text-green-500',
      };
    }
  };

  const feedback = getFeedback(score);

  return (
    <div className="w-full rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-muted-foreground">Overall Compliance Score</p>
        <p className={`text-sm font-semibold ${feedback.className}`}>
          {feedback.text}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-4xl font-bold">
          {score.toFixed(1)}
          <span className="text-xl text-muted-foreground">/10</span>
        </p>
        <div className="w-full pt-4">
          <div className="relative h-2 w-full rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-green-500">
            <div
              className="absolute -top-1.5 h-5 w-5 rounded-full border-4 border-primary bg-primary-foreground shadow"
              style={{
                left: `calc(${percentage}% - 10px)`,
                transition: 'left 0.5s ease-in-out',
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceMeter;
