
'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, Loader2, Mail, Rocket } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type Profile = {
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
};

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else if (data) {
          setProfile({ ...data, email: user.email! });
        }
      }
      setLoading(false);
    }
    getProfile();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          {loading ? (
             <Skeleton className="h-24 w-24 rounded-full mx-auto" />
          ) : (
             <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src={profile?.avatar_url} alt={profile?.first_name} />
                <AvatarFallback>
                    {profile?.first_name?.charAt(0)}
                    {profile?.last_name?.charAt(0)}
                </AvatarFallback>
            </Avatar>
          )}
          
          <CardTitle className="mt-4 text-2xl">
            {loading ? <Skeleton className="h-8 w-48 mx-auto" /> : `Welcome, ${profile?.first_name}!`}
          </CardTitle>
          <CardDescription>
            {loading ? <Skeleton className="h-4 w-64 mx-auto" /> : "You're all set up. What would you like to do next?"}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card className="flex flex-col items-center justify-center p-6 text-center">
                <Rocket className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Try the Free App</h3>
                <p className="text-sm text-muted-foreground mb-4">Validate your next big idea using our AI-powered brainstorming tool.</p>
                <Button asChild className="w-full">
                    <Link href="/ideation/brainstorming">Test Drive</Link>
                </Button>
           </Card>
           <Card className="flex flex-col items-center justify-center p-6 text-center">
                <Bot className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">AI Transformation</h3>
                <p className="text-sm text-muted-foreground mb-4">Request a quote for our comprehensive AI integration service.</p>
                <Button asChild variant="outline" className="w-full">
                    <a href="mailto:admin@avantaz.online?subject=Quote Request: AI Transformation Blueprint">Request a Quote</a>
                </Button>
           </Card>
        </CardContent>
        <CardFooter className="flex-col gap-4 text-center pt-6">
            <p className="text-sm text-muted-foreground">Ready to unlock the full potential of BusinessStudio AI?</p>
            <Button asChild className="group">
                <Link href="/#pricing">
                    <span>View All Plans</span>
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
