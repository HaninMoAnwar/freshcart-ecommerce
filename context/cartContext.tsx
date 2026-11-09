"use client"

import { getUserCart } from "@/actions/cart.action";
import { CartResponse } from "@/interfaces/cart.interface";
import React, { createContext, useContext, useState } from "react"

interface cartContextType {
  numOfCartItems: number,
  updateNumOfCartItems(numOfCartItems: number): void,
  cartId: string,
  updateCartId(cartId: string): void,
  cartInfo: CartResponse | undefined,
  updateCartInfo(cartInfo: CartResponse | undefined): void,

}
const cartContext = createContext<cartContextType | undefined>(undefined);


interface CartProviderProps {
  children: React.ReactNode
}
export default function CartProvider({ children }: CartProviderProps) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState("");
  const [cartInfo, setCartInfo] = useState<CartResponse | undefined>(undefined);

  function updateCartId(cartId: string){
    setCartId(cartId);
  }
  function updateNumOfCartItems(numOfCartItems:number){
    setNumOfCartItems(numOfCartItems);
  }
  function updateCartInfo(CartInfo: CartResponse){
    setCartInfo(CartInfo);
  }
  return (
    <cartContext.Provider value={{ numOfCartItems, updateNumOfCartItems,cartId,updateCartId,updateCartInfo,cartInfo }}>
      {children}
    </cartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
