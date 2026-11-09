import ProductCard from '@/components/shared/products/ProductCard/ProductCard';
import ProductsListing from '@/components/shared/products/ProductsListing/ProductsListing';



export default async function FeaturedProducts() {

    return (
        <>
            <div className="py-20 bg-white  w-full m-auto px-6" >

                <div className="flex justify-between my-5 ">
                    <h2 className="section-header text-2xl ml-4 font-bold ">Featured <span className="text-primary-dark">Products</span></h2>
                </div>
                <ProductsListing listingType='featured' />
            </div>
        </>

    )
}
