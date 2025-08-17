
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CardContent, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  civility: z.string({ required_error: 'Please select a title.' }).min(1, 'Please select a title.'),
  first_name: z.string().min(1, { message: 'First name is required.' }),
  last_name: z.string().min(1, { message: 'Last name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  company_name: z.string().min(1, { message: 'Company name is required.' }),
  position: z.string().min(1, { message: 'Position is required.' }),
  phone_number: z.string().min(1, { message: 'Phone number is required.' }),
  mobile_number: z.string().min(1, { message: 'Mobile number is required.' }),
});

type SignUpFormValues = z.infer<typeof formSchema>;

export function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      company_name: '',
      position: '',
      phone_number: '',
      mobile_number: '',
    },
  });

  async function handleSocialLogin(provider: 'google' | 'linkedin') {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    });
    if (error) {
      toast({
        title: 'Authentication Error',
        description: error.message,
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  }

  async function onSubmit(values: SignUpFormValues) {
    setIsLoading(true);
    const { email, password, ...profileData } = values;

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      toast({
        title: 'Sign Up Error',
        description: signUpError.message,
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    if (signUpData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          email: values.email, // Also save email to profiles table
        })
        .eq('id', signUpData.user.id);
      
      if (profileError) {
        toast({
            title: 'Profile Creation Error',
            description: `Your account was created, but we couldn't save your profile details: ${profileError.message}. Please complete your profile later.`,
            variant: 'destructive',
        });
        // Even if profile creation fails, the user is created, so redirect them.
        router.push('/dashboard');
        return;
      }
      
      toast({
        title: 'Sign Up Successful!',
        description: 'Please check your email to verify your account.',
      });
      router.push('/dashboard');
    }
    setIsLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button type="button" variant="outline" onClick={() => handleSocialLogin('google')} disabled={isLoading}>
                Sign up with Google
              </Button>
              <Button type="button" variant="outline" onClick={() => handleSocialLogin('linkedin')} disabled={isLoading}>
                Sign up with LinkedIn
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <FormField
                  control={form.control}
                  name="civility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Mr">Mr.</SelectItem>
                          <SelectItem value="Mrs">Mrs.</SelectItem>
                          <SelectItem value="Ms">Ms.</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Innovate Ltd" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Founder" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+230 XXXX XXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobile_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile / WhatsApp</FormLabel>
                      <FormControl>
                        <Input placeholder="+230 XXXX XXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </CardContent>
        </form>
      </Form>
      <CardFooter className="flex-col gap-4">
        <div className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="underline hover:text-primary">
            Login
          </Link>
        </div>
      </CardFooter>
    </>
  );
}
