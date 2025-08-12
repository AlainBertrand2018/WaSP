
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import Image from 'next/image';

export function ClaireIntroPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // For development: Show the popup immediately without timers.
  useEffect(() => {
    setIsOpen(true);
    // The timers have been removed for development.
    // To restore, uncomment the original useEffect block.
  }, []);

  /*
  // Original timer-based effect:
  useEffect(() => {
    // Show the popup after a 3-second delay on page load.
    const showTimer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    // Set a timer to automatically close the popup after 20 seconds.
    const autoCloseTimer = setTimeout(() => {
      setIsOpen(false);
    }, 23000); // 3s delay + 20s display time

    // Cleanup timers if the component unmounts.
    return () => {
      clearTimeout(showTimer);
      clearTimeout(autoCloseTimer);
    };
  }, []);
  */

  const handleOpenChat = () => {
    // This function will likely need to interact with your global chat state
    // For now, it just closes the intro popup.
    setIsOpen(false);
    // You would add logic here to open the main chat window, e.g., by calling a function from your chat store.
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
            <DialogHeader className="items-center text-center">
                 <Image 
                    src="/images/claire-1.webp" 
                    alt="CLAIRE BusinessStudio AI Assistant" 
                    width={100} 
                    height={100}
                    className="rounded-full object-cover"
                />
              <DialogTitle className="mt-2 text-2xl">
                Hello I'm CLAIRE,
                <br />
                Your Personal AI Assistant
              </DialogTitle>
              <DialogDescription className="mt-2">
                Have a question about starting a business in Mauritius or how to use our tools? Just ask me! I'm here to help you navigate your entrepreneurial journey.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 flex justify-center">
              <Button onClick={handleOpenChat} className="gap-2">
                <MessageSquare />
                <span>Start Chatting</span>
              </Button>
            </div>
      </DialogContent>
    </Dialog>
  );
}
