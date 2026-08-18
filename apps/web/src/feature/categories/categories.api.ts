import { apiClient } from '#/api/client'
import { API_ROUTES } from '#/api/routes'
import type { Category } from './categories.types'

export function getCategoriesFn(storeId: string) {
  return apiClient<Category[]>(
    `${API_ROUTES.categories.list}?storeId=${storeId}`,
    {
      method: 'GET',
    },
  )
}
