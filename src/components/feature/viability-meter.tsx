'use client';

import React from 'react';

type ViabilityMeterProps = {
  score: number;
};

const ViabilityMeter: React.FC<ViabilityMeterProps> = ({ score }) => {
  const getFeedback = (
    value: number
  ): { text: string; className: string } => {
    if (value <= 6) {
      return {
        text: 'Project idea needs to be rethought',
        className: 'text-destructive',
      };
    } else if (value <= 8) {
      return {
        text: 'Great! Project idea needs to be refined',
        className: 'text-orange-500', // Using a specific color here as there is no theme variable for warning.
      };
    } else {
      return {
        text: 'Wow! Project idea is promising and needs to be polished',
        className: 'text-green-500', // Using a specific color here as there is no theme variable for success.
      };
    }
  };

  const feedback = getFeedback(score);
  const meterPercentage = (score / 10) * 100;

  return (
    <div className="w-full rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-muted-foreground">Viability Score</p>
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
                left: `calc(${meterPercentage}% - 10px)`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViabilityMeter;