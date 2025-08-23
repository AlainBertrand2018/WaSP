
'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUserStore } from '@/store/user-store';
import { appCategories } from '@/lib/app-data';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AvatarUpload } from '@/components/feature/avatar-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';


import { ArrowRight, Bot, Rocket, Briefcase, Phone, UserCircle, UploadCloud, FileText, Lightbulb, Wallet, History, Lock, Loader2, Users, HardDrive, Cpu, ExternalLink, Settings, ShieldCheck, Trash, PlusCircle, Server, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { User } from '@supabase/supabase-js';

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

// Mock data for recent activity - kept empty as per previous request
const recentActivities: any[] = [];

const passwordFormSchema = z.object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;


// ##################################
// ### Admin Dashboard Components ###
// ##################################

const AdminDashboard = () => {

    const allApps = appCategories.flatMap(category => 
        category.apps.map(app => ({ ...app, category: category.category }))
    );

    return (
       <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="app-management">App Management</TabsTrigger>
            <TabsTrigger value="feature-flags">Feature Flags</TabsTrigger>
            <TabsTrigger value="system">System & Users</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1</div>
                        <p className="text-xs text-muted-foreground">+1 since last hour</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                        <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1</div>
                        <p className="text-xs text-muted-foreground">Live now</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
                        <Server className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">Operational</div>
                        <p className="text-xs text-muted-foreground">All systems normal</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">AI Service Status</CardTitle>
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">Normal</div>
                        <p className="text-xs text-muted-foreground">API latency is low</p>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                     <Button variant="outline" onClick={() => toast({ title: 'Cache Cleared!', description: 'The server cache has been purged.'})}>Clear Server Cache</Button>
                    <Button variant="outline" disabled>Trigger Redeploy</Button>
                    <Button variant="destructive" disabled>Emergency Maintenance Mode</Button>
                </CardContent>
            </Card>
        </TabsContent>

        {/* App Management Tab */}
        <TabsContent value="app-management">
            <Card>
                <CardHeader>
                    <CardTitle>App Management</CardTitle>
                    <CardDescription>View, edit, or create new applications for the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 text-right">
                        <Button><PlusCircle className="mr-2 h-4 w-4" /> Add New App</Button>
                    </div>
                     <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>App Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allApps.map((app) => (
                            <TableRow key={app.title}>
                                <TableCell className="font-medium">{app.title}</TableCell>
                                <TableCell>{app.category}</TableCell>
                                <TableCell><Badge>Enabled</Badge></TableCell>
                                <TableCell className="space-x-2">
                                    <Button variant="outline" size="sm">Edit</Button>
                                    <Button variant="destructive" size="sm">Disable</Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>

        {/* Feature Flags Tab */}
        <TabsContent value="feature-flags">
            <Card>
                <CardHeader>
                    <CardTitle>Feature Flags</CardTitle>
                    <CardDescription>Enable or disable experimental or new features across the platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label>New Onboarding Flow</Label>
                            <p className="text-xs text-muted-foreground">Activates the multi-step profile creation for new users.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label>AI-Powered Suggestions</Label>
                            <p className="text-xs text-muted-foreground">Enables AI hints in the brainstorming tool.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label>7-Day Blueprint (Beta)</Label>
                            <p className="text-xs text-muted-foreground">Shows the new 7-day quickstarter module to users.</p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        
        {/* System & Users Tab */}
         <TabsContent value="system">
             <Card>
                <CardHeader>
                    <CardTitle>System & User Management</CardTitle>
                    <CardDescription>High-level system information and user management.</CardDescription>
                </CardHeader>
                 <CardContent className="space-y-4">
                    <Button variant="secondary" asChild>
                        <Link href="https://supabase.com/dashboard/project/tgapgvvufswaxsyyhnna" target="_blank" rel="noopener noreferrer">
                           View Supabase Dashboard <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                     <p className="text-sm text-muted-foreground">User management tools will be available here in a future update.</p>
                 </CardContent>
            </Card>
        </TabsContent>
    </Tabs>
    )
}

// #################################
// ### Regular User Profile View ###
// #################################

const RegularUserProfile = ({ profile }: { profile: Profile | null }) => {
    if (!profile) return null;
    return (
       <div className="container mx-auto max-w-7xl px-4 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-muted border-none">
                <CardHeader>
                    <CardTitle className="text-center text-lg font-medium text-muted-foreground">Your Profile Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <InfoItem icon={<UserCircle />} label="Email" value={profile?.email ?? undefined} />
                    <InfoItem icon={<Briefcase />} label="Role" value={profile?.role ?? undefined} />
                    <InfoItem icon={<Briefcase />} label="Company" value={profile?.business_name ?? undefined} />
                    <InfoItem icon={<Briefcase />} label="Position" value={profile?.job_title ?? undefined} />
                    <InfoItem icon={<Phone />} label="Phone" value={profile?.phone_number ?? undefined} />
                    <InfoItem icon={<Phone />} label="Mobile" value={profile?.mobile_number ?? undefined} />
                </CardContent>
                </Card>

                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><History /> Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="h-full flex flex-col justify-center items-center">
                        {recentActivities.length > 0 ? (
                            <ul className="space-y-4">
                                {/* Activity mapping would go here */}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-8">No recent activity to show.</p>
                        )}
                    </CardContent>
                </Card>
                
                <Card className="lg:col-span-1 flex flex-col items-center p-8 text-center">
                <Rocket className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Try the Free App</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-grow">
                    Validate your next big idea using our AI-powered brainstorming tool.
                </p>
                <Button asChild className="w-full">
                    <Link href="/business-creation">Test Drive</Link>
                </Button>
                </Card>

                <Card className="lg:col-span-1 flex flex-col items-center p-8 text-center">
                <Bot className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI Transformation</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-grow">
                    Request a quote for our comprehensive AI integration service.
                </p>
                <Button asChild variant="outline" className="w-full">
                    <a href="mailto:admin@avantaz.online?subject=Quote Request: AI Transformation Blueprint">Request a Quote</a>
                </Button>
                </Card>
                
                <Card className="lg:col-span-1 flex flex-col items-center p-8 text-center">
                <Wallet className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">View Plans</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-grow">
                    Ready to unlock the full potential of BusinessStudio AI?
                </p>
                <Button asChild className="w-full group">
                    <Link href="/#pricing">
                        <span>View All Plans</span>
                        <ArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
                </Card>
            </div>
        </div>
    )
}

// ##########################
// ### Main Account Page  ###
// ##########################

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const { isHyperAdmin, setHyperAdmin } = useUserStore();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema)
  });

  useEffect(() => {
    let mounted = true;

    const fetchUserAndProfile = async () => {
      try {
        const { data: { user }, error: userErr } = await supabase.auth.getUser();
        if (userErr) throw new Error(`auth.getUser: ${userErr.message}`);
        if (!user) throw new Error('Not authenticated');

        if (mounted) {
            setUser(user);
            const isAdmin = user.email === (process.env.NEXT_PUBLIC_HYPERADMIN_EMAIL || 'admin@avantaz.online');
            setHyperAdmin(isAdmin);
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, avatar_url, cover_url, business_name, job_title, phone_number, mobile_number, role')
          .eq('id', user.id)
          .maybeSingle();

        if (error) throw new Error(`profiles.select: ${error.message}`);
        if (!mounted) return;

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
        if (mounted) {
          setErr(msg);
          console.error('Error fetching profile:', msg);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    
    fetchUserAndProfile();

    return () => {
      mounted = false;
    };
  }, [setHyperAdmin]);

  const handleAvatarUpload = async (url: string) => {
    if (!profile) return;

    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: profile.id, avatar_url: url })
      .select()
      .single();

    if (error) {
      const msg = error.message || 'unknown error updating avatar';
      setErr(msg);
      console.error('Failed to update avatar URL:', msg);
      return;
    }
    setProfile(prev => ({ ...(prev as Profile), ...data, email: prev?.email ?? null }));
  };

  const handleCoverUpload = async (url: string) => {
    if (!profile) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: profile.id, cover_url: url })
      .select()
      .single();
      
    if (error) {
      const msg = error.message || 'unknown error updating cover';
      setErr(msg);
      console.error('Failed to update cover URL:', msg);
      return;
    }
    setProfile(prev => ({ ...(prev as Profile), ...data, email: prev?.email ?? null }));
  };

   const onPasswordSubmit: SubmitHandler<PasswordFormValues> = async (data) => {
    setPasswordLoading(true);
    const { error } = await supabase.auth.updateUser({ password: data.password });

    if (error) {
        toast({
            title: "Error Changing Password",
            description: error.message,
            variant: "destructive",
        });
    } else {
        toast({
            title: "Password Updated",
            description: "Your password has been changed successfully.",
        });
        reset();
    }
    setPasswordLoading(false);
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Top Dark Section */}
      <div className="bg-secondary text-secondary-foreground text-center relative h-[250px] flex flex-col justify-center items-center group">
        {loading ? (
          <>
            <Skeleton className="absolute inset-0" />
            <div className="relative z-10">
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
              className="opacity-20"
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
               {isHyperAdmin ? (
                  <h2 className="text-2xl mt-2 text-muted-foreground">Welcome to the Hyper Admin Dashboard</h2>
               ) : (
                <>
                  <h2 className="text-2xl mt-2 text-muted-foreground">Welcome to Business Studio AI</h2>
                  <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    Let&apos;s kick things off with our FREE Test Drive – an interactive brainstorming session designed to help
                    you set up your new or existing business idea. Unlock powerful AI-driven features that will guide you to
                    ideate, launch, and manage your venture, all within the Business Studio Apps Suite.
                  </p>
                </>
               )}
              {err && <p className="mt-3 text-sm text-red-500">{err}</p>}
            </div>
        )}
      </div>


      {/* Main Content Light Section */}
      <div className="bg-background flex-grow pt-4 pb-16">
        <div className="container mx-auto max-w-7xl px-4 space-y-12">
            {isHyperAdmin ? <AdminDashboard /> : <RegularUserProfile profile={profile} />}
             <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lock /> Security</CardTitle>
                <CardDescription>Manage your account security settings.</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onPasswordSubmit)}>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="password">New Password</Label>
                            <Input id="password" type="password" {...register('password')} />
                            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                        </div>
                         <div>
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
                            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={passwordLoading}>
                        {passwordLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Change Password
                    </Button>
                </CardFooter>
              </form>
            </Card>
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
