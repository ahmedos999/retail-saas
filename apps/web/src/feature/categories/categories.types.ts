export type Category = {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  storeId: string
  isActive: boolean
  description?: string
  color: string
  icon?: string
  productCount: number
  outOfStockCount: number
  totalValue: number
}

export type CategoryFilters = {
  page?: number
  limit?: number
  search?: string
  category?: string
  storeId?: string
}
