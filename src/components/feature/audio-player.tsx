
'use client';

import { useAudioPlayerStore } from '@/store/audio-player-store';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function AudioPlayer() {
  const { isOpen, audioSrc, closePlayer } = useAudioPlayerStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleAudioEnd = () => {
      closePlayer();
    };

    if (audio) {
      audio.addEventListener('ended', handleAudioEnd);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleAudioEnd);
      }
    };
  }, [isOpen, closePlayer]);

  if (!audioSrc) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-6 left-6 z-50"
        >
          <Card className="w-80 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between p-3">
                <div className="flex items-center gap-3">
                    <Image
                        src="/images/claire-1.webp"
                        alt="CLAIRE avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <p className="font-semibold">CLAIRE is speaking...</p>
                </div>
                <Button variant="ghost" size="icon" onClick={closePlayer} className="h-7 w-7">
                    <X size={16} />
                    <span className="sr-only">Close player</span>
                </Button>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <audio ref={audioRef} controls autoPlay className="w-full">
                <source src={audioSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
