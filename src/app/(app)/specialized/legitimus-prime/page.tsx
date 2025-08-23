
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2, Send, User, MessageSquare, Scale, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { marked } from 'marked';
import { askLegitimusPrime } from '@/ai/flows/specialized/legitimus-prime-flow';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const legalProfessionals = [
  { name: 'John Doe', title: 'Constitutional Lawyer', avatar: '/images/image1-0.png' },
  { name: 'Jane Smith', title: 'Senior Advocate', avatar: '/images/image1-5.png' },
  { name: 'Sam Wilson', title: 'Legal Researcher', avatar: '/images/image1-99.png' },
];

export default function LegitimusPrimePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: 'I am Legitimus Prime. How may I assist you with the Constitution of Mauritius today?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = { role: 'user', content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await askLegitimusPrime({
        question: inputValue,
        history: messages,
      });
      const modelMessage: Message = { role: 'model', content: response.answer };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Error getting chat response:', error);
      const errorMessage: Message = {
        role: 'model',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-60px)] bg-muted/40">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b flex items-center justify-center">
            <div className="flex items-center gap-2">
                <Scale className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold tracking-tight">Legitimus Prime</h1>
            </div>
        </header>

        <main className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-4',
                  message.role === 'user' ? 'justify-end' : ''
                )}
              >
                {message.role === 'model' && (
                  <div className="p-2 bg-primary rounded-full text-primary-foreground">
                    <Bot size={20} />
                  </div>
                )}
                <div
                  className={cn(
                    'rounded-lg p-3 max-w-prose prose prose-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background shadow-sm'
                  )}
                  dangerouslySetInnerHTML={{ __html: marked(message.content) }}
                />
                 {message.role === 'user' && (
                  <div className="p-2 bg-secondary rounded-full text-secondary-foreground">
                    <User size={20} />
                  </div>
                )}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-4">
                 <div className="p-2 bg-primary rounded-full text-primary-foreground">
                    <Bot size={20} />
                  </div>
                <div className="bg-background shadow-sm rounded-lg p-3 flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="ml-2 text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        </main>

        <footer className="p-4 border-t bg-background">
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question about the Constitution of Mauritius..."
              disabled={isLoading}
              className="h-12 text-base"
            />
            <Button type="submit" disabled={isLoading || !inputValue.trim()} size="lg">
              {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </footer>
      </div>

      {/* Right Sidebar */}
      <aside className="w-80 border-l bg-background p-4 hidden lg:flex flex-col">
          <Card>
            <CardHeader>
                <CardTitle>About This Tool</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    Legitimus Prime is an AI assistant trained exclusively on the text of the Constitution of Mauritius (rev. 2022). It provides factual answers based solely on this document and does not offer legal advice.
                </CardDescription>
            </CardContent>
          </Card>
          
          <Separator className="my-4" />
          
          <Card className="flex-1">
             <CardHeader>
                <CardTitle>Legal Professionals</CardTitle>
                <CardDescription>Connect with experts for professional advice.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {legalProfessionals.map(pro => (
                         <li key={pro.name} className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={pro.avatar} alt={pro.name} />
                                <AvatarFallback>{pro.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{pro.name}</p>
                                <p className="text-xs text-muted-foreground">{pro.title}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="ml-auto">
                                <MessageSquare className="h-4 w-4" />
                            </Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>

          <div className="mt-4 text-center">
            <Link href="#" className="text-xs text-muted-foreground hover:underline flex items-center justify-center gap-1">
                View Full Directory <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
      </aside>
    </div>
  );
}
