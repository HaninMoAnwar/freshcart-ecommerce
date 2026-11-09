export interface ListResponse<T> {
  results: number
  metadata: Pagination
  data: T[]
}

export interface Pagination {
  currentPage: number
  numberOfPages: number
  limit: number
}