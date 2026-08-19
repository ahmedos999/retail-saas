import { apiClient } from '#/api/client'
import { API_ROUTES } from '#/api/routes'
import type { ProductFilters, Product } from './products.types'

export function getProductsQueryFn(filters: ProductFilters = {}) {
  return apiClient<Product[]>(`${API_ROUTES.products.list}`, {
    query: filters,
  })
}

export function createProduct(product: Product) {
  return apiClient<Product>(`${API_ROUTES.products.create}`, {
    method: 'POST',
    body: JSON.stringify(product),
  })
}

export function deleteProduct(productId: string) {
  return apiClient<void>(`${API_ROUTES.products.delete(productId)}`, {
    method: 'DELETE',
  })
}
