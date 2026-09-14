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

export function updateProduct(productId: string, product: Product) {
  return apiClient.put<Product>(
    `${API_ROUTES.products.update(productId)}`,
    product,
  )
}

export function getProductsTotalMetrics(filters: ProductFilters = {}) {
  return apiClient.get<{ total: number }>(
    `${API_ROUTES.products.metrics.total}`,
    {
      params: filters,
    },
  )
}

export function getProductsTotalValueMetrics(filters: ProductFilters = {}) {
  return apiClient.get<{ total: number }>(
    `${API_ROUTES.products.metrics.totalValue}`,
    {
      params: filters,
    },
  )
}

export function getProductsOutOfStockMetrics(filters: ProductFilters = {}) {
  return apiClient.get<{ total: number }>(
    `${API_ROUTES.products.metrics.outOfStock}`,
    {
      params: filters,
    },
  )
}

export function getProductsLowStockMetrics(filters: ProductFilters = {}) {
  return apiClient.get<{ total: number }>(
    `${API_ROUTES.products.metrics.lowStock}`,
    {
      params: filters,
    },
  )
}
