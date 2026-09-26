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

export const productsTotalMetricsQueryOptions = (storeId: string) =>
  queryOptions({
    queryKey: [...productsKeys.totalProducts()],
    queryFn: () => getProductsTotalMetrics(storeId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

export const productsTotalValueQueryOptions = (storeId: string) =>
  queryOptions({
    queryKey: [...productsKeys.totalValue()],
    queryFn: () => getProductsTotalValueMetrics(storeId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

export const productsOutOfStockQueryOptions = (storeId: string) =>
  queryOptions({
    queryKey: [...productsKeys.outOfStock()],
    queryFn: () => getProductsOutOfStockMetrics(storeId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

export const productsLowStockQueryOptions = (storeId: string) =>
  queryOptions({
    queryKey: [...productsKeys.lowStock()],
    queryFn: () => getProductsLowStockMetrics(storeId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
