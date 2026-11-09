"use client"
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import HeroImage from "../../../public/home-slider-1.d79601a8.png"
import { Button } from '@/components/ui/button';
import {  ChevronLeft, ChevronRight, Headset, RotateCcw, Shield, Van } from 'lucide-react';


const slides = [
  {
    id: 1,
    title: 'Fresh Products Delivered to your Door',
    subtitle: 'Get 20% off your first order',
    button1Title: "Shop Now",
    button2Title: "View Details",
    Buttoncolor: "primary-dark"
  },
  {
    id: 2,
    title: 'Premuim Quality Guranteed',
    subtitle: 'Fresh from farm to your table',
    button1Title: "Shop More",
    button2Title: "Learn More",
    Buttoncolor: "blue-500"
  },
  {
    id: 3,
    title: 'Fast & Free Delivery',
    subtitle: 'Same day delivery available',

    button1Title: "Order Now",
    button2Title: "Delivery Info",
    Buttoncolor: "purble-400"
  }
];
export default function Hero() {
  return (
    <section className='bg-background pb-10 w-full m-auto px-6'>
      <div className="relative  w-full max-w-350 mx-auto h-95 md:h-112.5 overflow-hidden rounded-2xl">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          className="w-full h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="relative w-full h-full">
              <div
                className="absolute inset-0 bg-cover bg-center bg-background:${}"
                style={{ backgroundImage: `url(${HeroImage.src})` }}
              />

              <div className="absolute inset-0 bg-linear-to-r from-emerald-600/90 via-emerald-500/80 to-transparent " />
              <div className="absolute inset-0 bg-emerald-700/20 mix-blend-overlay" />

              <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 text-white max-w-xl">
                <h1 className="text-xl md:text-3xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-sm">
                  {slide.title}
                </h1>
                <p className="text-base md:text-lg font-medium opacity-90 mb-8">
                  {slide.subtitle}
                </p>

                <div className="flex items-center gap-4">
                  <Button variant="ghost" className={`bg-white hover:scale-105 ${slide.id === 1 ? "text-primary-dark" : slide.id === 2 ? "text-blue-600" : "text-purple-600"}  font-bold px-8 py-6 text-base rounded-xl transition-all shadow-md`}>
                    {slide.button1Title}
                  </Button>
                  <Button variant="destructive" className="border-2 border-white/80 hover:scale-105 text-white font-bold px-8 py-6 text-base rounded-xl transition-all">
                    {slide.button2Title}

                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

       
        <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-gray-50 text-emerald-600 rounded-full flex items-center justify-center shadow-lg transition-all  cursor-pointer">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-gray-50 text-emerald-600 rounded-full flex items-center justify-center shadow-lg transition-all  cursor-pointer">
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="custom-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex justify-center gap-2 [&>.swiper-pagination-bullet]:w-7 [&>.swiper-pagination-bullet]:h-2 [&>.swiper-pagination-bullet]:rounded-full [&>.swiper-pagination-bullet]:bg-white/50 [&>.swiper-pagination-bullet-active]:bg-white [&>.swiper-pagination-bullet-active]:w-10 [&>.swiper-pagination-bullet]:transition-all" />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-5 place-items-center gap-5'>
        <div className="w-full min-h-20 bg-white flex justify-start items-center p-5 gap-5 border rounded-xl hover:shadow-md">
          <Van size={40} className='text-blue-600 bg-blue-100 p-2 rounded-full'/>
          <div>
            <p>Free Shipping</p>
            <span className="text-sm text-gray-400">On orders over 500 EGP</span>
          </div>
        </div>
        <div className="w-full min-h-20 bg-white flex justify-start items-center p-5 gap-5 border rounded-xl hover:shadow-md">
          <Shield size={40} className='text-green-600 bg-green-100 p-2 rounded-full'/>
          <div>
            <p>Secure Payment</p>
            <span className="text-sm text-gray-400">100% secure transactions</span>
          </div>
        </div>
        <div className="w-full min-h-20 bg-white flex justify-start items-center p-5 gap-5 border rounded-xl hover:shadow-md">
          <RotateCcw size={40} className='text-orange-600 bg-orange-100 p-2 rounded-full'/>
          <div>
            <p>Easy Returns</p>
            <span className="text-sm text-gray-400">4-day return policy</span>
          </div>
        </div>
        <div className="w-full min-h-20 bg-white flex justify-start items-center p-5 gap-5 border rounded-xl hover:shadow-md">
          <Headset size={40} className='text-purple-600 bg-purple-100 p-2 rounded-full'/>
          <div>
            <p>24/7 Support</p>
            <span className="text-sm text-gray-400">Dedicated support team</span>
          </div>
        </div>
      </div>
    </section>

  )
}
