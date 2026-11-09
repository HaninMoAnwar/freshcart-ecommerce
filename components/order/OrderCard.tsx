"use client"
import { Orders } from '@/interfaces/orders.interface'
import { useState } from 'react'
import {
    Package,
    ShoppingBag,
    Calendar,
    MapPin,
    ChevronDown,
    Clock,
    Eye,
    MapPinned,
    Phone,
    FileText,
    Banknote,
    CreditCard,
    CheckCheck
} from 'lucide-react';
import Image from 'next/image';
import { currencyHandler } from '@/lib/clientUtils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '../ui/button';

export default function OrderCard({ order }: { order: Orders }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full bg-white border border-gray-100 rounded-3xl p-5 md:p-6 shadow-2xs transition-all duration-300 hover:shadow-xs my-5"
        >

            {/* ================= HEADER SECTION PANEL (Always Visible) ================= */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ">

                {/* Left information cluster group */}
                <div className="flex gap-4 items-center">
                    {/* Main Shawl Colorful thumbnail vector box preview */}
                    <div className="w-16 h-20 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                        <Image src={order.cartItems[0].product.imageCover} alt={order.cartItems[0].product.title} height={100} width={100} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        {!order.isDelivered && <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border self-start flex items-center gap-1.5 bg-amber-50 text-amber-600 border-amber-100`}>
                            <Clock className="h-3 w-3 stroke-[2.5]" />
                            Pending
                        </span>}
                        {order.isPaid && <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border self-start flex items-center gap-1.5 bg-blue-50 text-blue-600 border-blue-100`}>
                            <CheckCheck className="h-3 w-3 stroke-[2.5]" />
                            Paid
                        </span>}
                        {order.isDelivered && <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border self-start flex items-center gap-1.5 bg-primary-50 text-primary-dark border-primary`}>
                            <Clock className="h-3 w-3 stroke-[2.5]" />
                            Delivered
                        </span>}
                        <h3 className="text-base font-black text-gray-900 tracking-tight">
                            # {order.id}
                        </h3>

                        {/* Meta inline values list stacked row */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 font-medium">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5 text-gray-300" />
                                <span>{order.createdAt}</span>
                            </div>
                            <span className="opacity-30">|</span>
                            <div className="flex items-center gap-1">
                                <Package className="h-3.5 w-3.5 text-gray-300" />
                                <span>{order.cartItems.length} items</span>
                            </div>
                            <span className="opacity-30">|</span>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-gray-300" />
                                <span className="capitalize">{order.shippingAddress.city}</span>
                            </div>
                        </div>

                        {/* Total money price layout */}
                        <div className="text-lg font-black text-gray-900 tracking-tight mt-1">
                            {currencyHandler(order.totalOrderPrice)}
                        </div>
                    </div>
                </div>

                <div className='flex flex-col justify-between items-center gap-15'>
                    {order.paymentMethodType === "cash" ? <Banknote size={40} className='bg-gray-100 p-2 rounded-lg'/> : <CreditCard size={40} className='bg-gray-100 p-2 rounded-lg'/>}
                    {/* Right Action Trigger Box: The whole card control switcher styled to look exact */}
                    <CollapsibleTrigger>
                        <div
                            className={`font-bold text-xs h-10 px-5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${isOpen
                                ? 'bg-primary hover:bg-primary-dark text-white'
                                : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 shadow-2xs'
                                }`}
                        >
                            {isOpen ? 'Hide' : 'Details'}
                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </CollapsibleTrigger>
                </div>

            </div>

            {/* ================= DROPMENU CONTENT AREA (Image Segment Look) ================= */}
            <CollapsibleContent className="w-full mt-6 pt-6 py-5 border-t border-gray-100 flex flex-col gap-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">

                {/* Subheader: Order Items Label banner */}
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <Clock className="h-4 w-4 text-primary stroke-[2.5]" />
                    Order Items
                </div>

                {/* Individual items breakdown table listings */}
                <div className="flex flex-col gap-3">
                    {order.cartItems.map((item) => (
                        <div key={item.product._id} className="w-full bg-gray-50/40 border border-gray-100/50 rounded-2xl p-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3.5">
                                <div className="w-12 h-14 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                                    <Image src={item.product.imageCover} alt={item.product.title} height={100} width={100} />

                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-bold text-gray-800 tracking-tight">{item.product.title}</span>
                                    <span className="text-xs text-gray-400 font-semibold">{item.count} × {currencyHandler(item.price)}</span>
                                </div>
                            </div>
                            <div className="text-right flex flex-col">
                                <span className="text-base font-black text-gray-900 tracking-tight">{currencyHandler(item.price)}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Layout Row Split: Delivery Address & Financial Order Summary totals */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">

                    {/* Sub-panel 1: Delivery Location Credentials */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            <MapPinned className="h-4 w-4 text-primary" /> Delivery Address
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-2.5 text-sm font-medium text-gray-700">
                            <span className="font-extrabold text-gray-900 text-base">{order.shippingAddress.city}</span>
                            <span className="text-gray-500 text-xs">{order.shippingAddress.details}</span>
                            <div className="flex items-center gap-2 text-xs text-gray-400 pt-1 mt-1 border-t border-gray-50">
                                <Phone className="h-3.5 w-3.5" /> {order.shippingAddress.phone}
                            </div>
                        </div>
                    </div>

                    {/* Sub-panel 2: Order summary financial card board layout exact matches color fill */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            <FileText className="h-4 w-4 text-primary" /> Order Summary
                        </div>
                        <div className="bg-[#fef9e7] border border-amber-100/50 rounded-2xl p-5 flex flex-col gap-3.5 text-xs md:text-sm font-medium text-gray-600">
                            <div className="flex justify-between items-center">
                                <span>Subtotal</span>
                                <span className="font-bold text-gray-900">{currencyHandler(order.totalOrderPrice)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Shipping</span>
                                <span className="font-extrabold text-primary uppercase text-xs tracking-wider">Free</span>
                            </div>
                            <div className="flex justify-between items-center text-sm md:text-base border-t border-amber-200/40 pt-3 mt-1">
                                <span className="font-black text-gray-900">Total</span>
                                <span className="text-lg font-black text-gray-900 tracking-tight">{currencyHandler(order.totalOrderPrice)}</span>
                            </div>
                        </div>
                    </div>

                </div>

            </CollapsibleContent>
        </Collapsible>
    )
}
