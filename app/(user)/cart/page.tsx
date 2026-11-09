
import Link from 'next/link';
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  Tag,
  Lock,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUserCart } from '@/actions/cart.action';
import { UserCartResponse } from '@/types/responses.type';
import { currencyHandler } from '@/lib/clientUtils';
import CartProductRow from '@/components/Cart/CartProductRow/CartProductRow';
import DeleteCartButton from '@/components/Cart/DeleteCartButton/DeleteCartButton';

export default async function CartPage() {

  const data: UserCartResponse = await getUserCart();


  return (
    <div className="w-full min-h-screen bg-gray-50/40 pb-16">

      {/* 1. BREADCRUMBS NAVIGATION (Image 1) */}
      <nav className="max-w-350 mx-auto px-6 py-4 flex items-center gap-1.5 text-xs font-medium text-gray-500">
        <a href="/" className="hover:text-primary-dark">Home</a>
        <span>/</span>
        <span className="text-gray-900 font-semibold">Shopping Cart</span>
      </nav>

      {/* 2. HEADER BLOCK SUMMARY TITLE PANEL */}
      <header className="max-w-350 mx-auto px-6 mb-6 flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-dark rounded-xl flex items-center justify-center text-white shadow-xs">
            <ShoppingCart className="h-5 w-5 fill-current" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Shopping Cart</h1>
        </div>
        <p className="text-xs font-semibold text-gray-500 ml-1">
          You have <span className="text-primary-dark font-bold">{data.numOfCartItems} items</span> in your cart
        </p>
      </header>

      {/* MAIN TWO-COLUMN SPLIT CONTAINER WORKSPACE */}
      <main className="max-w-350 mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT COMPONENT: CART PRODUCTS RENDER LISTING NODE */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {data.data.products.length === 0 ? (
            <div className="bg-white border rounded-2xl p-12 text-center text-gray-400 font-medium">
              Your shopping cart is currently empty.
            </div>
          ) : (
            <>
              {data.data.products.map((item) => (
                item.count > 0 ?
                  <CartProductRow key={item.product._id} cartItem={item} /> : ""
              ))}

            </>
          )}
          {/* BOTTOM CONTROL ACTIONS PANEL (Image 2) */}
          <div className="flex items-center justify-between mt-2 px-1 text-xs md:text-sm">
            <Link href="/products" className="flex items-center gap-1.5 font-bold text-primary-dark hover:text-primary-dark transition-colors">
              <ArrowLeft className="h-4 w-4" /> Continue Shopping
            </Link>
            {data.numOfCartItems > 0 && <DeleteCartButton />}
          </div>
        </div>

        {/* RIGHT COMPONENT: HIGH-PRIORITY PERSISTENT STICKY CHECKOUT SUMMARY (Image 1 & 2) */}
        <div className="lg:col-span-4 lg:sticky lg:top-50 lg:self-start w-full flex flex-col gap-4 ">

          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm ">
            {/* Primary Heading Bar Banner Panel Container */}
            <div className="bg-primary-dark text-white p-5 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm font-bold">
                <Lock className="h-4 w-4" /> Order Summary
              </div>
              <span className="text-xs opacity-90 font-medium">{data.data.products.length > 0 ? data.numOfCartItems : 0} items in your cart</span>
            </div>

            {/* Inner parameters table detail lists body */}
            <div className="p-5 flex flex-col gap-5">
              {/* Free delivery qualification progress badge metric bar */}
              <div className="bg-[#f4fbf9] border border-primary-50 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-dark flex items-center justify-center shrink-0">
                  <Truck className="h-4 w-4" />
                </div>
                <div className="flex flex-col text-xs leading-tight">
                  <span className="font-bold text-gray-900">Free Shipping!</span>
                  <span className="text-gray-500 font-medium mt-0.5">You qualify for free delivery</span>
                </div>
              </div>

              {/* Transaction billing list points metrics row stack */}
              <div className="flex flex-col gap-3 font-medium text-gray-600 text-xs md:text-sm">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">{currencyHandler(data.data.totalCartPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="font-bold text-primary-dark uppercase tracking-wider text-xs">FREE</span>
                  {/* <span className="font-bold tracking-wider text-xs">Depends on the address</span> */}
                </div>

                <div className="flex justify-between items-center text-sm md:text-base border-t border-gray-100 pt-3 mt-1">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-xl font-black text-gray-900 tracking-tight">{currencyHandler(data.data.totalCartPrice)}</span>
                </div>
              </div>

              {/* Promo code interaction line shortcut field block */}
              <Button
                variant="outline"
                className="w-full h-11 border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Tag className="h-4 w-4 text-gray-400" /> Apply Promo Code
              </Button>

              {/* Core checkout transaction confirmation call to action element */}
              <Link href={'/checkout'}>
              <Button 
                className=" w-full h-12 bg-primary-dark hover:bg-primary-dark  text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                disabled={data.data.products.length === 0}
                >
                <Lock className="h-4 w-4" /> Secure Checkout
              </Button>
                </Link>
            </div>
            {/* Verification fast badges footers summary row block */}
            <div className="flex items-center justify-center gap-6 text-[10px] text-gray-400 font-semibold px-2">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Secure Payment</span>
              <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-primary" /> Fast Delivery</span>
            </div>

            <div className='flex justify-center py-5'>

              <Link href="/products" className="text-center text-xs font-bold text-gray-400 hover:text-primary-dark transition-colors mt-1 ">
                ← Continue Shopping
              </Link>
            </div>
          </div>


        </div>

      </main>

    </div>
  );
}
