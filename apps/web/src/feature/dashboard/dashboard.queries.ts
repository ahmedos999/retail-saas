import { queryOptions } from '@tanstack/react-query'
import {
  getTotalRevenue,
  getTotalOrders,
  getAvgOrderValue,
  getOrdersFulfilled,
} from './dashboard.api'
import type { dashboardFilter } from './dashboard.type'

export const dashboardQueryKeys = {
  totalRevenue: ['totalRevenue'] as const,
  totalOrders: ['totalOrders'] as const,
  avgOrderValue: ['avgOrderValue'] as const,
  ordersFulfilled: ['ordersFulfilled'] as const,
}

export const totalRevenueQueryOptions = (filters?: dashboardFilter) =>
  queryOptions({
    queryKey: [...dashboardQueryKeys.totalRevenue, filters ?? {}],
    queryFn: () => getTotalRevenue(filters),
  })

export const totalOrdersQueryOptions = (filters?: dashboardFilter) =>
  queryOptions({
    queryKey: [...dashboardQueryKeys.totalOrders, filters ?? {}],
    queryFn: () => getTotalOrders(filters),
  })

export const avgOrderValueQueryOptions = (filters?: dashboardFilter) =>
  queryOptions({
    queryKey: [...dashboardQueryKeys.avgOrderValue, filters ?? {}],
    queryFn: () => getAvgOrderValue(filters),
  })

export const ordersFulfilledQueryOptions = (filters?: dashboardFilter) =>
  queryOptions({
    queryKey: [...dashboardQueryKeys.ordersFulfilled, filters ?? {}],
    queryFn: () => getOrdersFulfilled(filters),
  })

