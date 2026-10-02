import type { AxiosResponse } from 'axios'
import { apiClient } from '#/api/client'
import { API_ROUTES } from '#/api/routes'
import type {
  revenue,
  totalOrders,
  avgOrderValue,
  ordersFulfilled,
  dashboardFilter,
} from './dashboard.type'

export async function getTotalRevenue(
  filters?: dashboardFilter,
): Promise<AxiosResponse<revenue>> {
  return apiClient.get<revenue>(API_ROUTES.dashboard.totalRevenue, {
    params: filters,
  })
}

export async function getTotalOrders(
  filters?: dashboardFilter,
): Promise<AxiosResponse<totalOrders>> {
  return apiClient.get<totalOrders>(API_ROUTES.dashboard.totalOrders, {
    params: filters,
  })
}

export async function getAvgOrderValue(
  filters?: dashboardFilter,
): Promise<AxiosResponse<avgOrderValue>> {
  return apiClient.get<avgOrderValue>(API_ROUTES.dashboard.avgOrderValue, {
    params: filters,
  })
}

export async function getOrdersFulfilled(
  filters?: dashboardFilter,
): Promise<AxiosResponse<ordersFulfilled>> {
  return apiClient.get<ordersFulfilled>(API_ROUTES.dashboard.ordersFulfilled, {
    params: filters,
  })
}
