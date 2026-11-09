"use client"

import { Brands } from "@/interfaces/brands.interface";
import { createContext, ReactNode, useContext, useState } from "react";

interface brandsContextType {
  allBrands: Brands[] | undefined,
  setAllBrands: React.Dispatch<React.SetStateAction<Brands[] | undefined>>;

}
const brandsContext = createContext<brandsContextType | undefined>(undefined);

interface brandsProviderProps {
  children: ReactNode
}
export default function BrandsProvider({ children }: brandsProviderProps) {
  const [allBrands, setAllBrands] = useState<Brands[] | undefined>(undefined);


  return (
    <brandsContext.Provider value={{ allBrands, setAllBrands }}>
      {children}
    </brandsContext.Provider>
  )
}

export function useBrands() {
  const context = useContext(brandsContext);
  if (!context) {
    throw new Error("useBrands must be used within a brandsProvider");
  }
  return context;
}