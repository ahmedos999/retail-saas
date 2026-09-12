import { apiClient } from '#/api/client'
import { API_ROUTES } from '#/api/routes'
import type { CreateOrderInput, Order, OrderFilters } from './order.types'

export async function getOrdersQueryFn(filters: OrderFilters = {}) {
  const response = await apiClient.get<Order[]>(`${API_ROUTES.orders.list}`, {
    params: filters,
  })
  return response.data
}
export async function createOrder(order: CreateOrderInput) {
  const response = await apiClient.post<Order>(
    `${API_ROUTES.orders.create}`,
    order,
  )
  return response.data
}
