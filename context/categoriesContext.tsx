"use client"
import { DetailedCategory, DetailedSubcategory } from "@/interfaces/categories";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface categoriesContextType {
  allCategories: DetailedCategory[] | undefined,
  setAllCategories: React.Dispatch<React.SetStateAction<DetailedCategory[] | undefined>>;
  allSubcategories: DetailedSubcategory[] | undefined,
  setAllSubcategories: React.Dispatch<React.SetStateAction<DetailedSubcategory[] | undefined>>;

}
const categoriesContext = createContext<categoriesContextType | undefined>(undefined);

interface CategoriesProviderProps {
  children: ReactNode
}
export default function CategoriesProvider({ children }: CategoriesProviderProps) {
  const [allCategories, setAllCategories] = useState<DetailedCategory[] | undefined>(undefined);
  const [allSubcategories, setAllSubcategories] = useState<DetailedSubcategory[] | undefined>(undefined);


  return (
    <categoriesContext.Provider value={{ allCategories, setAllCategories, allSubcategories, setAllSubcategories }}>
      {children}
    </categoriesContext.Provider>
  )
}

export function useCategories() {
  const context = useContext(categoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
}