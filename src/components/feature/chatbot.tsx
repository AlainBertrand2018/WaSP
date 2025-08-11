
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2, MessageSquare, Send, X } from 'lucide-react';
import { useChatStore } from '@/store/chat-store';
import { generateChatResponse } from '@/ai/flows/chatbot/generate-chat-response-flow';
import { cn } from '@/lib/utils';
import { marked } from 'marked';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { messages, addMessage } = useChatStore();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

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

  if (!isOpen) {
    return (
      <Button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow-lg"
      >
        <MessageSquare size={24} />
        <span className="sr-only">Open Chat</span>
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-full max-w-sm h-[600px] flex flex-col shadow-lg bg-secondary rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <CardTitle className="text-lg">CLAIRE - Your AI Assistant</CardTitle>
        </div>
        <Button variant="ghost" size="icon" onClick={handleToggle} className="hover:bg-primary/80">
          <X size={20} />
          <span className="sr-only">Close Chat</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
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
  );
}

    