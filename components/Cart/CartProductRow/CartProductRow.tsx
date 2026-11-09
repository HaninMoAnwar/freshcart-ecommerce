"use client"
import { deleteProductFromCart, updateCartProductQnt } from "@/actions/cart.action"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { CartProduct } from "@/interfaces/cart.interface"
import { currencyHandler } from "@/lib/clientUtils"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { title } from "process"
import { useState } from "react"
interface CartProductRowProps {
    cartItem: CartProduct
}
export default function CartProductRow({ cartItem }: CartProductRowProps) {
    const [quantity, setQuantity] = useState(cartItem.count);

    async function updateQntHandler(quantity: number) {
        setQuantity(quantity);

        const { status, message } = await updateCartProductQnt(cartItem.product._id, quantity);
        if (status === "success") {
            toast.add({ type: "success", title: message })
        }
        else {
            toast.add({
                title: message,
                type: "error"
            })
        }
    }
    async function removeProductHandler() {

        const { status, message } = await deleteProductFromCart(cartItem.product._id);
        if (status === "success") {
            toast.add({ type: "success", title: message })
        }
        else {
            toast.add({
                title: message,
                type: "error"
            })
        }
    }

    return (
        <div
            className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center shadow-2xs group relative"
        >
            {/* Left layout branch: Product visual profile info panel */}
            <div className="flex gap-4 items-center">
                {/* Item Thumbnail Frame layout wrapper */}
                <div className="w-20 h-24 bg-gray-50 rounded-xl border border-gray-100 p-2 flex items-center justify-center shrink-0 relative overflow-hidden">
                    <div className="text-[10px] text-gray-300 font-bold">

                        <Image src={cartItem.product.imageCover} alt={cartItem.product.title} width={100} height={100} />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <h3 className="font-bold text-gray-900 tracking-tight text-base hover:text-primary-dark transition-colors">
                        {cartItem.product.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold tracking-wide uppercase">
                        <span className="text-primary-dark">{cartItem.product.category.name}</span>
                    </div>
                    <div className="text-sm font-bold text-primary-dark mt-0.5">
                        {currencyHandler(cartItem.price)}<span className="text-[10px] text-gray-400 font-medium font-sans"> per unit</span>
                    </div>
                    {cartItem.product.quantity > 0 && (
                        <span className="text-[9px] font-black text-white bg-primary rounded-full px-2 py-0.5 self-start shadow-xs mt-1">
                            ✓ In Stock
                        </span>
                    )}
                </div>
            </div>

            {/* Right layout branch: Incrementor counter controls & absolute aggregate line costs */}
            <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6 md:gap-12 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-gray-50">
                {/* Multiplier Quantity Counter tool segment */}
                <div className="flex items-center border border-gray-200 rounded-xl bg-white p-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQntHandler(quantity - 1)}
                        className="h-8 w-8 rounded-lg cursor-pointer bg-gray-50"
                    >
                        <Minus className="h-3.5 w-3.5 text-gray-600 " />
                    </Button>
                    <span className="w-8 text-center text-sm font-bold text-gray-900">{quantity}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQntHandler(quantity + 1)}
                        className="h-8 w-8 rounded-lg bg-primary hover:bg-primary-dark text-white cursor-pointer"
                    >
                        <Plus className="h-3.5 w-3.5" />
                    </Button>
                </div>

                {/* Aggregate total value summary indicator row group */}
                <div className="flex items-center gap-4">
                    <div className="text-right flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total</span>
                        <span className="text-lg font-black text-gray-900 tracking-tight">
                            {currencyHandler(cartItem.price * quantity)}
                        </span>
                    </div>

                    {/* Explicit Item Removal Trigger Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeProductHandler()}
                        className="h-9 w-9 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 shrink-0 cursor-pointer"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
