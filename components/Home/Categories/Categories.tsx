"use client"
import { useCategories } from "@/context/categoriesContext";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Categories() {
  const {allCategories} =  useCategories();
  return (
    <>
      <section className="py-20 bg-white  w-full m-auto px-6" >
        <div className="flex justify-between my-5 ">
          <h2 className="section-header text-2xl ml-4 font-bold ">Shop By <span className="text-primary-dark">Category</span></h2>
          <Link href={"/categories"} className="flex text-primary hover:text-primary-dark underline">
            View All Categories
            <ArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-5">
          {allCategories && allCategories.map((categoryItem) =>
            <Link href={`/categories/${categoryItem._id}`} key={categoryItem._id} className=" text-center border py-5 px-10 rounded-lg hover:scale-102 hover:shadow-md transition-all">
              <Image src={categoryItem.image} alt="Test" width={50} height={50} className="object-cover size-25 rounded-full m-auto" />
              <p>{categoryItem.name}</p>
            </Link>
          )}
        </div>
      </section>
    </>

  )
}
