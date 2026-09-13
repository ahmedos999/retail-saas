import { apiClient } from '#/api/client'
import { API_ROUTES } from '#/api/routes'
import type { Order, OrderFilters, OrderItem } from './order.types'

export async function getOrdersQueryFn(filters: OrderFilters = {}) {
  const response = await apiClient.get<Order[]>(`${API_ROUTES.orders.list}`, {
    params: filters,
  })
  return response.data
}
export async function createOrder(order: Order) {
  const response = await apiClient.post<Order>(
    `${API_ROUTES.orders.create}`,
    order,
  )
  return response.data
}

export async function getOrderDetails(orderId: string) {
  const response = await apiClient.get<OrderItem[]>(
    `${API_ROUTES.orders.details(orderId)}`,
  )
  return response.data
}
export async function updateOrder(orderId: string, order: Partial<Order>) {
  const response = await apiClient.patch<Order>(
    `${API_ROUTES.orders.updateStatus(orderId)}`,
    order,
  )
  return response.data
}
