import { Brand } from "./brands.interface"
import { Category, Subcategory } from "./categories"

export interface Products {
  sold: number
  images: string[]
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: string[]
}


export interface SingleProduct extends Products {
  reviews: Review[]
}

export interface Review {
  _id: string
  review: string
  rating: number
  product: string
  user: User
  createdAt: string
  updatedAt: string
  __v: number
}

export interface User {
  _id: string
  name: string
}


