import { getAllCategories } from '@/actions/categories.action';
import { PagesHero } from '@/components/shared/PagesHero/PagesHero'
import { CategoriesResponse } from '@/types/responses.type';
import { ArrowRight, Layers } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Categories() {
    const CategoriesData: CategoriesResponse = await getAllCategories();
    const HeroInfo = {
        title: "All Categories",
        subtitle: "Browse our wide range of product categories",
        Icon: "layers",
        mainColor: "bg-primary",
        shapesColor: "bg-emerald-400/10"
    }
    return (
        <>
            <PagesHero pageInfo={HeroInfo} />

            <section className="py-20 bg-white w-full m-auto px-6" >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-5">
                    {CategoriesData.data.map((categoryItem) =>
                        <div key={categoryItem._id} className="group flex flex-col justify-start text-center border py-7 px-10 rounded-lg hover:scale-102 hover:shadow-md transition-all">
                            <Image src={categoryItem.image} alt={categoryItem.name} width={150} height={150} className="object-cover size-40 rounded-lg m-auto" />
                            <p className='group-hover:text-primary-dark'>{categoryItem.name}</p>
                            <Link
                                href={`/categories/${categoryItem._id}`}
                                className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 translate-y-8 transition-all  group-hover:opacity-100 group-hover:translate-y-0 duration-200 flex items-center gap-1.5 text-primary-dark font-bold text-xs"
                            >
                                View Subcategories
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
