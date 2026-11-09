import { getProductsbyBrand, getProductsbyCategory, getProductsbySubcategory } from '@/actions/products.actions';
import ProductCard from '@/components/shared/products/ProductCard/ProductCard';
import { getAllProducts, getFeaturedProducts } from '@/services/products.service';
import { ProductsResponse } from '@/types/responses.type';


interface ProductsListingProps {
    listingType: "featured" | "all" | "category" | "brand" | "subcategory";
    categoryId?: string;
    brandId?: string;
    subcategoryId?: string;
}
export default async function ProductsListing({ listingType, categoryId,brandId,subcategoryId }: ProductsListingProps) {

    let data: ProductsResponse;

    if (listingType === "featured") {

        data = await getFeaturedProducts();
    }
    else if (listingType === "category" && categoryId) {
        data = await getProductsbyCategory(categoryId);
    }
    else if (listingType === "brand" && brandId) {
        data = await getProductsbyBrand(brandId);
    }
    else if (listingType === "subcategory" && subcategoryId) {
        data = await getProductsbySubcategory(subcategoryId);
    }
    else {
        data = await getAllProducts();

    }
    if (data.data.length < 1) {
        return <div className='w-full m-auto text-2xl text-gray-600 text-center'>
            <span className=''>No Products Found</span>
        </div>
    }
    return (


        <div className='w-full m-auto px-6 gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
            {

                listingType === "featured" ?
                    data.data.slice(0, 10).map((productItem) => <ProductCard key={productItem._id} productItem={productItem} />)
                    :
                    data.data.map((productItem) => <ProductCard key={productItem._id} productItem={productItem} />)

            }
        </div>


    )
}
