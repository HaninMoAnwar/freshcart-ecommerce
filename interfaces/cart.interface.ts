import { Brand } from "./brands.interface"
import { Products } from "./products.interface"

export interface CartResponse {
    status: string,
    message: string,
    numOfCartItems: number,
    cartId: string,
    data: Cart
}

export interface Cart {
    _id: string
    cartOwner: string
    products: CartProduct[]
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
}

export interface CartProduct {
    count: number
    _id: string
    product: Omit<Products,
        "sold"
        | "images"
        | "description"
        | "price"
        | "createdAt"
        | "updatedAt"
        | "priceAfterDiscount"
        | "availableColors"

    >
    price: number
}



