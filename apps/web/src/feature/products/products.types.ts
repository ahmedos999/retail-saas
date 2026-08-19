export type Product = {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  storeId: string
  isActive: boolean
  description: string | null
  categoryId: string | null
  sku: string
  barcode: string | null
  price: string
  costPrice: string
  stock: number
  imageUrl: string | null
  status: 'Active' | 'Inactive' | 'OutOfStock'
}
export type ProductFilters = {
  page?: number
  limit?: number
  search?: string
  category?: string
  storeId?: string
}
