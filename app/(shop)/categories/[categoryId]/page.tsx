import SubcategoryCard from "@/components/shared/categories/SubcategoryCard";
import { PagesHero } from "@/components/shared/PagesHero/PagesHero";
import { getAllSubcategories } from "@/services/categories.service";
import { SubcategoryResponse } from "@/types/responses.type";

interface CategoryPageProps {
    params: Promise<{ categoryId: string }>
}
export default async function CategoryPage({ params }: CategoryPageProps) {
    const { categoryId } = await params;
    const data: SubcategoryResponse = await getAllSubcategories(categoryId);
    const HeroInfo = {
        title: "Categories",
        subtitle: "Browse our wide range of product categories",
        Icon: "layers",
        mainColor: "bg-primary",
        shapesColor: "bg-emerald-400/10"
    }

    return (
        <>
            <PagesHero pageInfo={HeroInfo} />
            <section className="py-20 bg-white w-full m-auto px-6">
                <h2 className="font-bold text-2xl">{data.data.length} Subcategories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-5">
                    {data && data.data.length > 0 ?
                        data.data.map((categoryItem) => <SubcategoryCard key={categoryItem._id} subcategoryItem={categoryItem} />)
                        : <div className='w-full m-auto text-2xl text-gray-600 text-center'>
                            <span className=''>No Subcategory Found</span>
                        </div>}
                </div>
            </section>
        </>
    )
}

