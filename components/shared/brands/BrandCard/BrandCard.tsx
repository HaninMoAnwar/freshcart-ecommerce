import { Brands } from '@/interfaces/brands.interface'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface BrandCardProps {
    brand: Brands
}
export default function BrandCard({ brand }: BrandCardProps) {

    return (

        <Link href={`/products/?brand=${brand._id}`} className="overflow-hidden group flex flex-col justify-start text-center border py-7 px-10 rounded-lg hover:scale-102 hover:shadow-md transition-all">
            <Image src={brand.image} alt={brand.name} width={400} height={200} className="object-cover rounded-lg m-auto" />
            <p className='group-hover:text-purple-600'>{brand.name}</p>
            <div
                
                className="absolute bottom-3 opacity-0 translate-y-8 transition-all  group-hover:opacity-100 group-hover:translate-y-0 duration-200 flex items-center gap-1.5 text-purple-600 font-bold text-xs "
            >
                View Products
                <ArrowRight className="h-3.5 w-3.5" />
            </div>
        </Link>


    )
}
