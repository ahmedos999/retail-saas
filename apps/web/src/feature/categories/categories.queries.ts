import { queryOptions } from '@tanstack/react-query'
import {
  getCategoriesQueryFn,
  getTotalCategories,
  getLargestCategory,
  getEmptyCategories,
} from './categories.api'
import type { CategoryFilters } from './categories.types'

export const categoriesKeys = {
  all: ['categories'] as const,
  lists: () => [...categoriesKeys.all, 'list'] as const,
  detail: () => [...categoriesKeys.all, 'detail'] as const,
  details: (id: string) => [...categoriesKeys.all, 'detail', id] as const,

  total: () => [...categoriesKeys.all, 'total'] as const,
  largest: () => [...categoriesKeys.all, 'largest'] as const,
  empty: () => [...categoriesKeys.all, 'empty'] as const,
}

export const categoriesQueryOptions = (filters?: CategoryFilters) =>
  queryOptions({
    queryKey: [...categoriesKeys.lists(), filters ?? {}],
    queryFn: () => getCategoriesQueryFn(filters),

    staleTime: 1000 * 60 * 5, // 5 minutes
  })

export const totalCategoriesQueryOptions = (filters?: CategoryFilters) =>
  queryOptions({
    queryKey: [...categoriesKeys.total()] as const,
    queryFn: () => getTotalCategories(filters),

    staleTime: 1000 * 60 * 5, // 5 minutes
  })

export const largestCategoriesQueryOptions = (filters?: CategoryFilters) =>
  queryOptions({
    queryKey: [...categoriesKeys.largest()] as const,
    queryFn: () => getLargestCategory(filters),

    staleTime: 1000 * 60 * 5, // 5 minutes
  })

export const emptyCategoriesQueryOptions = (filters?: CategoryFilters) =>
  queryOptions({
    queryKey: [...categoriesKeys.empty()] as const,
    queryFn: () => getEmptyCategories(filters),

    staleTime: 1000 * 60 * 5, // 5 minutes
  })
