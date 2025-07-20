// types/pagination.ts

export interface PaginationMeta {
  current_page: number
  last_page: number
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
}

export interface PaginationLinks {
  first: string | null
  last: string | null
  next: string | null
  prev: string | null
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
  links: PaginationLinks
}
