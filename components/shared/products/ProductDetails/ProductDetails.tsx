'use client'; // Required for interactivity (Tabs, Quantity Counter, Image Selection)

import React, { useEffect, useState } from 'react';
import {
    Star,
    Heart,
    Share2,
    ShoppingCart,
    Zap,
    Minus,
    Plus,
    Truck,
    RotateCcw,
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
    Eye,
    RefreshCw,
    FileText,
    Link
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { SingleProduct } from '@/interfaces/products.interface';
import { calculateReviewStats, currencyHandler } from '@/lib/clientUtils';
import { getProductsbyCategory } from '@/actions/products.actions';
import { ProductsResponse } from '@/types/responses.type';
import ProductCard from '../ProductCard/ProductCard';
import { toast } from '@/components/ui/toast';
import { addToCart, getUserCart, updateCartProductQnt } from '@/actions/cart.action';
import { useCart } from '@/context/cartContext';

interface ProductDetailsProps {
    productItem: SingleProduct
}



export default function ProductDetails({ productItem }: ProductDetailsProps) {
    // State for image gallery selection
    const [selectedImage, setSelectedImage] = useState(0);

    const { updateNumOfCartItems } = useCart();
    // State for quantity item counter
    const [quantity, setQuantity] = useState(1);

    const [similarProducts, setSimilarProducts] = useState<ProductsResponse>();
    useEffect(() => {
        async function fetchSimilar() {

            const data = await getProductsbyCategory(productItem.category._id);
            setSimilarProducts(data);


        }
        fetchSimilar();
    }, []);

    async function handleAddToCart() {

        const { status, message, numOfCartItems } = await addToCart(productItem._id);
       

        if (status === "success") {
            toast.add({
                title: message,
                type: "success"
            })
            updateNumOfCartItems(numOfCartItems);

            if (quantity > 1) {
                const { status: updateStatus, message: updateMessage } = await updateCartProductQnt(productItem._id, quantity);
                if (updateStatus === "success") {
                    toast.add({
                        title: message,
                        type: "success"
                    })
                }
                else {
                    toast.add({
                        title: updateMessage,
                        type: "error"
                    })
                }
            }
        }
        else {
            toast.add({
                title: message,
                type: "error"
            })
        }

    }
    return (
        <div className="w-full min-h-screen bg-gray-50/30 pb-16">

            {/* 1. BREADCRUMBS NAVIGATION (Image 1) */}
            <nav className="max-w-350 mx-auto px-6 py-4 flex items-center gap-2 text-xs font-medium text-gray-500">
                <a href="/" className="hover:text-emerald-600 flex items-center gap-1">🏠 Home</a>
                <span>&gt;</span>
                <a href={`/categories/${productItem.category._id}`} className="hover:text-emerald-600">{productItem.category.name}</a>
                {productItem.subcategory.map((subcategoryItem) => <React.Fragment key={subcategoryItem._id}>
                    <span>&gt;</span>
                    <a href={`/categories/${subcategoryItem._id}`} className="hover:text-emerald-600">{subcategoryItem.name}</a>
                </React.Fragment>)}
                <span>&gt;</span>
                <span className="text-gray-900 font-semibold">{productItem.title}</span>
            </nav>

            {/* MAIN CONTAINER FOR PRODUCT UPPER BODY */}
            <main className="max-w-350 mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs">

                {/* LEFT COLUMN: IMAGE MULTI-GALLERY VIEW (Image 1 & 2) */}
                <div className="lg:sticky lg:top-6 lg:self-start lg:col-span-5 flex flex-col md:flex-row gap-4">
                    {/* Thumbnails grid list */}
                    <div className="flex md:flex-col gap-2 order-2 md:order-1">
                        {productItem.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`w-20 h-24 rounded-xl border-2 bg-gray-50 overflow-hidden transition-all ${selectedImage === idx ? 'border-emerald-500 shadow-sm' : 'border-gray-200 opacity-80'
                                    }`}
                            >
                                <div className="w-full h-full bg-slate-200" >
                                    <Image src={img} alt={`${idx} image preview`} width={100} height={100} />
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Active viewport preview image display */}
                    <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 p-4 flex items-center justify-center min-h-95 md:min-h-115 order-1 md:order-2">
                        <div className="text-gray-300 font-medium text-sm flex flex-col items-center gap-2">
                            <Image src={productItem.images[selectedImage]} alt='Image Cover' width={800} height={800} />
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: INFORMATION CONTENT & CORE CTA CHECKOUT (Image 1 & 2) */}
                <div className="lg:col-span-7 flex flex-col gap-5">
                    {/* Badges metadata header */}
                    <div className="flex items-center gap-2">
                        <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
                            {productItem.category.name}
                        </span>
                        <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">
                            DeFacto
                        </span>
                    </div>

                    {/* Product main Title */}
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                        {productItem.title}
                    </h1>

                    {/* Reviews Score Counter indicator */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center text-amber-400 gap-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} fill={`${productItem.ratingsAverage > i ? "#FDC700" : "none"}`} className='text-[#FDC700]' />
                            )}
                        </div>
                        <span className="text-sm font-bold text-gray-800">{productItem.ratingsAverage}</span>
                        <span className="text-xs font-medium text-gray-400">({productItem.ratingsQuantity} reviews)</span>
                    </div>

                    {/* Current listing price */}
                    <div className="text-2xl font-black text-gray-900 tracking-tight">
                        {productItem.priceAfterDiscount && <p className={`text-lg font-bold text-primary-dark`}>{currencyHandler(productItem.priceAfterDiscount)}</p>}
                        <p className={`text-lg font-bold  ${productItem.priceAfterDiscount ? "line-through text-gray-500" : ""}`}>{currencyHandler(productItem.price)}</p>
                    </div>

                    {/* Inventory stocking status */}
                    <div className={`flex items-center gap-1.5 text-xs font-bold ${productItem.quantity > 0 ? "text-emerald-600 bg-emerald-50/50 border-emerald-100/50" : "text-red-600 bg-red-50/50 border-red-100/50"}  self-start px-3 py-1 rounded-full border `}>
                        <span className={`w-1.5 h-1.5 rounded-full ${productItem.quantity > 0 ? "bg-emerald-500 " : "bg-red-200"} animate-ping`} />
                        {productItem.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </div>

                    <hr className="border-gray-100 my-1" />

                    {/* Short specifications inline layout */}
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-medium">
                        {productItem.description}
                    </p>

                    {/* Quantity Selector mechanism */}
                    <div className="flex flex-col gap-2 mt-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quantity</label>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-gray-200 rounded-xl bg-white p-1 shadow-2xs">
                                <Button
                                    disabled={productItem.quantity < 1}
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="h-9 w-9 rounded-lg"
                                >
                                    <Minus className="h-4 w-4 text-gray-600" />
                                </Button>
                                <span className="w-12 text-center text-sm font-bold text-gray-900">{productItem.quantity > 0 ? quantity : "0"}</span>
                                <Button
                                    disabled={productItem.quantity < 1}
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setQuantity(Math.min(productItem.quantity, quantity + 1))}
                                    className="h-9 w-9 rounded-lg"
                                >
                                    <Plus className="h-4 w-4 text-gray-600" />
                                </Button>
                            </div>
                            <span className="text-xs font-semibold text-gray-400">{productItem.quantity} pieces available</span>
                        </div>
                    </div>

                    {/* Total aggregate dynamic pricing panel section */}
                    <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-4 flex items-center justify-between mt-2">
                        <span className="text-sm font-bold text-gray-600">Total Price:</span>
                        <span className="text-xl font-black text-emerald-600 tracking-tight">
                            {((productItem.priceAfterDiscount ? productItem.priceAfterDiscount : productItem.price) * quantity).toFixed(2)} EGP
                        </span>
                    </div>

                    {/* Checkout transactional actions (Add to Cart / Buy Now) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <Button onClick={handleAddToCart} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer">
                            <ShoppingCart className="h-5 w-5" /> Add to Cart
                        </Button>
                        <Button className="bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold h-12 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer">
                            <Zap className="h-5 w-5 fill-current" /> Buy Now
                        </Button>
                    </div>

                    {/* Secondary interactions panel group */}
                    <div className="flex items-center gap-3 w-full">
                        <Button variant="outline" className="flex-1 h-11 border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 gap-2 cursor-pointer">
                            <Heart className="h-4 w-4" /> Add to Wishlist
                        </Button>
                        <Button variant="outline" size="icon" className="h-11 w-11 border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 cursor-pointer">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>

                    <hr className="border-gray-100 my-1" />

                    {/* Fast trust metrics tags footer segment */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-gray-500 mt-1">
                        <div className="flex items-center gap-2.5">
                            <Truck className="h-4 w-4 text-emerald-500" />
                            <div>
                                <p className="font-bold text-gray-800">Free Delivery</p>
                                <p className="text-[10px]">Orders over $50</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <RotateCcw className="h-4 w-4 text-emerald-500" />
                            <div>
                                <p className="font-bold text-gray-800">30 Days Return</p>
                                <p className="text-[10px]">Money back guarantee</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <ShieldCheck className="h-4 w-4 text-emerald-500" />
                            <div>
                                <p className="font-bold text-gray-800">Secure Payment</p>
                                <p className="text-[10px]">100% Protected checkout</p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* 2. DESCRIPTION EXTENDED TABS SYSTEMS (Images 3, 4 & 5) */}
            <section className="max-w-350 mx-auto px-6 mt-8">
                <Tabs defaultValue="details" className="w-full bg-white border border-gray-100 rounded-3xl p-6 shadow-2xs">
                    <TabsList className="flex justify-start gap-2 border-b border-gray-100 bg-transparent h-auto p-0 rounded-none mb-6">
                        <TabsTrigger value="details" className="data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-600 border-b-2 border-transparent rounded-none px-4 py-3 font-bold text-sm bg-transparent gap-2">
                            <FileText className="h-4 w-4" /> Product Details
                        </TabsTrigger>
                        <TabsTrigger value="reviews" className="data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-600 border-b-2 border-transparent rounded-none px-4 py-3 font-bold text-sm bg-transparent gap-2">
                            ⭐ Reviews ({productItem.ratingsQuantity})
                        </TabsTrigger>
                        <TabsTrigger value="shipping" className="data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-600 border-b-2 border-transparent rounded-none px-4 py-3 font-bold text-sm bg-transparent gap-2">
                            🚚 Shipping & Returns
                        </TabsTrigger>
                    </TabsList>

                    {/* TAB CONTENT A: PRODUCT DETAILS SPEC SHEET (Image 3) */}
                    <TabsContent value="details" className="flex flex-col gap-6 focus-visible:outline-none">
                        <div>
                            <h4 className="font-extrabold text-gray-900 text-base mb-2">About this Product</h4>
                            <p className="text-sm text-gray-600 font-medium">Material Polyester Blend Color Name Multicolor Department Women</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
                            <div className="flex flex-col gap-3">
                                <h5 className="font-bold text-gray-800 border-b border-gray-100 pb-2 text-sm">Product Information</h5>
                                <div className="flex justify-between text-sm"><span className="text-gray-400">Category</span><span className="font-semibold text-gray-800">{productItem.category.name}</span></div>
                                <div className="flex justify-between text-sm"><span className="text-gray-400">Subcategories</span><span className="font-semibold text-gray-800">
                                    {productItem.subcategory.map((subcategoryItem) => <React.Fragment key={subcategoryItem._id}>
                                        subcategoryItem.name
                                    </React.Fragment>
                                    )}
                                </span></div>
                                <div className="flex justify-between text-sm"><span className="text-gray-400">Brand</span><span className="font-semibold text-gray-800">{productItem.brand.name}</span></div>
                                <div className="flex justify-between text-sm"><span className="text-gray-400">Items Sold</span><span className="font-semibold text-gray-800">{productItem.sold} sold</span></div>
                            </div>
                            <div className="flex flex-col gap-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                                <h5 className="font-bold text-gray-800 text-sm mb-1">Key Features</h5>
                                {['Premium Quality Product', '100% Authentic Guarantee', 'Fast & Secure Packaging', 'Quality Tested'].map((feat, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                                        <span className="text-emerald-500 font-bold">✓</span> {feat}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                    {/* TAB CONTENT B: REVIEWS GRAPH GRID (Image 4) */}
                    <TabsContent value="reviews" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center focus-visible:outline-none">
                        <div className="md:col-span-3 flex flex-col items-center justify-center text-center p-4 border-r border-gray-100">
                            <span className="text-5xl font-black text-gray-900 tracking-tight">{productItem.ratingsAverage}</span>
                            <div className="flex items-center text-amber-400 gap-0.5 my-2">
                                {[...Array(5)].map((_, i) => <Star key={i} fill={`${productItem.ratingsAverage > i ? "#FDC700" : "none"}`} className='text-[#FDC700]' />
                                )}

                            </div>
                            <span className="text-xs text-gray-400 font-medium">Based on {productItem.ratingsQuantity} reviews</span>
                        </div>
                        <div className="md:col-span-9 flex flex-col gap-2.5">
                            {calculateReviewStats(productItem.reviews).map((review) => (
                                <div key={review.stars} className="flex items-center gap-4 text-xs font-semibold text-gray-600">
                                    <span className="w-10 text-right">{review.stars} star</span>
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-400 rounded-full" style={{ width: review.percentage }} />
                                    </div>
                                    <span className="w-10 text-left text-gray-400">{review.percentage}</span>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* TAB CONTENT C: SHIPPING INFORMATION SUMMARY (Image 5) */}
                    <TabsContent value="shipping" className="flex flex-col gap-6 focus-visible:outline-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-2xl p-5 flex flex-col gap-3">
                                <div className="flex items-center gap-2 font-bold text-gray-900 text-sm"><Truck className="h-5 w-5 text-emerald-600" /> Shipping Information</div>
                                <ul className="text-xs md:text-sm text-gray-600 space-y-2 font-medium">
                                    <li>✓ Free shipping on orders over $50</li>
                                    <li>✓ Standard delivery: 3-5 business days</li>
                                    <li>✓ Express delivery available (1-2 business days)</li>
                                    <li>✓ Track your order in real-time</li>
                                </ul>
                            </div>
                            <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-2xl p-5 flex flex-col gap-3">
                                <div className="flex items-center gap-2 font-bold text-gray-900 text-sm"><RotateCcw className="h-5 w-5 text-emerald-600" /> Returns & Refunds</div>
                                <ul className="text-xs md:text-sm text-gray-600 space-y-2 font-medium">
                                    <li>✓ 30-day hassle-free returns</li>
                                    <li>✓ Full refund or exchange available</li>
                                    <li>✓ Free return shipping on defective items</li>
                                    <li>✓ Easy online return process</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 shrink-0 font-bold">🛡️</div>
                            <div className="flex flex-col gap-0.5 text-xs md:text-sm">
                                <span className="font-bold text-gray-800">Buyer Protection Guarantee</span>
                                <span className="text-gray-500 font-medium">Get a full refund if your order doesn't arrive or isn't as described. We ensure your shopping experience is safe and secure.</span>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </section>

            {/* 3. RELATED PRODUCTS RECOMMENDATIONS SLIDER (Image 6) */}
            <section className="max-w-350 mx-auto px-6 mt-12 flex flex-col gap-6">

                <h2 className="section-header text-2xl ml-4 font-bold ">You May Also <span className="text-primary-dark">Like</span></h2>

                {/* Carousel grid items */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {similarProducts && similarProducts.data.slice(0, 5).map((prod) =>
                        <ProductCard key={prod._id} productItem={prod} />
                    )
                    }
                </div>
            </section>

        </div>
    );
}
