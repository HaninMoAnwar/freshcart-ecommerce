import { DetailedSubcategory } from "@/interfaces/categories"
import { ArrowRight, FolderOpen } from "lucide-react"
import Link from "next/link"

interface SubcategoryCardProps {
    subcategoryItem: DetailedSubcategory
}
export default function SubcategoryCard({ subcategoryItem }: SubcategoryCardProps) {


    return (
        <>

            <Link href={`/products/?subcategory=${subcategoryItem._id}`} className="overflow-hidden group flex flex-col justify-start border py-8 px-5 rounded-lg hover:scale-102 hover:shadow-md transition-all">
                <FolderOpen size={60} fill="#079447" className="text-white bg-primary-50 p-2 rounded-lg " />
                <p className='group-hover:text-primary-dark font-bold'>{subcategoryItem.name}</p>
                <div

                    className="absolute bottom-3 opacity-0 translate-y-8 transition-all  group-hover:opacity-100 group-hover:translate-y-0 duration-200 flex items-center gap-1.5 text-primary-dark font-bold text-xs "
                >
                    Browse Products
                    <ArrowRight className="h-3.5 w-3.5" />
                </div>
            </Link>
        </>
    )
}
