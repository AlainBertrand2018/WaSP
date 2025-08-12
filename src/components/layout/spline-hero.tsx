
'use client';

import Spline from '@splinetool/react-spline';
import React from 'react';

type SplineHeroProps = {
  splineUrl: string;
  scrollToId: string;
};

export function SplineHero({ splineUrl, scrollToId }: SplineHeroProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(scrollToId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full min-h-screen"
      style={{ backgroundColor: '#121212' }}
    >
      <a
        href={`#${scrollToId}`}
        onClick={handleClick}
        className="absolute top-0 left-0 w-full h-full z-0 cursor-pointer"
        aria-label={`Scroll to ${scrollToId} section`}
      >
        <Spline
          scene={splineUrl}
          className="!absolute !top-0 !left-0 !w-full !h-full"
        />
      </a>
    </section>
  );
}
