
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from './theme-toggle';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { useUserStore } from '@/store/user-store';

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_url?: string | null;
};

export function UserNav() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { setHyperAdmin } = useUserStore();

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        if (user.email === process.env.NEXT_PUBLIC_HYPERADMIN_EMAIL) {
            setHyperAdmin(true);
        } else {
            setHyperAdmin(false);
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, avatar_url')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else if (data) {
          setProfile({ ...data, email: user.email });
        }
      } else {
          setHyperAdmin(false);
      }
      setLoading(false);
    }
    fetchProfile();
  }, [setHyperAdmin]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Sign Out Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.',
      });
      setHyperAdmin(false); // Clear hyperadmin state on logout
      router.push('/');
      router.refresh(); // Force a refresh to clear cached user data
    }
  };

  const getInitials = () => {
    if (!profile) return '';
    const firstNameInitial = profile.first_name?.charAt(0) ?? '';
    const lastNameInitial = profile.last_name?.charAt(0) ?? '';
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  };

  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
             {loading ? (
                <Skeleton className="h-9 w-9 rounded-full" />
              ) : (
                <Avatar className="h-9 w-9">
                  <AvatarImage src={profile?.avatar_url ?? undefined} alt={profile?.first_name ?? ''} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
              )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              {loading ? (
                <>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-32" />
                </>
              ) : (
                <>
                  <p className="text-sm font-medium leading-none">{profile?.first_name} {profile?.last_name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {profile?.email}
                  </p>
                </>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/account">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Billing</DropdownMenuItem>
            <DropdownMenuItem disabled>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
