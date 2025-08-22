
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
import { ArrowRight, Bot, Loader2, Mail, Rocket, Briefcase, Phone, UserCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type Profile = {
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  business_name?: string;
  job_title?: string;
  phone_number?: string;
  mobile_number?: string;
  role?: string;
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
          .select('first_name, last_name, avatar_url, business_name, job_title, phone_number, mobile_number, role')
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
    <div className="flex flex-col min-h-full">
      {/* Top Dark Section */}
      <div className="bg-secondary text-secondary-foreground py-16 text-center relative">
        {loading ? (
          <>
            <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
            <Skeleton className="h-5 w-3/4 mx-auto" />
            <Skeleton className="h-5 w-2/3 mx-auto mt-2" />
          </>
        ) : (
          <>
            <h1 className="text-4xl md:text-5xl font-bold">Hello {profile?.first_name}</h1>
            <h2 className="text-2xl mt-2 text-muted-foreground">Welcome to Business Studio AI</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Let's kick things off with our FREE Test Drive – an interactive brainstorming session designed to help you set up your new or existing business idea. Unlock powerful AI-driven features that will guide you to ideate, launch, and manage your venture, all within the Business Studio Apps Suite.
            </p>
          </>
        )}
      </div>

      {/* Avatar positioned to overlap */}
      <div className="relative h-20">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
           {loading ? (
             <Skeleton className="h-40 w-40 rounded-full border-8 border-background" />
           ) : (
             <Avatar className="h-40 w-40 border-8 border-background">
                <AvatarImage src={profile?.avatar_url} alt={profile?.first_name} />
                <AvatarFallback>
                    {profile?.first_name?.charAt(0)}
                    {profile?.last_name?.charAt(0)}
                </AvatarFallback>
            </Avatar>
           )}
        </div>
      </div>

      {/* Main Content Light Section */}
      <div className="bg-background flex-grow pt-12 pb-16">
        <div className="container mx-auto max-w-4xl px-4 space-y-12">
            {/* User Signup Data Summary */}
            <Card className="bg-muted border-none">
                <CardHeader>
                    <CardTitle className="text-center text-lg font-medium text-muted-foreground">Your Profile Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                     {loading ? (
                         <>
                            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
                         </>
                     ) : (
                         <>
                            <InfoItem icon={<UserCircle />} label="Email" value={profile?.email} />
                            <InfoItem icon={<Briefcase />} label="Role" value={profile?.role} />
                            <InfoItem icon={<Briefcase />} label="Company" value={profile?.business_name} />
                            <InfoItem icon={<Briefcase />} label="Position" value={profile?.job_title} />
                            <InfoItem icon={<Phone />} label="Phone" value={profile?.phone_number} />
                            <InfoItem icon={<Phone />} label="Mobile" value={profile?.mobile_number} />
                         </>
                     )}
                </CardContent>
            </Card>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card className="flex flex-col items-center p-8 text-center">
                    <Rocket className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Try the Free App</h3>
                    <p className="text-sm text-muted-foreground mb-6 flex-grow">Validate your next big idea using our AI-powered brainstorming tool.</p>
                    <Button asChild className="w-full">
                        <Link href="/ideation/brainstorming">Test Drive</Link>
                    </Button>
               </Card>
               <Card className="flex flex-col items-center p-8 text-center">
                    <Bot className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">AI Transformation</h3>
                    <p className="text-sm text-muted-foreground mb-6 flex-grow">Request a quote for our comprehensive AI integration service.</p>
                    <Button asChild variant="outline" className="w-full">
                        <a href="mailto:admin@avantaz.online?subject=Quote Request: AI Transformation Blueprint">Request a Quote</a>
                    </Button>
               </Card>
            </div>

            {/* Final CTA */}
            <div className="text-center space-y-3 pt-8">
                <p className="text-muted-foreground">Ready to unlock the full potential of BusinessStudio AI?</p>
                <Button asChild size="lg" className="group">
                    <Link href="/#pricing">
                        <span>View All Plans</span>
                        <ArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}


const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string | null }) => {
    if (!value) return null;
    return (
        <div className="flex items-center gap-3">
            <div className="text-muted-foreground">{icon}</div>
            <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
        </div>
    )
}
