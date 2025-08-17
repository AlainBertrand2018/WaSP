import { TrendingTopicsMarquee } from '@/components/feature/trending-topics-marquee';
import { VideoGeneratorClient } from './video-generator-client';

export default function VideoGeneratorPage() {
  return (
    <div className="relative flex flex-col flex-1 h-full">
      <VideoGeneratorClient />
      <TrendingTopicsMarquee />
    </div>
  );
}
