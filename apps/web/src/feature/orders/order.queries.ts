import { queryOptions } from '@tanstack/react-query'
import { getOrdersQueryFn, getOrderDetails, getTotalOrders } from './order.api'
import type { Order, OrderFilters } from './order.types'

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

export const orderDetailQueryOptions = (orderId: string) =>
  queryOptions({
    queryKey: orderKeys.details(orderId),
    queryFn: () => getOrderDetails(orderId),
    enabled: !!orderId, // Dont make this call if you don't have an orderId
  })

export const totalOrdersQueryOptions = (
  storeId: string,
  status?: Order['status'],
) =>
  queryOptions({
    queryKey: [...orderKeys.all, 'total', status] as const,
    queryFn: () => getTotalOrders(storeId, status),
  })
