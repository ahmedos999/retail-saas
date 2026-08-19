import { apiClient } from '#/api/client'
import { API_ROUTES } from '#/api/routes'
import type { Category, CategoryFilters } from './categories.types'

export function getCategoriesQueryFn(filters: CategoryFilters = {}) {
  return apiClient<Category[]>(`${API_ROUTES.categories.list}`, {
    query: filters,
  })
}

export function createCategory(category: Partial<Category>) {
  return apiClient<Category>(`${API_ROUTES.categories.create}`, {
    method: 'POST',
    body: JSON.stringify(category),
  })
}

export function deleteCategory(categoryId: string) {
  return apiClient<void>(`${API_ROUTES.categories.delete(categoryId)}`, {
    method: 'DELETE',
  })
}
