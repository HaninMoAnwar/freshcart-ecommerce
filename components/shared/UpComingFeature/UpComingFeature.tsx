'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowLeft, ArrowUpRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UpcomingFeatureProps {
    title?: string;
    description?: string;
    badgeText?: string;
}

export function UpcomingFeature({
    title = "Exciting Feature Coming Soon!",
    description = "We are currently stocking up this section with fresh tools to elevate your shopping journey. Stay tuned for exclusive perks!",
    badgeText = "✨ Under Construction"
}: UpcomingFeatureProps) {
    const router = useRouter();

    return (
        // Main container wrapped with your trademark fresh gradient backgrounds
        <div className="w-full min-h-[70vh] bg-linear-to-b from-[#f4fbf9] via-white to-[#f4fbf9] flex flex-col items-center justify-center p-6 relative overflow-hidden rounded-3xl border border-gray-100/60 my-6 shadow-2xs">

            {/* Decorative vector assets sprinkled across the canvas context layout */}
            <div className="absolute top-12 left-16 text-primary-dark text-3xl select-none pointer-events-none animate-bounce duration-5000">🌱</div>
            <div className="absolute bottom-16 right-20 text-primary-dark text-4xl select-none pointer-events-none">🛒</div>

            {/* Center Showcase Visual Module Frame */}
            <div className="relative mb-6 flex flex-col items-center">
                {/* Main Floating Glassmorphic Icon Box Grid */}
                <div className="w-24 h-24 bg-white border border-gray-100 rounded-3xl shadow-xl flex items-center justify-center p-4 relative z-10 transition-transform hover:rotate-6 duration-300">
                    <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary">
                        <Sparkles className="w-8 h-8 stroke-[2.2] animate-pulse" />
                    </div>
                </div>

                {/* Floating Construction Status Badge */}
                <span className="absolute -bottom-10 bg-primary text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border-2 border-white shadow-md whitespace-nowrap">
                    {badgeText}
                </span>
            </div>

            {/* Typography Copywriting Panel */}
            <div className="text-center max-w-md flex flex-col gap-2.5 mt-4 relative z-10">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    {title}
                </h2>
                <p className="text-xs md:text-sm text-gray-400 font-medium leading-relaxed px-2">
                    {description}
                </p>
            </div>

            {/* Call To Actions Navigation Row Group */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 w-full justify-center relative z-10 max-w-sm px-4">
                <Button
                    
                    className="bg-primary hover:bg-primary-dark text-white font-bold h-11 px-6 rounded-xl shadow-md shadow-primary-50 transition-all flex items-center justify-center gap-2 w-full cursor-pointer text-xs"
                >
                    <Link href="/">
                        Go to Homepage
                    </Link>
                </Button>

                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 shadow-xs font-bold h-11 px-6 rounded-xl transition-all flex items-center justify-center gap-2 w-full cursor-pointer text-xs"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Go Back
                </Button>
            </div>

            {/* Bottom Features Preview Information Row Node */}
            <div className="mt-12 bg-white/60 border border-gray-100 rounded-2xl p-4 w-full max-w-md shadow-2xs backdrop-blur-xs relative z-10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0">
                    <HelpCircle className="h-4 w-4" />
                </div>
                <div className="flex flex-col text-left">
                    <span className="text-[11px] font-black text-gray-900">Need Assistance?</span>
                    <Link href="/contact" className="text-[10px] font-bold text-primary hover:text-primary-dark flex items-center gap-0.5 mt-0.5 group">
                        Contact Support Workspace <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </div>

        </div>
    );
}
