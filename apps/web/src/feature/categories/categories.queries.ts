import { queryOptions } from '@tanstack/react-query'
import { getCategoriesFn } from './categories.api'

export const categoriesKeys = {
  all: ['categories'] as const,
  lists: () => [...categoriesKeys.all, 'list'] as const,
  detail: () => [...categoriesKeys.all, 'detail'] as const,
  details: (id: string) => [...categoriesKeys.all, 'detail', id] as const,
}

export const categoriesQueryOptions = (storeId: string) =>
  queryOptions({
    queryKey: [...categoriesKeys.lists(), storeId],
    queryFn: () => getCategoriesFn(storeId),

    staleTime: 1000 * 60 * 5, // 5 minutes
  })
