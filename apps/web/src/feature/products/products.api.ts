import { apiClient } from '#/api/client'
import { API_ROUTES } from '#/api/routes'
import type { ProductFilters, Product } from './products.types'

export function getProductsQueryFn(filters: ProductFilters = {}) {
  return apiClient<Product[]>(`${API_ROUTES.products.list}`, {
    params: filters,
  }).then((response) => response.data)
}

export function createProduct(product: Product) {
  return apiClient.post<Product>(`${API_ROUTES.products.create}`, product)
}

export function deleteProduct(productId: string) {
  return apiClient.delete<void>(`${API_ROUTES.products.delete(productId)}`)
}
