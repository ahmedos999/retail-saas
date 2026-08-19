import { queryOptions } from '@tanstack/react-query'
import type { ProductFilters } from './products.types'
import { getProductsQueryFn } from './products.api'

export const productsKeys = {
  all: ['products'] as const,
  lists: () => [...productsKeys.all, 'list'] as const,
  detail: () => [...productsKeys.all, 'detail'] as const,
  details: (id: string) => [...productsKeys.all, 'detail', id] as const,
}

export const productsQueryOptions = (filters?: ProductFilters) =>
  queryOptions({
    queryKey: [...productsKeys.lists(), filters ?? {}],
    queryFn: () => getProductsQueryFn(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
