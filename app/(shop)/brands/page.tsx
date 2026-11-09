import BrandCard from '@/components/shared/brands/BrandCard/BrandCard';
import { PagesHero } from '@/components/shared/PagesHero/PagesHero'
import { getAllBrands } from '@/services/brands.service';
import { BrandsResponse } from '@/types/responses.type'

export default async function Brands() {
  const HeroInfo = {
    title: "Top Brands",
    subtitle: "Shop from your favorite brands",
    Icon: "tag",
    mainColor: "bg-purple-500",
    shapesColor: "bg-purple-400/10"
  }
  const data: BrandsResponse = await getAllBrands();


  return (
    <>
      <PagesHero pageInfo={HeroInfo} />
      {data && data.data.length > 0 ?
        <section className="py-20 bg-white w-full m-auto px-6" >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 py-5">
            {data.data.map((brand) => <BrandCard key={brand._id} brand={brand} />)}
          </div>
        </section>
        :
        <div className='w-full m-auto text-2xl text-gray-600 text-center'>
          <span>No Brands Found</span>
        </div>
      }
    </>
  )
}
