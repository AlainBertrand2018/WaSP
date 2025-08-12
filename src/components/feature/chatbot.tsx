
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { Bot, Loader2, MessageSquare, Send, X } from 'lucide-react';
import { useChatStore } from '@/store/chat-store';
import { generateChatResponse } from '@/ai/flows/chatbot/generate-chat-response-flow';
import { cn } from '@/lib/utils';
import { marked } from 'marked';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Chatbot() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { messages, addMessage, isChatOpen, toggleChat } = useChatStore();
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user' as const, content: inputValue };
    addMessage(userMessage);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await generateChatResponse({
        question: inputValue,
        history: messages,
      });
      const modelMessage = { role: 'model' as const, content: response.answer };
      addMessage(modelMessage);
    } catch (error) {
      console.error('Error getting chat response:', error);
      const errorMessage = {
        role: 'model' as const,
        content: 'Sorry, I encountered an error. Please try again.',
      };
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={toggleChat}
              className="rounded-full w-16 h-16 shadow-lg"
            >
              <MessageSquare size={24} />
              <span className="sr-only">Open Chat</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={cn(
              "fixed z-50 h-[calc(100%-2rem)] max-h-[720px] flex flex-col",
              "w-[90%] bottom-4 left-0 right-0 mx-auto", // Centered for mobile
              "sm:w-full sm:max-w-sm sm:bottom-6 sm:right-6 sm:left-auto sm:mx-0" // Positioned to the right for desktop
            )}
          >
            <Card className="w-full h-full flex flex-col shadow-lg bg-secondary rounded-lg">
              <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground">
                <div className="flex items-center gap-2">
                  <Image src="/images/claire-1.webp" alt="CLAIRE avatar" width={40} height={40} className="rounded-full" />
                  <CardTitle className="text-lg">CLAIRE - Your AI Assistant</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={toggleChat} className="hover:bg-primary/80">
                  <X size={20} />
                  <span className="sr-only">Close Chat</span>
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full">
                   <ScrollAreaPrimitive.Viewport ref={viewportRef} className="h-full w-full rounded-[inherit]">
                      <div className="p-6 space-y-4">
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={cn(
                              'flex gap-3',
                              message.role === 'user' ? 'justify-end' : 'justify-start'
                            )}
                          >
                            <div
                              className={cn(
                                'rounded-lg px-4 py-2 max-w-xs prose prose-sm',
                                message.role === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              )}
                              dangerouslySetInnerHTML={{ __html: marked(message.content) }}
                            />
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start gap-3">
                            <div className="rounded-lg px-4 py-2 bg-muted flex items-center space-x-2">
                              <Loader2 className="h-5 w-5 animate-spin text-primary" />
                              <span className="text-sm text-muted-foreground">Claire is typing...</span>
                            </div>
                          </div>
                        )}
                      </div>
                  </ScrollAreaPrimitive.Viewport>
                  <ScrollBar />
                  <ScrollAreaPrimitive.Corner />
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about Mauritian business..."
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !inputValue.trim()}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <Send size={16} />}
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
