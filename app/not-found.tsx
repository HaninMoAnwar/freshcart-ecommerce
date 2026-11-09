'use client'; // Required for dynamic browser navigation triggers (Go Back)

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, ArrowLeft, ShoppingCart, HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    // Main container with a soft minty background gradient matching the screenshots
    <div className="w-full min-h-screen bg-linear-to-b from-[#f4fbf9] via-white to-[#f4fbf9] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* ================= BACKGROUND FLOATING ACCENTS ================= */}
      {/* Light green subtle fruit/leaf vector lookalikes sprinkled across screen grids */}
      <div className="absolute top-16 left-20 text-emerald-300/20 text-4xl select-none pointer-events-none animate-bounce duration-4000">🍏</div>
      <div className="absolute top-1/3 right-24 text-emerald-400/15 text-3xl select-none pointer-events-none rotate-12">🍋</div>
      <div className="absolute bottom-1/4 left-16 text-emerald-400/20 text-2xl select-none pointer-events-none -rotate-45">🌱</div>
      <div className="absolute bottom-20 right-1/4 text-emerald-300/20 text-3xl select-none pointer-events-none">🥦</div>

      {/* ================= MAIN ILLUSTRATION (Image 1) ================= */}
      <div className="relative mb-8 flex flex-col items-center">
        {/* The Card Housing the Shopping Cart Vector Icon */}
        <div className="w-48 h-32 bg-white border border-gray-100/80 rounded-3xl shadow-xl flex items-center justify-center p-4 relative z-10 transition-transform hover:scale-105 duration-300">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
            <ShoppingCart className="w-10 h-10 stroke-[2.5]" />
          </div>
        </div>

        {/* 404 Floating Rounded Badge Notification */}
        <div className="absolute -top-4 -right-4 z-20 bg-emerald-500 text-white font-black text-sm px-4 py-2 rounded-full border-4 border-white shadow-md flex items-center justify-center">
          404
        </div>

        {/* Subtle cute geometric face expression line beneath illustration */}
        <div className="flex items-center gap-1.5 mt-6 opacity-75">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <div className="w-10 h-3 border-b-2 border-emerald-400 rounded-full" />
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
      </div>

      {/* ================= TEXT TITLES & DESCRIPTION ================= */}
      <div className="text-center max-w-xl flex flex-col gap-3 relative z-10">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Oops! Nothing Here
        </h1>
        <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed px-4">
          Looks like this page went out of stock! Don't worry, <br className="hidden sm:inline" />
          there's plenty more fresh content to explore.
        </p>
      </div>

      {/* ================= CORE ACTION CTA BUTTONS (Image 2) ================= */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full justify-center relative z-10">
        <Button
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 px-7 rounded-xl shadow-md shadow-emerald-600/10 transition-all flex items-center gap-2 w-full sm:w-auto cursor-pointer"
        >
          <Link href="/" className='flex justify-start items-center gap-2'>
            <Home className="h-4 w-4" />
            Go to Homepage
          </Link>
        </Button>

        <Button 
          variant="outline"
          onClick={() => router.back()} // Safely pushes the user back onto their historical layout node
          className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 shadow-xs font-bold h-12 px-7 rounded-xl transition-all flex items-center gap-2 w-full sm:w-auto cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      </div>

      {/* ================= POPULAR DESTINATIONS FOOTER BOARD (Image 2) ================= */}
      <div className="mt-12 bg-white/80 border border-gray-100 rounded-3xl p-6 w-full max-w-xl shadow-sm backdrop-blur-xs relative z-10 text-center flex flex-col gap-4">
        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          Popular Destinations
        </span>
        
        {/* Flex layout rows mapping alternative redirection shortcuts */}
        <div className="flex flex-wrap justify-center gap-2.5">
          <Link href="/products" className="text-xs font-bold text-emerald-600 bg-emerald-50/50 hover:bg-emerald-50 px-4 py-2.5 rounded-full transition-colors border border-emerald-100/50">
            All Products
          </Link>
          <Link href="/categories" className="text-xs font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 px-4 py-2.5 rounded-full transition-colors border border-gray-200/40">
            Categories
          </Link>
          
          <Link href="/contact" className="text-xs font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 px-4 py-2.5 rounded-full transition-colors border border-gray-200/40">
            Contact Us
          </Link>
        </div>
      </div>

    </div>
  );
}
