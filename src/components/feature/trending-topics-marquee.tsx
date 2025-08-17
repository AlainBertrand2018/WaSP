
'use server';

import { generateTrendingTopics } from '@/ai/flows/marketing/generate-trending-topics-flow';

export async function TrendingTopicsMarquee() {
  try {
    const trendingTopics = await generateTrendingTopics();

    // If no topics are returned, render nothing to avoid a crash.
    if (!trendingTopics?.topics?.length) {
      return null;
    }

    return (
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {trendingTopics.topics.map((topic, index) => (
            <span key={index} className="mx-8 text-2xl font-bold text-white">
              {topic.title}
            </span>
          ))}
          {/* Duplicate for seamless scroll */}
          {trendingTopics.topics.map((topic, index) => (
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
  } catch (error) {
    console.error("Error fetching trending topics:", error);
    // Gracefully fail by returning null, preventing the page from crashing.
    return null;
  }
}
