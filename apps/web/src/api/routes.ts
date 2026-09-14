export const API_ROUTES = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  products: {
    list: '/api/products',
    create: '/api/products',
    delete: (id: string) => `/api/products/${id}`,
    update: (id: string) => `/api/products/${id}`,
    details: (id: string) => `/api/products/${id}`,
    metrics: {
      total: '/api/products/metric/total',
      totalValue: '/api/products/metric/total-value',
      outOfStock: '/api/products/metric/out-of-stock',
      lowStock: '/api/products/metric/low-stock',
    },
  },
  orders: {
    list: '/api/orders',
    create: '/api/orders',
    delete: (id: string) => `/api/orders/${id}`,
    update: (id: string) => `/api/orders/${id}`,
    updateStatus: (id: string) => `/api/orders/${id}/status`,
    details: (id: string) => `/api/order-items/${id}`,
  },
  categories: {
    list: '/api/categories',
    create: '/api/categories',
    delete: (id: string) => `/api/categories/${id}`,
    update: (id: string) => `/api/categories/${id}`,
    details: (id: string) => `/api/categories/${id}`,

    // metrics
    total: '/api/categories/metric/totalCategories',
    largest: '/api/categories/metric/largestCategory',
    empty: '/api/categories/metric/emptyCategories',
  },
} as const
