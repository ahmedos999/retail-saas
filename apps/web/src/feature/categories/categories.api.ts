import { apiClient } from '#/api/client'
import { API_ROUTES } from '#/api/routes'
import type { Category, CategoryFilters } from './categories.types'

export function getCategoriesQueryFn(filters: CategoryFilters = {}) {
  return apiClient<Category[]>(`${API_ROUTES.categories.list}`, {
    query: filters,
  })
}
