import { apiClient } from '#/api/client'
import { API_ROUTES } from '#/api/routes'
import type { Order, OrderFilters } from './order.types'

export function getOrdersQueryFn(filters: OrderFilters = {}) {
  return apiClient
    .get<Order[]>(`${API_ROUTES.orders.list}`, {
      params: filters,
    })
    .then((response) => response.data)
}
