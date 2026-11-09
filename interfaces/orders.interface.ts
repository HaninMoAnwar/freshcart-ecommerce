import { User } from "next-auth"
import { CartProduct } from "./cart.interface"

export interface Orders {
    shippingAddress: ShippingAddress
    taxPrice: number
    shippingPrice: number
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    isDelivered: boolean
    _id: string
    user: User
    cartItems: CartProduct[]
    createdAt: string
    updatedAt: string
    id: number
    __v: number
}

export interface ShippingAddress {
    details: string
    phone: string
    city: string
    postalCode?: string
}

