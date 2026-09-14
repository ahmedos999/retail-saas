import { apiClient } from '#/api/client'
import { API_ROUTES } from '#/api/routes'
import type { Category, CategoryFilters } from './categories.types'

export function getCategoriesQueryFn(filters: CategoryFilters = {}) {
  return apiClient
    .get<Category[]>(`${API_ROUTES.categories.list}`, {
      params: filters,
    })
    .then((response) => response.data)
}

export function createCategory(category: Partial<Category>) {
  return apiClient.post<Category>(`${API_ROUTES.categories.create}`, category)
}

export function deleteCategory(categoryId: string) {
  return apiClient.delete<void>(`${API_ROUTES.categories.delete(categoryId)}`)
}

export function getTotalCategories(filters: CategoryFilters = {}) {
  return apiClient.get<{ total: number }>(`${API_ROUTES.categories.total}`, {
    params: filters,
  })
}
export function getLargestCategory(filters: CategoryFilters = {}) {
  return apiClient.get<{ name: string }>(`${API_ROUTES.categories.largest}`, {
    params: filters,
  })
}

export function getEmptyCategories(filters: CategoryFilters = {}) {
  return apiClient.get<{ total: number }>(`${API_ROUTES.categories.empty}`, {
    params: filters,
  })
}
