
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
import { toast } from '@/hooks/use-toast';
import { useUserStore } from '@/store/user-store';

// Mock profile for development since auth is disabled
const mockProfile = {
  first_name: 'Dev',
  last_name: 'User',
  email: 'dev@example.com',
  avatar_url: null,
};

export function UserNav() {
  const router = useRouter();
  const { setHyperAdmin } = useUserStore();

  const handleSignOut = async () => {
    toast({
      title: 'Signed Out',
      description: 'You have been successfully signed out.',
    });
    setHyperAdmin(false); // Clear hyperadmin state on logout
    router.push('/');
    router.refresh(); // Force a refresh to clear cached user data
  };

  const getInitials = () => {
    const firstNameInitial = mockProfile.first_name?.charAt(0) ?? '';
    const lastNameInitial = mockProfile.last_name?.charAt(0) ?? '';
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  };

  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src={mockProfile?.avatar_url ?? undefined} alt={mockProfile?.first_name ?? ''} />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{mockProfile?.first_name} {mockProfile?.last_name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {mockProfile?.email}
              </p>
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
