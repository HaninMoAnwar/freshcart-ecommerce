
"use client"
import { Mail, ArrowRight, Truck, Award, Leaf, Star, Apple, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {  useRef, useState } from 'react';

export function SubscriptionForm() {
  const [isSubmit, setIsSubmit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  function handleSubmit(e:React.SyntheticEvent) {


    e.preventDefault();
    setIsSubmit(true);

    setTimeout(() => {
      setIsSubmit(false);
      if (inputRef.current) {
        inputRef.current.value = ""
      }

    }, 1000)
  }
  return (
    <div className="w-full max-w-350 mx-auto px-4 py-8">
      <div className="w-full bg-[#f4fbf9] border border-emerald-50/50 rounded-3xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-2 flex flex-col gap-6">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-sm">
              <Mail className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold tracking-widest text-emerald-600 uppercase">NEWSLETTER</span>
              <span className="text-xs font-semibold text-gray-500">50,000+ subscribers</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Get the Freshest Updates <br className="hidden md:inline" />
              <span className="text-emerald-500">Delivered Free</span>
            </h2>
            <p className="text-sm md:text-base font-medium text-gray-500 max-w-xl">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 my-1">
            <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2 text-xs font-semibold text-gray-700 shadow-2xs">
              <Leaf className="h-3.5 w-3.5 text-emerald-500" />
              Fresh Picks Weekly
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2 text-xs font-semibold text-gray-700 shadow-2xs">
              <Truck className="h-3.5 w-3.5 text-emerald-500" />
              Free Delivery Codes
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2 text-xs font-semibold text-gray-700 shadow-2xs">
              <Award className="h-3.5 w-3.5 text-emerald-500" />
              Members-Only Deals
            </div>
          </div>

          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl w-full">
              <Input ref={inputRef}
                type="email"
                placeholder="you@example.com"
                required
                className="flex-1 bg-white border-gray-200 text-gray-800 rounded-xl px-4 py-6 text-base focus-visible:ring-emerald-500 shadow-xs placeholder:text-gray-400"
              />
              <Button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base px-8 py-6 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                {isSubmit ? "You'r In" : "Subscribe"}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-gray-400 ml-1 mt-1 flex items-center gap-1">
              ✨ Unsubscribe anytime. No spam, ever.
            </p>
          </form>

        </div>

        <div className="bg-[#0f1e25] text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-85 shadow-xl border border-gray-800 relative overflow-hidden">


          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col gap-4">

            <span className="self-start text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
              📱 Mobile App
            </span>


            <h3 className="text-2xl font-extrabold tracking-tight">
              Shop Faster on Our App
            </h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-60">
              Get app-exclusive deals & 15% off your first order.
            </p>
          </div>


          <div className="flex flex-col gap-3 mt-6">

            <a
              href="#"
              className="flex items-center gap-3 bg-[#1e2d34] hover:bg-[#283941] border border-gray-700/50 rounded-xl p-3 transition-colors group"
            >
              <Apple className="h-6 w-6 text-white transition-transform group-hover:scale-105" />
              <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">DOWNLOAD ON</span>
                <span className="text-sm font-semibold mt-1">App Store</span>
              </div>
            </a>


            <a
              href="#"
              className="flex items-center gap-3 bg-[#1e2d34] hover:bg-[#283941] border border-gray-700/50 rounded-xl p-3 transition-colors group"
            >
              <Play className="h-5 w-5 text-white fill-white transition-transform group-hover:scale-105" />
              <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">GET IT ON</span>
                <span className="text-sm font-semibold mt-1">Google Play</span>
              </div>
            </a>
          </div>


          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-800/60 text-xs">
            <div className="flex items-center text-amber-400 gap-0.5">
              <Star className="h-3.5 w-3.5 fill-current" />
              <Star className="h-3.5 w-3.5 fill-current" />
              <Star className="h-3.5 w-3.5 fill-current" />
              <Star className="h-3.5 w-3.5 fill-current" />
              <Star className="h-3.5 w-3.5 fill-current" />
            </div>
            <span className="font-bold text-gray-300">4.9</span>
            <span className="text-gray-500">• 100K+ downloads</span>
          </div>

        </div>

      </div>
    </div>
  );
}
