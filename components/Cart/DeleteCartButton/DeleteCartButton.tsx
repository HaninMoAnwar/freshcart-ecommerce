"use client"
import { deleteCart } from "@/actions/cart.action";
import { toast } from "@/components/ui/toast";
import { Trash2 } from "lucide-react";

export default function DeleteCartButton() {
    async function clearCartHandler() {
        const { status, message } = await deleteCart();
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
        <button
            onClick={clearCartHandler}
            className="flex items-center gap-1.5 font-bold text-gray-400 hover:text-rose-500 transition-colors cursor-pointer"
        >
            <Trash2 className="h-4 w-4" /> Clear all items
        </button>
    )
}
