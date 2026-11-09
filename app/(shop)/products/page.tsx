import { PagesHero } from "@/components/shared/PagesHero/PagesHero";
import ProductsListing from "@/components/shared/products/ProductsListing/ProductsListing";

interface ProductsProps{
    searchParams: {
        category?: string,
        brand?: string,
        subcategory?: string,
    }
}
export default async function Products({ searchParams }:ProductsProps) {
    const searchParam = await searchParams;

    const HeroInfo = {
        title: "All Products",
        subtitle: "Explore our complete product collection",
        Icon: "box",
        mainColor: "bg-primary",
        shapesColor: "bg-emerald-400/10"
    }
    return (
        <>
            <PagesHero searchParam={searchParam} pageInfo={HeroInfo} />
            <div className="py-20 bg-white  w-full m-auto px-6" >
                {searchParam.category ?
                    <ProductsListing listingType="category" categoryId={searchParam.category} /> :
                    searchParam.brand ?
                        <ProductsListing listingType="brand" brandId={searchParam.brand} /> :
                        searchParam.subcategory ?
                            <ProductsListing listingType="subcategory" subcategoryId={searchParam.subcategory} /> :

                            <ProductsListing listingType="all" />}

            </div>
        </>
    )

}
