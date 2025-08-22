
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { AvatarUpload } from '@/components/feature/avatar-upload';

const formSchema = z.object({
  civility: z.string().min(1, 'Please select a title.'),
  first_name: z.string().min(1, { message: 'First name is required.' }),
  last_name: z.string().min(1, { message: 'Last name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  role: z.enum(['Individual', 'Company/Startup', 'Investor'], { required_error: 'Please select an account type.' }),
  company_name: z.string().min(1, { message: 'Company name is required.' }),
  position: z.string().min(1, { message: 'Position is required.' }),
  phone_number: z.string().min(1, { message: 'Phone number is required.' }),
  mobile_number: z.string().min(1, { message: 'Mobile number is required.' }),
  avatar_url: z.string().url().optional(),
});

type SignUpFormValues = z.infer<typeof formSchema>;

export function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

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

  const nextStep = async () => {
    let fieldsToValidate: (keyof SignUpFormValues)[] = [];
    if (currentStep === 1) {
        fieldsToValidate = ['role', 'civility', 'first_name', 'last_name'];
    } else if (currentStep === 2) {
        fieldsToValidate = ['email', 'password', 'company_name', 'position', 'phone_number', 'mobile_number'];
    }
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  async function onSubmit(values: SignUpFormValues) {
    setIsLoading(true);
    const { email, password, ...profileData } = values;

    // Pass all profile data directly into the signUp options.
    // The database trigger will handle inserting this into the profiles table.
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
            ...profileData,
            // Ensure avatar_url is passed, even if undefined
            avatar_url: values.avatar_url,
        }
      }
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
      toast({
        title: 'Sign Up Successful!',
        description: 'Please check your email to verify your account.',
      });
      router.push('/dashboard');
    } else {
        toast({
            title: 'Sign Up Issue',
            description: 'Could not complete the sign up. Please try again.',
            variant: 'destructive'
        })
    }

    setIsLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-center">Step 1: Your Identity</h3>
                     <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sign up as*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Individual">Individual</SelectItem>
                              <SelectItem value="Company/Startup">Company / Startup</SelectItem>
                              <SelectItem value="Investor">Investor</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                            control={form.control}
                            name="civility"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Title*</FormLabel>
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
                                <FormLabel>First Name*</FormLabel>
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
                                <FormLabel>Last Name*</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            )}
            
            {currentStep === 2 && (
                 <div className="space-y-4">
                    <h3 className="text-lg font-medium text-center">Step 2: Account & Company Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email*</FormLabel>
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
                                <FormLabel>Password*</FormLabel>
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
                                <FormLabel>Company Name*</FormLabel>
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
                                <FormLabel>Position*</FormLabel>
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
                                <FormLabel>Phone Number*</FormLabel>
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
                                <FormLabel>Mobile / WhatsApp*</FormLabel>
                                <FormControl>
                                    <Input placeholder="+230 XXXX XXXX" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                 </div>
            )}
            
            {currentStep === 3 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-center">Step 3: Profile Picture</h3>
                    <FormField
                        control={form.control}
                        name="avatar_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Avatar / Company Logo</FormLabel>
                                <FormControl>
                                    <AvatarUpload
                                        onUpload={(url) => {
                                            field.onChange(url);
                                            toast({ title: 'Image uploaded successfully!' });
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            )}

          </CardContent>
          <CardFooter className="flex-col gap-4">
            <div className="flex w-full justify-between">
                {currentStep > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                        <ArrowLeft /> Previous
                    </Button>
                )}
                {currentStep < 3 ? (
                    <Button type="button" onClick={nextStep} className="ml-auto">
                        Next <ArrowRight />
                    </Button>
                ) : (
                    <Button type="submit" className="ml-auto" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Account
                    </Button>
                )}
            </div>
            <div className="text-sm text-muted-foreground mt-4">
              Already have an account?{' '}
              <Link href="/login" className="underline hover:text-primary">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </>
  );
}
