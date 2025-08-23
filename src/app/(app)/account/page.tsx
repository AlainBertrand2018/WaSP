
'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AvatarUpload } from '@/components/feature/avatar-upload';

import { ArrowRight, Bot, Rocket, Briefcase, Phone, UserCircle, UploadCloud, FileText, Lightbulb, Wallet } from 'lucide-react';

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_url?: string | null;
  cover_url?: string | null;
  business_name?: string | null;
  job_title?: string | null;
  phone_number?: string | null;
  mobile_number?: string | null;
  role?: string | null;
};

// Mock data for recent activity
const recentActivities = [
  {
    icon: <Lightbulb className="h-5 w-5 text-accent" />,
    text: 'Validated a new business idea: "Artisan Coffee Roasters"',
    time: '2 days ago',
    href: '/business-creation/business-idea-validation'
  },
  {
    icon: <Rocket className="h-5 w-5 text-accent" />,
    text: 'Generated an MVP Plan for "Artisan Coffee Roasters"',
    time: '1 day ago',
    href: '/business-creation/mvp-planner'
  },
  {
    icon: <Wallet className="h-5 w-5 text-accent" />,
    text: 'Updated the Startup Budget with new fixed costs',
    time: '3 hours ago',
    href: '/business-creation/startup-budget-planner'
  },
  {
    icon: <FileText className="h-5 w-5 text-accent" />,
    text: 'Downloaded the final Business Plan PDF',
    time: '3 hours ago',
    href: '/business-creation/business-plan-generator'
  }
];

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data: userData, error: userErr } = await supabase.auth.getUser();
        if (userErr) throw new Error(`auth.getUser: ${userErr.message}`);
        const user = userData?.user;
        if (!user) throw new Error('Not authenticated');

        const { data, error } = await supabase
          .from('profiles')
          .select(
            'id, first_name, last_name, avatar_url, cover_url, business_name, job_title, phone_number, mobile_number, role'
          )
          .eq('id', user.id)
          .maybeSingle();

        if (error) throw new Error(`profiles.select: ${error.message}`);

        if (!mounted) return;

        // Normalize even if the row doesn't exist yet
        setProfile(
          data
            ? { ...data, email: user.email ?? null }
            : {
                id: user.id,
                first_name: null,
                last_name: null,
                email: user.email ?? null,
                avatar_url: null,
                cover_url: null,
                business_name: null,
                job_title: null,
                phone_number: null,
                mobile_number: null,
                role: null,
              }
        );
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        setErr(msg);
        // eslint-disable-next-line no-console
        console.error('Error fetching profile:', msg);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleAvatarUpload = async (url: string) => {
    if (!profile) return;

    const profileDataToSave = {
      ...profile,
      avatar_url: url,
    };
    
    // Remove email from the object to avoid trying to save it to the profiles table
    delete (profileDataToSave as Partial<Profile> & { email?: string | null }).email;


    const { data, error } = await supabase
      .from('profiles')
      .upsert(profileDataToSave)
      .select()
      .single();

    if (error) {
      const msg = error.message || 'unknown error updating avatar';
      setErr(msg);
      // eslint-disable-next-line no-console
      console.error('Failed to update avatar URL:', msg);
      return;
    }
    // Update the local state with the full profile returned from upsert
    setProfile(prev => ({ ...(prev as Profile), ...data, email: prev?.email ?? null }));
  };

  const handleCoverUpload = async (url: string) => {
    if (!profile) return;
    
    const profileDataToSave = {
      ...profile,
      cover_url: url,
    };

    delete (profileDataToSave as Partial<Profile> & { email?: string | null }).email;


    const { data, error } = await supabase
      .from('profiles')
      .upsert(profileDataToSave)
      .select()
      .single();
      
    if (error) {
      const msg = error.message || 'unknown error updating cover';
      setErr(msg);
      // eslint-disable-next-line no-console
      console.error('Failed to update cover URL:', msg);
      return;
    }
    setProfile(prev => ({ ...(prev as Profile), ...data, email: prev?.email ?? null }));
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Top Dark Section */}
      <div className="bg-secondary text-secondary-foreground text-center relative h-[250px] flex flex-col justify-center items-center group">
        {loading ? (
          <>
            <Skeleton className="absolute inset-0" />
            <div className="relative z-10">
              {/* Placeholder content removed */}
            </div>
          </>
        ) : (
          <>
            <Image
              src={profile?.cover_url ?? 'https://placehold.co/1200x600.png'}
              alt="Cover image"
              fill
              priority
              style={{ objectFit: 'cover' }}
              className="opacity-20 group-hover:opacity-100 transition-opacity duration-300"
              data-ai-hint="office business"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <AvatarUpload bucket="covers" onUpload={handleCoverUpload} buttonText="Change Cover" />
            </div>
          </>
        )}
      </div>

      {/* Avatar positioned to overlap */}
      <div className="relative h-20">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          {loading ? (
            <Skeleton className="h-40 w-40 rounded-full border-8 border-background" />
          ) : (
            <div className="group relative">
              <Avatar className="h-40 w-40 border-8 border-background">
                <AvatarImage src={profile?.avatar_url ?? undefined} alt={profile?.first_name ?? ''} />
                <AvatarFallback>
                  {(profile?.first_name?.charAt(0) ?? '') + (profile?.last_name?.charAt(0) ?? '')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <AvatarUpload bucket="avatars" onUpload={handleAvatarUpload} buttonText="Change Avatar" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Welcome Text Section */}
      <div className="bg-background text-center pt-8 pb-8">
        {loading ? (
          <div className="relative z-10 max-w-4xl mx-auto px-4">
              <Skeleton className="h-12 w-64 mx-auto mb-4" />
              <Skeleton className="h-5 w-80 mx-auto" />
              <Skeleton className="h-5 w-full mt-4" />
              <Skeleton className="h-5 w-5/6 mx-auto mt-2" />
          </div>
        ) : (
            <div className="relative z-10 max-w-4xl mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold">Hello {profile?.first_name ?? 'there'}</h1>
              <h2 className="text-2xl mt-2 text-muted-foreground">Welcome to Business Studio AI</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Let&apos;s kick things off with our FREE Test Drive – an interactive brainstorming session designed to help
                you set up your new or existing business idea. Unlock powerful AI-driven features that will guide you to
                ideate, launch, and manage your venture, all within the Business Studio Apps Suite.
              </p>
              {err && <p className="mt-3 text-sm text-red-500">{err}</p>}
            </div>
        )}
      </div>


      {/* Main Content Light Section */}
      <div className="bg-background flex-grow pt-4 pb-16">
        <div className="container mx-auto max-w-4xl px-4 space-y-12">
          {/* User Signup Data Summary */}
          <Card className="bg-muted border-none">
            <CardHeader>
              <CardTitle className="text-center text-lg font-medium text-muted-foreground">Your Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {loading ? (
                <>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-full" />
                  ))}
                </>
              ) : (
                <>
                  <InfoItem icon={<UserCircle />} label="Email" value={profile?.email ?? undefined} />
                  <InfoItem icon={<Briefcase />} label="Role" value={profile?.role ?? undefined} />
                  <InfoItem icon={<Briefcase />} label="Company" value={profile?.business_name ?? undefined} />
                  <InfoItem icon={<Briefcase />} label="Position" value={profile?.job_title ?? undefined} />
                  <InfoItem icon={<Phone />} label="Phone" value={profile?.phone_number ?? undefined} />
                  <InfoItem icon={<Phone />} label="Mobile" value={profile?.mobile_number ?? undefined} />
                </>
              )}
            </CardContent>
          </Card>
          
          {/* Recent Activity Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                 <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="flex-grow space-y-2">
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <li key={index} className="flex items-start gap-4">
                        <div className="bg-muted p-2 rounded-full mt-1">
                            {activity.icon}
                        </div>
                        <div className="flex-grow">
                            <p className="font-medium text-sm">{activity.text}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Button asChild variant="ghost" size="sm">
                            <Link href={activity.href}>
                                View <ArrowRight className="ml-2 h-3 w-3" />
                            </Link>
                        </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>


          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="flex flex-col items-center p-8 text-center">
              <Rocket className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Try the Free App</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-grow">
                Validate your next big idea using our AI-powered brainstorming tool.
              </p>
              <Button asChild className="w-full">
                <Link href="/ideation/brainstorming">Test Drive</Link>
              </Button>
            </Card>

            <Card className="flex flex-col items-center p-8 text-center">
              <Bot className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Transformation</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-grow">
                Request a quote for our comprehensive AI integration service.
              </p>
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

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value?: string | null;
}) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3">
      <div className="text-muted-foreground">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
