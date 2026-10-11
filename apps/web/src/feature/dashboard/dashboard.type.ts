export type revenue = {
  totalRevenue: string
}
export type totalOrders = {
  total: number
}
export type avgOrderValue = {
  avgOrderValue: string
}

export type ordersFulfilled = {
  total: number
}
export type topSellingProduct = {
  productId: string
  name: string
  quantitySold: number
  revenue: string
}

export type topSellingProducts = {
  topProducts: topSellingProduct[]
}

export type dashboardFilter = {
  storeId?: string
  startDate?: string
  endDate?: string
}
