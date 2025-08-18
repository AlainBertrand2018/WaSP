
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Target, Users, Puzzle, BarChart, Gem, Eye, Scaling, Globe, Coins, PlayCircle, ExternalLink, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import React from "react";
import { useAudioPlayerStore } from "@/store/audio-player-store";
import Image from "next/image";

const Section = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="mb-8">
        <h2 className="flex items-center gap-3 text-2xl font-semibold mb-3">
            {icon}
            <span>{title}</span>
        </h2>
        <div className="prose prose-sm max-w-none text-muted-foreground ml-9">
            {children}
        </div>
    </div>
);


export default function InvestorPageContent() {
    const { openPlayer } = useAudioPlayerStore();

    const handlePlayIntro = () => {
        openPlayer('/audio/Claire Presentation.mp3');
    };
    
    return (
        <div className="container mx-auto p-4 sm:p-8">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader className="text-center border-b pb-6">
                    <CardTitle className="text-4xl font-bold tracking-tight">Investor Memorandum</CardTitle>
                    <CardDescription className="text-lg">An overview of the investment opportunity in BusinessStudio AI.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 md:p-8">
                    
                    <Section title="Executive Summary" icon={<Target className="text-primary" />}>
                        <p>BusinessStudio AI is a first-of-its-kind Webapps-as-Software Platform (WaSP) designed primarily for the Mauritian market. It is designed with goal to empower local entrepreneurs, startups, and SMEs by providing an integrated suite of simple-to-use AI-powered tools that streamline their journey from idea conception to an investor-ready business. 
By automating complex tasks like market and compliance validation, financial modeling, and business plan creation, we significantly reduce the time, cost, and friction associated with launching and scaling a business in Mauritius. We are seeking seed funding to perfect our platform, acquire traction via a local user base, solidify our position as an essential digital player for Mauritian enterprises and more importantly, prepare for solid scalability.
</p>
                    </Section>

                    <Section title="The Problem & The Opportunity" icon={<Puzzle className="text-primary" />}>
                        <p>The Mauritian SME sector is the lifeblood of the economy, yet it faces significant hurdles:</p>
                        <ul className="list-disc pl-5">
                            <li><strong>Lack of Accessible Tools:</strong> Entrepreneurs rely on generic, international software that doesn't account for local market specifics, regulations, or business culture.</li>
                            <li><strong>High Barrier to Entry:</strong> The cost and complexity of professional business planning, market research, and financial forecasting are prohibitive for many startups.</li>
                            <li><strong>Fragmented Workflow:</strong> Founders waste valuable time juggling disconnected tools for ideation, finance, and management, leading to inefficiency and costly errors.</li>
                            <li><strong>Scattered Information:</strong> The absence of centralized, sector-specific guidance leads to costly delays and inefficiencies for Mauritian entrepreneurs navigating compliance and business requirements.</li>
                        </ul>
                        <p className="mt-2 font-semibold">And thus, the opportunity is promisingly very clear: to provide a centralized, affordable, and localized platform that democratizes the tools for business success in Mauritius. Beyond that there is also the perspective of acquiring premium skills and expertise by making the Mauritius SME/ Entrepreneurs/ Startups niches the perfect sandbox in view of international expansion.</p>
                    </Section>

                    <Section title="Our Solution: The WaSP (Webapps-as-Software Platform)" icon={<Gem className="text-primary" />}>
                        <p>BusinessStudio AI is a fully mobile-ready all-in-one command center that guides users through every stage of business creation and management. Our key differentiator is our AI, CLAIRE, which is fine-tuned on data specific to the Mauritian (local) business ecosystem, providing relevant, actionable insights that generic tools cannot match on the fly.</p>
                        <ul className="list-disc pl-5">
                            <li><strong>AI-Powered Guidance:</strong> From validating an idea's market fit to generating financial projections, our AI acts as a co-pilot for the user.</li>
                            <li><strong>End-to-End Workflow:</strong> We cover the entire lifecycle: Ideation → Validation → MVP Planning → Budgeting → Business Plan → Ongoing Management → Compliance Validation → Marketing and Advertising, etc.</li>
                            <li><strong>Localized Content:</strong> All generated content, from market analysis to compliance checks, is tailored for Mauritius.</li>
                        </ul>
                    </Section>

                    <div className="text-center my-8">
                        <Button variant="outline" className="gap-2" onClick={handlePlayIntro}>
                            <PlayCircle className="h-4 w-4" />
                            Let CLAIRE Explain
                        </Button>
                    </div>

                    <Section title="Target Market" icon={<Users className="text-primary" />}>
                        <p>The addressable market in Mauritius is substantial and growing. It is composed of over 140,000 SMEs and sees approximately 15,000 new business registrations annually. Our prime commercial objective is to incrementally capture between 0.1% and 10% of this dynamic niche monthly, within the next 24 months through aggressive advertising and social media campaigns.</p>
                        <p>Our primary market consists of three key segments within this niche:</p>
                        <ul className="list-disc pl-5">
                            <li><strong>Aspiring Entrepreneurs:</strong> Individuals at the ideation stage who need guidance and structure to turn their vision into a viable plan.</li>
                            <li><strong>Early-Stage Startups:</strong> New businesses seeking to formalize their strategy, secure seed funding, and establish efficient operations.</li>
                            <li><strong>Existing SMEs:</strong> Small and medium-sized enterprises looking to innovate, expand, or streamline their operations with modern, AI-driven tools.</li>
                        </ul>
                    </Section>

                    <div className="text-center my-8">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <Eye className="h-4 w-4" />
                                    Take a Glance at our target market
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
                                <DialogHeader>
                                    <DialogTitle>SME & Startup Dashboard for Mauritius</DialogTitle>
                                    <DialogDescription>
                                        An interactive dashboard providing insights into the Mauritian SME landscape.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex-1 border rounded-lg overflow-hidden">
                                    <iframe
                                        src="/documents/mauritius_sme_startup_dashboard.html"
                                        title="SME & Startup Dashboard for Mauritius"
                                        className="w-full h-full border-0"
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Section title="Business & Monetization Model" icon={<BarChart className="text-primary" />}>
                        <p>We operate on a freemium SaaS model designed for accessibility and scalability. This model serves as a powerful customer acquisition funnel, allowing users to experience the platform's value before committing to a paid plan.</p>
                        <h4 className="font-semibold text-foreground mt-4">Pricing Tiers:</h4>
                        <ul className="list-disc pl-5">
                            <li><strong>Test Drive (Freemium):</strong> Offers limited access to core features, serving as an entry point to demonstrate value and capture leads.</li>
                            <li><strong>Business Tool Kits (MUR 200/seat/month):</strong> A la carte access to specific tool suites, providing a flexible, low-cost entry for SMEs with targeted needs.</li>
                            <li><strong>PRO (MUR 400/seat/month):</strong> Our flagship offering with unlimited access to all tool suites, designed for serious founders and teams requiring a comprehensive solution.</li>
                            <li><strong>AI Transformation Blueprints for Enterprises (as from MUR 100k):</strong> Custom-priced solutions for established companies seeking to assess, plan and integrate AI workflows, including training and support.</li>
                        </ul>

                        <h4 className="font-semibold text-foreground mt-4">Revenue Projections (Based on Assumptions):</h4>
                        <p>Our projections are based on capturing a conservative fraction of the addressable SME market in Mauritius over the initial years.</p>
                        <ul className="list-disc pl-5">
                            <li><p><strong>Year 1 Minimum ARR: ~MUR 880,000.</strong></p>
                            <p>• This conservative forecast is based on acquiring 200–300 subscribers on the "Business Tool Kits" and "PRO" plans, with an average of 1.5 seats per business. This serves as our baseline key performance indicator.</p></li>
                            <li><p><strong>Year 2 MRR Range: 197K → 553K, Avg ≈ Rs 335K v/s ARR ≈ Rs 4.0M.</strong></p>
                            <p>• Our optimistic target aims for a user base of 1,500–1,700, with a mix of 80% on "Tool Kits" and 20% on the premium "PRO" plan (avg. 2 seats), with focus on marketing for our high-value AI Transformation Blueprints packages. This would demonstrate strong growth potential and product-market fit.</p></li>
                            <li><p><strong>Year 3 MRR (projected): Avg ≈ Rs 420K – 450K v/s ARR ≈ Rs 5.0–5.4M.</strong> </p> 
                            <p>• Our 3rd year projected objective is simple: Reach for 2,000–2,200 subscribers locally and acquire more potential high-value enterprise via our AI Transformation Blueprint product. The ultimate goal is to make this segment the backbone our revenue stack alongside our growing <strong>WaSP</strong> subscribers' userbase.</p></li>
                        </ul>
                    </Section>

                    <Section title="Growth Strategy: Market Share and Expertise" icon={<Scaling className="text-primary" />}>
                         <p>Our growth strategy is twofold. Firstly, we will focus on user conversion and upselling within our SaaS model, driving towards our goal of 10% local market capture by guiding businesses from free trials to comprehensive "pro" plans as they scale.</p>
                         <p>Secondly, we will aggressively pursue the enterprise market by offering premium "AI Transformation Blueprints." Serving larger companies that require modernization and expansion not only creates a high-margin revenue stream but also deepens our domain expertise. This positions BusinessStudio AI as a leader in corporate AI adoption and builds a powerful, defensible moat of localized knowledge.</p>
                    </Section>

                     <Section title="Long-Term Vision: Regional and Continental Expansion" icon={<Globe className="text-primary" />}>
                        <p>Our ambition extends beyond Mauritius. We envision our locally-acquired expertise as a critical springboard for regional and continental expansion, specifically targeting the Indian Ocean Rim and the broader African market.</p>
                         <p>The African continent represents an enormous opportunity, with an estimated 44 - 125 million+ SMEs both in formal and informal sectors, that form the backbone of its economy. This landscape is ripe for digital transformation. Our vision is to adapt and scale our proven platform to meet the unique needs of at least 0.01% of African entrepreneurs, startups and mid-sized businesses.</p>
                         <h4 className="font-semibold text-foreground mt-4">Affordable digital empowerment is Africa’s next growth frontier:</h4>
                         <p>The access to affordable, non-complex digital tools is a universal pain point, even more so in Africa. Business Studio AI intends to unlock the African market by delivering simple, <strong>intuitively localized</strong> AI-powered tools, targeting millions of SMEs. In fact, we will be bridging the gap, giving SMEs across the continent the AI-driven tools they need to thrive—scalable, accessible, and transformative. On the business side of things, even a 0.01% foothold with a blended price at Rs 300/month will turn into Rs 45M in recurring revenue. </p>
                        <h4 className="font-semibold text-foreground mt-4">Strategic Expansion Goals (5-10 Years):</h4>
                        <ul className="list-disc pl-5">
                            <li><strong>Establish Key Hubs:</strong> Launch operations in strategic economic hubs like Kenya, Nigeria, and South Africa.</li>
                            <li><strong>Form Local Partnerships:</strong> Collaborate with local incubators, financial institutions, and government bodies to tailor our offering.</li>
                            <li><strong>Quantified Objective:</strong> Capture 0.01% of the African SME market, translating to empowering over 25,000 businesses. This represents a significant, scalable, and impactful long-term revenue opportunity.</li>
                        </ul>
                    </Section>

                    <Section title="The Ask" icon={<Coins className="text-primary" />}>
                        <p>To achieve our aggressive growth targets and solidify our market leadership, we are seeking MUR 4,500,000 in seed funding. This investment will provide an 12 to 15-month runway to execute our strategy, reach key milestones, and prepare for our next phase of growth.</p>
                        
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="font-semibold text-foreground mt-4 cursor-pointer hover:text-primary flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    <span>Allocation of Funds:</span>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                    <DialogTitle>Fund Allocation Breakdown</DialogTitle>
                                </DialogHeader>
                                <Image 
                                    src="/images/fundallocationBreakdown.webp"
                                    alt="Fund Allocation Breakdown"
                                    width={1200}
                                    height={800}
                                    className="rounded-lg"
                                />
                            </DialogContent>
                        </Dialog>

                        <p className="mt-2">The requested capital will be strategically allocated across the following key areas to maximize growth and value creation:</p>
                        <ul className="list-disc pl-5">
                            <li><strong>Product Development & R&D (28% - MUR 1,260,000):</strong> Core platform enhancements, development of new AI-powered tool suites, and initial R&D for regional adaptation.</li>
                            <li><strong>Sales, Marketing & Growth (42% - MUR 1,890,000):</strong> Funding for aggressive digital marketing campaigns, content creation, and social media outreach to achieve our target market capture rate of 2-5%.</li>
                            <li><strong>Talent Acquisition (15% - MUR 675,000):</strong> Minimum salaries for a lean, 3-member core team (Founder, Lead Developer, Marketing/Growth Lead) to drive the product roadmap and user acquisition.</li>
                            <li><strong>Operational, Admin & Compliance (7% - MUR 315,000):</strong> Covers hosting, software licenses, administrative costs, and other operation-linked expenses.</li>
                            <li><strong>Contingency & Runway Buffer (8% - MUR 360,000):</strong> A crucial buffer for unforeseen expenses and opportunities.</li>
                        </ul>
                        <p className="mt-2">This funding will enable us to hit our target of 100+ paying businesses, achieve a strong product-market fit, and build the foundation for our long-term vision of regional expansion.</p>
                    </Section>

                    <Section title="What's in for the Investors?" icon={<TrendingUp className="text-primary" />}>
                        <p>We are offering 20–30% equity for Rs 4.5M, with a clear trajectory to transform this into a Rs 225M–2.25B valuation opportunity within 3–5 years through African SME adoption.</p>
                    </Section>
                    
                    <div className="text-center mt-12 pt-6 border-t">
                        <h2 className="text-2xl font-bold">Join Us in Powering the Next Generation of Mauritian Enterprise</h2>
                        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">We believe BusinessStudio AI has the potential to become an indispensable tool for every entrepreneur in Mauritius. We are looking for partners who share our vision.</p>
                        <Button asChild size="lg" className="mt-6 group">
                           <Link href="mailto:admin@avantaz.online">
                                <span>Contact Us for a Full Pitch Deck</span>
                                <ArrowRight className="transition-transform group-hover:translate-x-1" />
                           </Link>
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}
