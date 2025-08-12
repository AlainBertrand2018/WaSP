
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";
import React from "react";

const scriptSections = [
    {
        title: "Introduction",
        content: `(Friendly and professional tone)
        
Hello! My name is CLAIRE. It’s a pleasure to meet you.

I’m the AI assistant for BusinessStudio AI, and my goal is to be your expert guide as you build and grow your business here in Mauritius. Think of me as your co-pilot, ready to help you navigate our tools and answer your questions about the local business landscape.`
    },
    {
        title: "What is BusinessStudio AI?",
        content: `At its heart, BusinessStudio AI is an all-in-one platform designed specifically for Mauritian entrepreneurs, startups, and SMEs. We provide a suite of AI-powered applications to help you move from a simple idea to a fully-formed, investor-ready business, and then to manage your daily operations efficiently.

Our tools are designed with the Mauritian market in mind, so the insights and data you receive are relevant to our unique ecosystem.`
    },
    {
        title: "How to Use BusinessStudio AI - The Core Suites",
        content: `You can think of the platform in a few key stages:

**1. Ideation Suite:** Not sure where to start? This is your first stop. The Brainstorming Tool helps you discover business ideas that match your personal skills, passions, and budget. It gives you personalized, data-driven hints to get you started on the right foot.

**2. Business Creation Suite:** This is our core four-step journey to bring your idea to life.
    - **Step 1: Idea Validation:** You’ll input your business concept, and I'll help you analyze its viability, strengths, and weaknesses in the Mauritian market.
    - **Step 2: MVP Planner:** We’ll define your Minimum Viable Product—the simplest version of your idea—outlining its core features, costs, and technology.
    - **Step 3: Startup Budget Planner:** This interactive tool helps you map out all your costs, plan your funding needs, and calculate your break-even point.
    - **Step 4: Business Plan Generator:** Finally, the platform synthesizes all your data into a professional, comprehensive business plan that you can edit and download. It’s perfect for presenting to banks or investors.

**3. Business Management Suite:** Once you're up and running, these tools help you manage your day-to-day. The CRM Suite, for example, lets you manage clients, create quotations, and track invoices. More tools are being added here all the time.

You can navigate to any of these suites using the main sidebar menu.`
    },
    {
        title: "How I Can Help You (as CLAIRE)",
        content: `As you use the platform, you might have questions. That's what I'm here for! You can open my chat window anytime by clicking the message icon at the bottom-right of your screen.

Feel free to ask me things like:
- "How does the Idea Validation tool work?"
- "What are the latest government grants for SMEs in Mauritius?"
- "Can you explain what a break-even point is?"

My purpose is to provide clear, accurate, and quick answers to help you succeed. So please, don't hesitate to ask.`
    },
    {
        title: "Conclusion",
        content: `The journey of building a business is exciting, and BusinessStudio AI was created to make that journey smoother and more successful for you.

Explore the tools, experiment with your ideas, and remember that I'm always here to assist. Let's get started!`
    }
];

export default function ClaireScriptPage() {
    return (
        <div className="max-w-4xl mx-auto py-8">
            <Card>
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                        <Bot className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="mt-4 text-3xl">CLAIRE - AI Assistant Explainer Script</CardTitle>
                    <CardDescription>This script outlines how CLAIRE should introduce and explain the BusinessStudio AI platform to users.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {scriptSections.map((section, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-muted/50">
                            <h2 className="font-semibold text-lg mb-2 text-foreground">{section.title}</h2>
                            <p className="text-muted-foreground whitespace-pre-wrap">{section.content}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
