
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { useChatStore } from '@/store/chat-store';

const POPUP_STORAGE_KEY = 'clairePopupLastSeen';
const POPUP_DELAY_MS = 48 * 60 * 60 * 1000; // 48 hours

export function ClaireIntroPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleChat } = useChatStore();

  useEffect(() => {
    const lastSeen = localStorage.getItem(POPUP_STORAGE_KEY);
    const now = Date.now();

    if (lastSeen && (now - parseInt(lastSeen, 10) < POPUP_DELAY_MS)) {
      // If seen within the last 48 hours, don't show the popup.
      return;
    }

    // Show the popup after a 1-second delay.
    const showTimer = setTimeout(() => {
      setIsOpen(true);
      localStorage.setItem(POPUP_STORAGE_KEY, now.toString());
    }, 1000);

    // Set a timer to automatically close the popup after 12 seconds if not interacted with.
    const autoCloseTimer = setTimeout(() => {
      setIsOpen(false);
    }, 13000); // 1s delay + 12s display time

    // Cleanup timers if the component unmounts.
    return () => {
      clearTimeout(showTimer);
      clearTimeout(autoCloseTimer);
    };
  }, []);

  const handleOpenChat = () => {
    // Close this pop-up
    setIsOpen(false);
    // Open the main chat window via global state
    toggleChat();
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
              <DialogTitle className="mt-2 text-2xl text-center">
                Hello I'm CLAIRE,
                <br />
                Your Personal AI Assistant
              </DialogTitle>
              <DialogDescription className="mt-2 text-center">
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
