import { Cart, CartResponse } from '@/interfaces/cart.interface';
import { DetailedSubcategory } from './../interfaces/categories';
import { Brands } from "@/interfaces/brands.interface";
import { DetailedCategory } from "@/interfaces/categories";
import { ListResponse } from "@/interfaces/ListingResponse";
import { SingleProduct, Products } from "@/interfaces/products.interface";
import { CashCheckout, OnlineCheckout } from '@/interfaces/checkout.interface';
import { Orders } from '@/interfaces/orders.interface';

export type CategoriesResponse = ListResponse<DetailedCategory>;
export type SubcategoryResponse = ListResponse<DetailedSubcategory>;
export type ProductsResponse = ListResponse<Products>;
export type BrandsResponse = ListResponse<Brands>;
export type UserCartResponse = CartResponse;
export type SingleProductResponse = SingleProduct;

export type OrdersResponse = Orders[]
export type OnlineCheckoutResponse = OnlineCheckout;
export type CashCheckoutResponse = CashCheckout;
