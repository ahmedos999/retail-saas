import { queryOptions } from '@tanstack/react-query'
import type { ProductFilters } from './products.types'
import {
  getProductsQueryFn,
  getProductsTotalMetrics,
  getProductsTotalValueMetrics,
  getProductsOutOfStockMetrics,
  getProductsLowStockMetrics,
} from './products.api'

export const productsKeys = {
  all: ['products'] as const,
  lists: () => [...productsKeys.all, 'list'] as const,
  detail: () => [...productsKeys.all, 'detail'] as const,
  details: (id: string) => [...productsKeys.all, 'detail', id] as const,

  totalProducts: () => [...productsKeys.all, 'metrics', 'total'] as const,
  totalValue: () => [...productsKeys.all, 'metrics', 'total-value'] as const,
  outOfStock: () => [...productsKeys.all, 'metrics', 'out-of-stock'] as const,
  lowStock: () => [...productsKeys.all, 'metrics', 'low-stock'] as const,
}

export const productsQueryOptions = (filters?: ProductFilters) =>
  queryOptions({
    queryKey: [...productsKeys.lists(), filters ?? {}],
    queryFn: () => getProductsQueryFn(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

export const productsTotalMetricsQueryOptions = (filters?: ProductFilters) =>
  queryOptions({
    queryKey: [...productsKeys.totalProducts(), filters ?? {}],
    queryFn: () => getProductsTotalMetrics(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

export const productsTotalValueQueryOptions = (filters?: ProductFilters) =>
  queryOptions({
    queryKey: [...productsKeys.totalValue(), filters ?? {}],
    queryFn: () => getProductsTotalValueMetrics(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

export const productsOutOfStockQueryOptions = (filters?: ProductFilters) =>
  queryOptions({
    queryKey: [...productsKeys.outOfStock(), filters ?? {}],
    queryFn: () => getProductsOutOfStockMetrics(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

export const productsLowStockQueryOptions = (filters?: ProductFilters) =>
  queryOptions({
    queryKey: [...productsKeys.lowStock(), filters ?? {}],
    queryFn: () => getProductsLowStockMetrics(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
