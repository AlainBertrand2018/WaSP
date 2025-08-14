
'use client';

import React from 'react';

type ComplianceMeterProps = {
  percentage: number;
};

const ComplianceMeter: React.FC<ComplianceMeterProps> = ({ percentage }) => {
  const getFeedback = (
    value: number
  ): { text: string; className: string } => {
    if (value <= 30) {
      return {
        text: 'Lowly Compliant (Urgent actions required)',
        className: 'text-destructive',
      };
    } else if (value <= 80) {
      return {
        text: 'Not Fully Compliant (Compliance process to be completed)',
        className: 'text-orange-500', // Using a specific color here as there is no theme variable for warning.
      };
    } else {
      return {
        text: 'Comfortably Compliant (Some compliance Processes may need completion)',
        className: 'text-green-500', // Using a specific color here as there is no theme variable for success.
      };
    }
  };

  const feedback = getFeedback(percentage);
  const score = (percentage / 10).toFixed(1);

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
          {score}
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
