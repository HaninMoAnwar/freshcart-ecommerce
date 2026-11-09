"use client"
import BrandsProvider from '@/context/brandsContext'
import CartProvider from '@/context/cartContext'
import CategoriesProvider from '@/context/categoriesContext'
import { SessionProvider } from 'next-auth/react'

interface ProvidersProps {
    children: React.ReactNode
}
export default function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <BrandsProvider>
                <CategoriesProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </CategoriesProvider>
            </BrandsProvider>
        </SessionProvider>
    )
}
