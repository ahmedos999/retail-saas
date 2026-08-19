import { queryOptions } from '@tanstack/react-query'
import { getCategoriesQueryFn } from './categories.api'
import type { CategoryFilters } from './categories.types'

export const categoriesKeys = {
  all: ['categories'] as const,
  lists: () => [...categoriesKeys.all, 'list'] as const,
  detail: () => [...categoriesKeys.all, 'detail'] as const,
  details: (id: string) => [...categoriesKeys.all, 'detail', id] as const,
}

export const categoriesQueryOptions = (filters?: CategoryFilters) =>
  queryOptions({
    queryKey: [...categoriesKeys.lists(), filters ?? {}],
    queryFn: () => getCategoriesQueryFn(filters),

    staleTime: 1000 * 60 * 5, // 5 minutes
  })
