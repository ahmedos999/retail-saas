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

export type lowStockProduct = {
  id: string
  name: string
  sku: string
  stock: number
}

export type lowStockProducts = {
  lowStockProducts: lowStockProduct[]
}

export type salesOverTimePoint = {
  date: string
  sales: number
}

export type salesOverTime = {
  salesOverTime: salesOverTimePoint[]
}

export type dashboardFilter = {
  storeId?: string
  startDate?: string
  endDate?: string
}
