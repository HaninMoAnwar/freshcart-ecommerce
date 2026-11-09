import { ShoppingCart } from 'lucide-react';

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-linear-to-b from-[#f4fbf9] via-white to-[#f4fbf9] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      <div className="absolute top-20 left-20 text-emerald-300/10 text-3xl select-none pointer-events-none">🍏</div>
      <div className="absolute bottom-20 right-20 text-emerald-300/10 text-3xl select-none pointer-events-none">🌱</div>

      <div className="flex flex-col items-center gap-6 relative z-10">
        
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 w-24 h-24 bg-emerald-500/10 rounded-full animate-ping opacity-75" />
          
          <div className="w-20 h-20 bg-white border border-emerald-50 rounded-full shadow-lg flex items-center justify-center relative z-10 transition-transform duration-300">
            <ShoppingCart className="w-9 h-9 text-emerald-500 animate-pulse" />
          </div>
        </div>

        <div className="text-center flex flex-col gap-2">
          <h2 className="text-lg font-extrabold text-gray-900 tracking-tight flex items-center justify-center gap-1">
            Loading Fresh Content
            <span className="flex items-center gap-0.5 ml-1">
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce" />
            </span>
          </h2>
          <p className="text-xs text-gray-400 font-medium">
            Preparing your shopping experience...
          </p>
        </div>

        <div className="w-40 h-1 bg-gray-100 rounded-full overflow-hidden mt-2 border border-gray-50/50">
          <div className="h-full bg-emerald-500 rounded-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>

      </div>

      
    </div>
  );
}
