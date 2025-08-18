
'use client';

import { generateTrendingTopics } from '@/ai/flows/marketing/generate-trending-topics-flow';
import React, { useEffect, useState } from 'react';

type Topic = {
  title: string;
  shortDescription: string;
};

export function TrendingTopicsMarquee() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const trendingTopics = await generateTrendingTopics();
        if (trendingTopics?.topics) {
          setTopics(trendingTopics.topics);
        }
      } catch (error) {
        console.error("Error fetching trending topics:", error);
        // Gracefully fail by setting topics to an empty array
        setTopics([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTopics();
  }, []);

  if (isLoading || topics.length === 0) {
    // Return null during loading or if no topics are fetched to keep the UI clean
    return null;
  }

  return (
    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {topics.map((topic, index) => (
          <span key={index} className="mx-8 text-2xl font-bold text-white">
            {topic.title}
          </span>
        ))}
        {/* Duplicate for seamless scroll */}
        {topics.map((topic, index) => (
          <span
            key={`duplicate-${index}`}
            className="mx-8 text-2xl font-bold text-white"
            aria-hidden="true"
          >
            {topic.title}
          </span>
        ))}
      </div>
    </div>
  );
}
