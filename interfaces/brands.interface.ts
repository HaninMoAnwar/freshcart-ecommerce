export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}
export interface Brands extends Brand {
  createdAt: string,
  updatedAt: string,
  __v: number
}
