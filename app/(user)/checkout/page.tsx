'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    CheckSquare,
    CreditCard,
    Truck,
    ShoppingBag,
    Home,
    ShieldAlert,
    Banknote,
    ShieldHalfIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Controller, useForm } from 'react-hook-form';
import { shippingInfoFormDefaultVal, shippingInfoFormSchema, shippingInfoSchema } from '@/app/schema/shippingInfo.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/toast';
import { cashCheckoutHandler, onlineCheckoutHandler } from '@/actions/checkout.action';
import { useCart } from '@/context/cartContext';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { currencyHandler } from '@/lib/clientUtils';
import Image from 'next/image';
import { CashCheckoutResponse, OnlineCheckoutResponse } from '@/types/responses.type';

export default function CheckoutPage() {
    const { control, handleSubmit } = useForm<shippingInfoFormSchema>({
        defaultValues: shippingInfoFormDefaultVal,
        resolver: zodResolver(shippingInfoSchema)

    });
    const router = useRouter();
    const { cartId, cartInfo, updateNumOfCartItems, updateCartId, updateCartInfo } = useCart();
    // Payment dynamic method tracking state variable
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash');


    async function onSubmit(formValues: shippingInfoFormSchema) {
        if (paymentMethod === "cash") {

            const { status, message }: CashCheckoutResponse = await cashCheckoutHandler(cartId, formValues);
            if (status === "success") {
                toast.add({ type: "success", title: "Your order is confirmed" });
                updateNumOfCartItems(0);
                updateCartId("");
                updateCartInfo(undefined);
                router.push('/allorders');
            } else {
                toast.add({ type: "error", title: message || "Something went wrong please try again" })

            }
        }
        else {
            const data: OnlineCheckoutResponse = await onlineCheckoutHandler(cartId, formValues);

            if (data.status === "success") {
                updateNumOfCartItems(0);
                updateCartId("");
                updateCartInfo(undefined);
                router.push(`${data.session.url}`);
            } else {
                toast.add({ type: "error", title: data.message })

            }
        }

    }


    return (
        <div className="w-full min-h-screen bg-gray-50/40 pb-20">
            <nav className="max-w-350 mx-auto px-6 py-4 flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <a href="/" className="hover:text-primary-dark">Home</a>
                <span>/</span>
                <a href="/cart" className="font-semibold">Shopping Cart</a>
                <span>/</span>
                <span className="text-gray-900 font-semibold">Checkout</span>
            </nav>
            {/* HEADER SECTION PANEL (Image 1) */}
            <header className="max-w-350 mx-auto px-6 pt-8 pb-4 flex items-center justify-between border-b border-gray-100 bg-white lg:bg-transparent">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-dark rounded-xl flex items-center justify-center text-white shadow-xs">
                        <CheckSquare className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Complete Your Order</h1>
                        <p className="text-xs font-semibold text-gray-400 mt-0.5">Review your items and complete your purchase</p>
                    </div>
                </div>

                <Link href="/cart" className="flex items-center gap-1.5 text-xs font-bold text-primary-dark hover:text-emerald-700 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Cart
                </Link>
            </header>

            {/* CORE WORKSPACE CONTENT DIVISION */}
            <main className="max-w-350 mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">

                {/* LEFT BLOCK: INPUT FORM FLOW SECTIONS (Takes 8 columns) */}
                <form id='form-checkout' className='lg:col-span-8  w-full mx-auto ' onSubmit={handleSubmit(onSubmit)}>
                    <section className='bg-white rounded-3xl overflow-hidden'>
                        <header className='text-xl font-bold p-5 flex justify-start gap-2 bg-primary-dark text-white'>
                            <Home />
                            <h1 className=''>
                                Shipping Address
                            </h1>
                        </header>

                        <div className='bg-blue-200/50 py-5 px-2 m-5 flex justify-start items-center gap-2 w-lg rounded-3xl text-sm'>
                            <ShieldAlert size={40} className='text-blue-600' />
                            <div>
                                <h3 className='text-blue-600 w-full'>
                                    Delivery Information
                                </h3>
                                <span className='text-blue-400'>
                                    Please ensure your address is accurate for smooth delivery
                                </span>
                            </div>

                        </div>
                        <FieldGroup className='px-6 my-5 py-5'>
                            <Controller
                                name="city"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="city">
                                            City
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="text"
                                            id="city"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="e.g. Cairo, Alexandria, Giza"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="details"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="details">
                                            Address Details
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="text"
                                            id="details"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Street name, building number, floor, apartment..."
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="phone">
                                            Phone Number
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="text"
                                            id="phone"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="01xxxxxxxxx"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                        </FieldGroup>
                    </section>
                    <section className='bg-white mt-8 rounded-3xl overflow-hidden'>

                        <header className='text-xl font-bold p-5 flex justify-start gap-2 bg-primary-dark text-white'>
                            <Home />
                            <h1 className=''>
                                Shipping Address
                            </h1>
                        </header>

                        <RadioGroup defaultValue="cash" onValueChange={(value) => setPaymentMethod(value)} className={"py-2 px-5"}>
                            <div className={`flex items-center justify-between gap-3 py-5 px-2 rounded-2xl border-2 ${paymentMethod === "cash" ? "bg-primary-50 border-primary-dark" : "bg-gray-200 border-gray-100 hover:border-primary"} `}>
                                <div className='flex justify-start gap-2'>
                                    <Banknote size={60} className={` text-white p-2 rounded-2xl ${paymentMethod === "cash" ? "bg-primary " : "bg-gray-300"}`} />
                                    <Label htmlFor="cash" className='text-lg'>Cash on Delivery</Label>
                                </div>
                                <Controller
                                    name="paymentMethod"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <RadioGroupItem {...field} data-invalid={fieldState.invalid} value="cash" id="cash" className={`${paymentMethod === "cash" ? "" : "bg-white"}`} />
                                    )} />
                            </div>

                            <div className={`flex items-center justify-between gap-3 py-5 px-2 rounded-2xl border-2 ${paymentMethod === "online" ? "bg-primary-50 border-primary-dark" : "bg-gray-200 border-gray-100 hover:border-primary"} `}>
                                <div className='flex justify-start gap-2'>
                                    <CreditCard size={60} className={` text-white p-2 rounded-2xl ${paymentMethod === "online" ? "bg-primary " : "bg-gray-300"}`} />
                                    <Label htmlFor="online" className='text-lg'>Pay Online</Label>
                                </div>
                                <Controller
                                    name="paymentMethod"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <RadioGroupItem {...field} data-invalid={fieldState.invalid} value="online" id="online" className={`${paymentMethod === "online" ? "" : "bg-white"}`} />
                                    )} />

                            </div>
                            <div className='bg-primary-50 py-5 px-2  flex justify-start items-center gap-2 w-full rounded-3xl text-sm'>
                                <ShieldHalfIcon size={30} className='text-primary-dark' />
                                <div>
                                    <h3 className='text-primary w-full'>
                                        Secure & Encrypted
                                    </h3>
                                    <span className='text-primary'>
                                        Your payment info is protected with 256-bit SSL encryption

                                    </span>
                                </div>
                            </div>
                        </RadioGroup>
                    </section>
                </form>


                {/* RIGHT BLOCK: PERSISTENT STICKY ORDER SUMMARY (Takes 4 columns) */}
                {cartInfo &&
                    <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start w-full">
                        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm p-5 flex flex-col gap-5">

                            <div className="-mx-5 -mt-5 bg-primary-dark text-white p-5 flex flex-col gap-0.5">
                                <h2 className="text-sm font-bold flex items-center gap-2">
                                    🛍️ Order Summary
                                </h2>
                                <span className="text-xs opacity-90 font-medium">{cartInfo.numOfCartItems} items</span>
                            </div>

                            {/* Product Mini Row Items Loop Stack Layout */}
                            <div className="flex flex-col gap-3 border-b border-gray-100 pb-4">
                                {cartInfo.data.products.map((item) => (
                                    <div key={item.product._id} className="flex justify-between items-center bg-gray-50/50 p-3 rounded-2xl border border-gray-100/50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-12 bg-white rounded-lg border border-gray-100 flex items-center justify-center font-bold text-[10px] text-gray-300 shrink-0">
                                                <Image src={item.product.imageCover} alt={item.product.title} width={100} height={100} />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-xs font-bold text-gray-900 truncate max-w-30">{item.product.title}</span>
                                                <span className="text-[10px] font-semibold text-gray-400">{item.count} × {currencyHandler(item.price)}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs font-black text-gray-900">{currencyHandler(item.price * item.count)}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Aggregates Financial Metrics Table Rows */}
                            <div className="flex flex-col gap-3 font-medium text-xs md:text-sm text-gray-500">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-gray-900">{currencyHandler(cartInfo.data.totalCartPrice)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> Shipping</span>
                                    <span className="font-extrabold text-primary-dark uppercase text-xs tracking-wider">FREE</span>
                                </div>

                                <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-3 mt-1">
                                    <span className="font-bold text-gray-900">Total</span>
                                    <span className="text-xl font-black text-primary-dark tracking-tight">{currencyHandler(cartInfo.data.totalCartPrice)}</span>
                                </div>
                            </div>

                            {/* Checkout Placement Confirmation Action Call Button */}
                            <Button
                                type="submit"
                                form="form-checkout"

                                className="w-full h-12 bg-primary-dark hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all mt-2"
                            >
                                <ShoppingBag className="h-4 w-4" /> Place Order
                            </Button>

                        </div>
                    </aside>
                }

            </main>
        </div>
    );
}
