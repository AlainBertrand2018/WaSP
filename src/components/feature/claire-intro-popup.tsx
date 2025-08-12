
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare } from 'lucide-react';
import { useChatStore } from '@/store/chat-store';
import Image from 'next/image';

export function ClaireIntroPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // This effect handles the timing for the popup to appear and disappear.
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
            <div className="p-3 bg-primary/10 rounded-full w-fit">
                 <Image src="/images/studioFlow_Logotype.png" alt="BusinessStudio AI Logo" width={32} height={32} />
            </div>
          <DialogTitle className="mt-2 text-2xl">Meet CLAIRE, Your AI Assistant</DialogTitle>
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
