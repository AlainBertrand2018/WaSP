
'use client';

import { Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useMounted } from '@/hooks/use-mounted';
import { MainHeader } from '@/components/layout/main-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how BusinessStudio AI collects, uses, and protects your personal and business data. We are committed to transparency and GDPR compliance.',
  openGraph: {
    title: 'Privacy Policy | BusinessStudio AI',
    description: 'Learn how BusinessStudio AI collects, uses, and protects your personal and business data. We are committed to transparency and GDPR compliance.',
  },
  twitter: {
    title: 'Privacy Policy | BusinessStudio AI',
    description: 'Learn how BusinessStudio AI collects, uses, and protects your personal and business data. We are committed to transparency and GDPR compliance.',
  }
};


export default function PrivacyPolicyPage() {
  const isMounted = useMounted();

  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-primary-foreground">
      <MainHeader />
      <main className="flex-1 bg-secondary-darker">
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-8 rounded-lg text-card-foreground">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Shield className="text-primary h-8 w-8" />
                    Privacy Policy for BusinessStudio AI
                </h1>
                <p className="text-muted-foreground mt-2">
                    Last Updated: August 08, 2025
                </p>

                <div className="prose prose-invert prose-p:text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground max-w-none mt-6">
                    <h2>1. Introduction</h2>
                    <p>Welcome to BusinessStudio AI! This Privacy Policy explains how we collect, use, and share information about you when you use our AI-powered SaaS platform designed for entrepreneurs and SMEs in Mauritius. We are committed to protecting your privacy and complying with the General Data Protection Regulation (GDPR).</p>

                    <h2>2. Information We Collect</h2>
                    <p>We collect the following types of information:</p>
                    <p><b>Personal Data:</b> This includes your name and email address, which you provide when registering for an account.</p>
                    <p><b>Usage Data:</b> We automatically collect certain information about your use of BusinessStudio AI, such as your IP address, browser type, operating system, referring URLs, pages visited, and the dates/times of your visits. This data helps us understand how you use our platform and improve its performance.</p>
                    <p><b>Business Data:</b> This includes any information you input into BusinessStudio AI related to your business, such as business plans, financial models, marketing materials, and other data you upload, create, or modify using our services. This may contain sensitive financial and business information.</p>
                    <p><b>Cookies:</b> We use cookies for session management and analytics purposes. See section 5 for more details.</p>
                    <p><b>AI Chatbot Data:</b> When you interact with our AI chatbot CLAIRE, we log the conversation history to improve its performance and provide better support. This includes your questions and CLAIRE's responses.</p>

                    <h2>3. How We Use Your Information</h2>
                    <p>We use your information for the following purposes:</p>
                    <p><b>To Provide and Maintain the Service:</b> We use your Personal Data and Business Data to provide you with access to BusinessStudio AI and its features, and to ensure the platform is functioning correctly.</p>
                    <p><b>To Personalize User Experience:</b> We may use your Usage Data and Business Data to personalize your experience on BusinessStudio AI and provide you with tailored recommendations and insights.</p>
                    <p><b>For Customer Support:</b> We use your Personal Data and AI Chatbot Data to respond to your inquiries and provide you with customer support.</p>
                    <p><b>For Analytics:</b> We use your Usage Data to analyze how users are using BusinessStudio AI and to identify areas for improvement.</p>
                    <p><b>To Communicate with You:</b> We may use your Personal Data to send you important notices, updates, and promotional materials.</p>
                    <p><b>To Improve CLAIRE:</b> AI Chatbot data is used to continuously improve the AI's ability to generate relevant and useful information.</p>

                    <h2>4. How We Share Your Information</h2>
                    <p>We may share your information in the following circumstances:</p>
                    <p><b>With Service Providers:</b> We may share your information with third-party service providers who assist us with providing and maintaining BusinessStudio AI, such as hosting providers, analytics providers, and customer support providers. These providers are contractually obligated to protect your information and only use it for the purposes we specify.</p>
                    <p><b>For Legal Compliance:</b> We may disclose your information if required to do so by law or in response to a valid legal request, such as a subpoena or court order.</p>
                    <p><b>Business Transfers:</b> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of the transaction.</p>
                    <p><b>Aggregated/Anonymized Data:</b> We may share aggregated or anonymized data with third parties for research or marketing purposes. This data will not identify you personally.</p>
                    <p><b>Confidentiality of Business Data:</b> We understand that your Business Data is confidential and sensitive. We will treat your Business Data as confidential and will not share it with any third parties except as described in this Privacy Policy (e.g., with service providers under strict confidentiality agreements).</p>
                    
                    <h2>5. Cookies and Tracking Technologies</h2>
                    <p>We use cookies to improve your experience on BusinessStudio AI. Cookies are small text files that are stored on your device when you visit a website. We use the following types of cookies:</p>
                    <p><b>Essential Cookies:</b> These cookies are necessary for the operation of BusinessStudio AI. They enable you to log in to your account and access secure areas of the platform.</p>
                    <p><b>Performance Cookies:</b> These cookies collect information about how you use BusinessStudio AI, such as the pages you visit and the errors you encounter. This information helps us improve the performance of the platform.</p>
                    <p><b>Analytics Cookies:</b> These cookies are used to track website usage and engagement. This information helps us understand how users are interacting with BusinessStudio AI.</p>
                    <p><b>Managing Cookies:</b> You can manage your cookie preferences in your browser settings. You can choose to block all cookies, or to only allow certain types of cookies. Please note that if you block essential cookies, you may not be able to access certain features of BusinessStudio AI.</p>

                    <h2>6. Data Security</h2>
                    <p>We take the security of your information seriously. We implement appropriate technical and organizational measures to protect your information from unauthorized access, use, or disclosure. These measures include:</p>
                    <p><b>Encryption:</b> We use encryption to protect your information when it is transmitted over the internet and when it is stored on our servers.</p>
                    <p><b>Access Controls:</b> We restrict access to your information to authorized personnel only.</p>
                    <p><b>Regular Security Assessments:</b> We conduct regular security assessments to identify and address vulnerabilities in our systems.</p>
                    <p>While we strive to protect your information, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure. Therefore, we cannot guarantee the absolute security of your information.</p>

                    <h2>7. Data Retention</h2>
                    <p>We retain your information for as long as necessary to provide you with BusinessStudio AI and to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law. Specifically:</p>
                    <p><b>Personal Data:</b> We retain your Personal Data as long as your account is active. Once you close your account, we will delete your Personal Data within 120 days, unless we are required to retain it for legal or regulatory purposes.</p>
                    <p><b>Usage Data:</b> We retain Usage Data for [Number] months to analyze trends and improve the platform. After [Number] months, we aggregate or anonymize this data.</p>
                    <p><b>Business Data:</b> We retain your Business Data as long as your account is active. You have the ability to delete your Business Data at any time. Once you close your account, we will delete your Business Data within [Number] days, unless we are required to retain it for legal or regulatory purposes.</p>
                    <p><b>AI Chatbot Data:</b> AI Chatbot data is retained for [Number] months to improve CLAIRE. After that period, the data is anonymized.</p>

                    <h2>8. Your Data Protection Rights</h2>
                    <p>Under the GDPR, you have the following rights regarding your personal data:</p>
                    <p><b>Right to Access:</b> You have the right to access the personal data we hold about you.</p>
                    <p><b>Right to Rectification:</b> You have the right to request that we correct any inaccurate or incomplete personal data we hold about you.</p>
                    <p><b>Right to Erasure:</b> You have the right to request that we delete your personal data.</p>
                    <p><b>Right to Restriction of Processing:</b> You have the right to request that we restrict the processing of your personal data.</p>
                    <p><b>Right to Data Portability:</b> You have the right to receive your personal data in a structured, commonly used, and machine-readable format and to transmit it to another controller.</p>
                    <p><b>Right to Object:</b> You have the right to object to the processing of your personal data.</p>
                    <p>To exercise these rights, please contact us at <b>admin[at]avantaz[dot]online</b></p>
                    <p>You also have the right to lodge a complaint with the Data Protection Office in Mauritius if you believe that we have violated your data protection rights.</p>

                    <h2>9. International Data Transfers</h2>
                    <p>Your information may be stored and processed in countries outside of Mauritius. We will take appropriate measures to ensure that your information is protected in accordance with this Privacy Policy and applicable data protection laws, including the implementation of Standard Contractual Clauses (SCCs) where required.</p>

                    <h2>10. Children's Privacy</h2>
                    <p>BusinessStudio AI is not intended for children under the age of 18. We do not knowingly collect personal data from children under 18. If you are a parent or guardian and you believe that your child has provided us with personal data, please contact us at admin[at]avantaz[dot]online and we will take steps to delete the information.</p>

                    <h2>11. Changes to This Privacy Policy</h2>
                    <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on our website and sending you an email. You are advised to review this Privacy Policy periodically for any changes. Your continued use of BusinessStudio AI after the posting of any changes constitutes acceptance of those changes.</p>

                    <h2>12. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at <b>admin[at]avantaz[dot]online</b></p>
                </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-12 md:grid-cols-5">
            <div className="col-span-2 md:col-span-1">
                 <Link href="/" className="flex items-center gap-2">
                    <Image src="/images/studioFlowLogo_1024.png" alt="BusinessStudio AI Logo" width={32} height={32} />
                    <span className="text-xl font-bold">BusinessStudio AI</span>
                </Link>
                <p className="mt-4 text-sm text-primary-foreground/60">The future of business creation.</p>
            </div>
            <div>
                <h4 className="font-semibold">Product</h4>
                <ul className="mt-4 space-y-2 text-sm">
                    <li><Link href="/#features" className="text-primary-foreground/60 hover:text-primary-foreground">Features</Link></li>
                    <li><Link href="/#pricing" className="text-primary-foreground/60 hover:text-primary-foreground">Pricing</Link></li>
                    <li><Link href="#" className="text-primary-foreground/60 hover:text-primary-foreground">Updates</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold">Company</h4>
                <ul className="mt-4 space-y-2 text-sm">
                    <li>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="text-primary-foreground/60 hover:text-primary-foreground">About</button>
                            </DialogTrigger>
                             <DialogContent className="sm:max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>About BusinessStudio AI</DialogTitle>
                                </DialogHeader>
                                <div className="mb-4">
                                    <Image src="/images/studioFlow_Logotype.png" alt="BusinessStudio AI Logo" width={200} height={50} className="w-1/2 mx-auto" />
                                </div>
                                <div className="space-y-4 text-sm text-muted-foreground max-h-[70vh] overflow-y-auto pr-4">
                                    <p>
                                    BusinessStudio AI is a Made-in-Mauritius Webapps-as-Software Platform (WaSP) that helps entrepreneurs, SMEs and executives validate ideas, build financial plans, and create investor-ready business plans—fast. Designed for the Mauritian market, BusinessStudio AI blends local business insight with practical AI tools so you can create, launch and manage projects in one place, from first concept to go-to-market.
                                    </p>
                                    <p>
                                    Built by Alain Bertrand, a serial entrepreneur using AI co-development, BusinessStudio AI is designed with an AI-first, digital-first mindset to give Mauritian entrepreneurs and executives a real competitive edge. Our goal is simple: <b>help you thrive, not just survive</b>. 
                                    </p>
                                    <h2 className="font-bold text-foreground">What we do</h2>
                                     <ul className="space-y-2 list-disc pl-5">
                                        <li><b>Local-first validation</b>: test your idea against Mauritian market realities.</li>
                                        <li><b>Financial modelling</b>: generate projections and budget scenarios in minutes.</li>
                                        <li><b>Investor-ready docs</b>: produce clear, professional business plans.</li>
                                        <li><b>Unified workspace</b>: plan, execute and track your venture end-to-end.</li>
                                    </ul>
                                    <p className="font-bold text-foreground pt-2">
                                    <b>Made in Mauritius... Built for Mauritius</b>. If you’re starting up or scaling, BusinessStudio AI gives you the clarity and speed to move from idea to execution with confidence.
                                    </p>
                                </div>
                                <DialogFooter className="justify-center">
                                    <Button asChild>
                                        <Link href="/login">Try The Demo</Link>
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </li>
                    <li>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="text-primary-foreground/60 hover:text-primary-foreground">Careers</button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Careers at BusinessStudio AI</DialogTitle>
                                </DialogHeader>
                                <div className="mb-4">
                                    <Image src="/images/studioFlow_Logotype.png" alt="BusinessStudio AI Logo" width={200} height={50} className="w-1/2 mx-auto" />
                                </div>
                                <div className="space-y-4 text-sm text-muted-foreground max-h-[70vh] overflow-y-auto pr-4">
                                    <h1 className="text-lg font-semibold text-foreground">Recruitment starts soon at BusinessStudio AI.</h1>
                                    <p>We’re building a local-first, AI-first platform that helps Mauritian entrepreneurs and executives go from idea to investor-ready—fast. In the next few weeks we’ll start listening from you:</p>
                                    <ul className="space-y-2 list-disc pl-5">
                                        <li>Product & UX</li>
                                        <li>Engineering / AI</li>
                                        <li>Growth Marketing & Content</li>
                                        <li>Customer Success & Partnerships</li>
                                        <li>Operations</li>
                                    </ul>
                                    <p>Follow us, on our social networks or DM your profile.</p>
                                    <p>We’re an equal-opportunity team—talent from all backgrounds is welcome.</p>
                                    <p className="font-mono text-xs">#Hiring #MadeInMauritius #AI #SaaS #Startups #SME #Careers</p>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </li>
                    <li>
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="text-primary-foreground/60 hover:text-primary-foreground">Contact</button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Contact Us</DialogTitle>
                              <DialogDescription>
                                Have a question or want to work with us? Fill out the form below.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name-footer" className="text-right">
                                  Name
                                </Label>
                                <Input id="name-footer" placeholder="John Doe" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email-footer" className="text-right">
                                  Email
                                </Label>
                                <Input id="email-footer" type="email" placeholder="john@example.com" className="col-span-3" />
                              </div>
                               <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="message-footer" className="text-right pt-2">
                                  Message
                                </Label>
                                <Textarea id="message-footer" placeholder="Your message..." className="col-span-3" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">Send Message</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                    </li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold">Resources</h4>
                <ul className="mt-4 space-y-2 text-sm">
                    <li><Link href="#" className="text-primary-foreground/60 hover:text-primary-foreground">Blog</Link></li>
                    <li><Link href="/faq" className="text-primary-foreground/60 hover:text-primary-foreground" target="_blank" rel="noopener noreferrer">Help Center</Link></li>
                    <li><Link href="/privacy-policy" className="text-primary-foreground/60 hover:text-primary-foreground" target="_blank" rel="noopener noreferrer">Privacy Policy</Link></li>
                </ul>
            </div>
             <div>
                <h4 className="font-semibold">Social</h4>
                <ul className="mt-4 space-y-2 text-sm">
                    <li><Link href="https://x.com/AlainBertrandmu/" className="text-primary-foreground/60 hover:text-primary-foreground" target="_blank" rel="noopener noreferrer">Twitter</Link></li>
                    <li><Link href="https://www.linkedin.com/company/avantaz/" className="text-primary-foreground/60 hover:text-primary-foreground" target="_blank" rel="noopener noreferrer">LinkedIn</Link></li>
                    <li><Link href="https://www.facebook.com/avantaz.mu" className="text-primary-foreground/60 hover:text-primary-foreground" target="_blank" rel="noopener noreferrer">Facebook</Link></li>
                </ul>
            </div>
        </div>
        <div className="container mx-auto border-t border-primary-foreground/10 px-4 py-6 text-center text-sm text-primary-foreground/60">
           © 2025 BusinessStudio AI (Alain BERTRAND). All rights reserved.
        </div>
      </footer>
    </div>
  );
}

    
