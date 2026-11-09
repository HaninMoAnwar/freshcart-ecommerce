import { ListResponse } from "./ListingResponse"


export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}
export interface DetailedSubcategory extends Subcategory {
  createdAt: string,
  updatedAt: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}


export interface DetailedCategory extends Category {

  createdAt: string
  updatedAt: string
}
