export type Category = {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  storeId: string
  isActive: boolean
  description: string | null
  color: string
  icon: string | null
}

export type CategoryFilters = {
  page?: number
  limit?: number
  search?: string
  category?: string
  storeId?: string
}
