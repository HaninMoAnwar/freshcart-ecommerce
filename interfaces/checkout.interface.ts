import { User } from "next-auth"
import { ShippingAddress } from "./orders.interface"
import { CartProduct } from "./cart.interface"

export interface OnlineCheckout {
    status: string
    session: Session
    message?:string
}

export interface Session {
    url: string
    success_url: string
    cancel_url: string
}



export interface CashCheckout {
  status: string
  message: string
  user: User
  pricing: Pricing
  data: Data
}


export interface Pricing {
  cartPrice: number
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
}

export interface Data {
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
