import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function PromoBanner() {
  const banners = [
    {
      id: 1,
      badge: '🔥 Deal of the Day',
      title: 'Fresh Organic Fruits',
      description: 'Get up to 40% off on selected organic fruits',
      discount: '40% OFF',
      code: 'ORGANIC40',
      buttonText: 'Shop Now',
      bgClass: 'bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700 text-white',
      badgeBg: 'bg-white/20 text-white',
    },
    {
      id: 2,
      badge: '✨ New Arrivals',
      title: 'Exotic Vegetables',
      description: 'Discover our latest collection of premium vegetables',
      discount: '25% OFF',
      code: 'FRESH25',
      buttonText: 'Explore Now',
      bgClass: 'bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 text-white',
      badgeBg: 'bg-white/20 text-white',
    },
  ];

  return (
    <div className="w-full max-w-350 mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`relative overflow-hidden rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-55 md:min-h-65 shadow-sm transition-transform duration-300 hover:scale-[1.01] ${banner.bgClass}`}
          >
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute top-4 right-4 w-24 h-24 bg-white/5 rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-start gap-3">
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm ${banner.badgeBg}`}>
                {banner.badge}
              </span>

              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                {banner.title}
              </h2>

              <p className="text-sm md:text-base font-medium text-white/90 max-w-sm">
                {banner.description}
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-white/10">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-black tracking-tighter">
                  {banner.discount}
                </span>
                <span className="text-xs font-medium text-white/75 bg-black/10 px-2 py-0.5 rounded">
                  Use code: <span className="font-mono font-bold text-white">{banner.code}</span>
                </span>
              </div>
              <Link href='/products'>
                <Button
                  className="bg-white hover:bg-gray-50 text-gray-900 font-bold px-5 py-5 rounded-full shadow-md group/btn transition-all text-sm flex items-center gap-2"
                >
                  {banner.buttonText}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
