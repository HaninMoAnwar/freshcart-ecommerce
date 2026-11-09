import ProductDetails from "@/components/shared/products/ProductDetails/ProductDetails";
import { SingleProduct } from "@/interfaces/products.interface";
import { getSingleProduct } from "@/services/products.service";

interface ProductPage {
  params: Promise<{ productId: string }>
}
export default async function ProductPage({ params }: ProductPage) {
  const { productId } = await params;
  
  const { data} : {data : SingleProduct} = await getSingleProduct(productId);


  return (
    <>
     <ProductDetails productItem={data}/> 
    </>
  )
}
