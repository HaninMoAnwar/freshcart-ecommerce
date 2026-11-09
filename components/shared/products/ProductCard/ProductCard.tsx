"use client"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import Image from 'next/image';
import { Eye, Heart, Plus, RotateCcw, Star } from 'lucide-react';
import { currencyHandler, salePrecentageHandler } from '@/lib/clientUtils';
import { Products } from "@/interfaces/products.interface";
import Link from "next/link";
import { addToCart } from "@/actions/cart.action";
import { toast } from "@/components/ui/toast";
import { useCart } from "@/context/cartContext";

interface ProductCardProps {
    productItem: Products;

}
export default function ProductCard({ productItem }: ProductCardProps) {
    const { updateNumOfCartItems } = useCart();
    async function handleAddToCart() {

        const { status, message, numOfCartItems } = await addToCart(productItem._id);


        if (status === "success") {
            toast.add({
                title: message,
                type: "success"
            })
            updateNumOfCartItems(numOfCartItems);
        }
        else {
            toast.add({
                title: message,
                type: "error"
            })
        }

    }
    return (

        <Card key={productItem._id} className="relative mx-auto w-full max-w-sm max-h-fit pt-0 hover:scale-102 hover:shadow-md transition-all">
            <div className="absolute inset-0 z-30 aspect-square  " />
            <Image width={400} height={400}
                src={productItem.imageCover}
                alt={productItem.title}
                className="relative z-20  w-full object-cover aspect-square"
            />
            <Heart size={38} className='absolute z-30 top-2 right-5 bg-gray-100 rounded-full p-2 hover:text-red-500 hover:scale-102' />
            <RotateCcw size={38} className='absolute z-30 top-14 right-5 bg-gray-100 rounded-full p-2 hover:text-green-500 hover:scale-102' />
            <Eye size={38} className='absolute z-30 top-26 right-5 bg-gray-100 rounded-full p-2 hover:text-green-500 hover:scale-102' />
            {productItem.priceAfterDiscount &&
                <span className='absolute z-30 top-2 left-5 bg-red-600 text-white px-3 rounded-lg'>{salePrecentageHandler(productItem.price, productItem.priceAfterDiscount)}%</span>
            }
            <Link href={`/products/${productItem._id}`}>
                <CardHeader>
                    <CardTitle className='truncate'>{productItem.title}</CardTitle>
                    <CardDescription className='truncate'>
                        {productItem.description}
                    </CardDescription>
                    <CardDescription className='flex justify-between items-center'>
                        <div className="flex justify-start items-center">
                            {[...Array(5)].map((_, i) => <Star key={i} fill={`${productItem.ratingsAverage > i ? "#FDC700" : "none"}`} className='text-[#FDC700]' />
                            )}
                        </div>
                        <div>
                            <p className=''>{productItem.ratingsAverage}({productItem.ratingsQuantity})</p>
                        </div>

                    </CardDescription>
                </CardHeader>
            </Link>
            <CardFooter className='flex justify-between items-center '>
                <div className='flex gap-2 flex-wrap'>
                    {productItem.priceAfterDiscount && <p className={`text-lg font-bold text-primary-dark`}>{currencyHandler(productItem.priceAfterDiscount)}</p>}
                    <p className={`text-lg font-bold  ${productItem.priceAfterDiscount ? "line-through text-gray-500" : ""}`}>{currencyHandler(productItem.price)}</p>

                </div>
                <Button onClick={handleAddToCart} size="lg" className="rounded-full">
                    <Plus />
                </Button>
            </CardFooter>
        </Card>
    )
}
