import { queryOptions } from '@tanstack/react-query'
import { getOrdersQueryFn } from './order.api'
import type { OrderFilters } from './order.types'

export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  detail: () => [...orderKeys.all, 'detail'] as const,
  details: (id: string) => [...orderKeys.all, 'detail', id] as const,
}
export const orderQueryOptions = (filters?: OrderFilters) =>
  queryOptions({
    queryKey: [...orderKeys.lists(), filters ?? {}],
    queryFn: () => getOrdersQueryFn(filters),
  })
