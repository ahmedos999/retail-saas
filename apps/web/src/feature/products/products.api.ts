import { apiClient } from '#/api/client'
import { API_ROUTES } from '#/api/routes'
import type { ProductFilters, Product } from './products.types'

export function getProductsQueryFn(filters: ProductFilters = {}) {
  return apiClient<Product[]>(`${API_ROUTES.products.list}`, {
    query: filters,
  })
}
