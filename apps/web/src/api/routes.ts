export const API_ROUTES = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  products: {
    list: '/api/products',
    create: '/api/products',
    delete: (id: string) => `/api/products/${id}`,
    update: (id: string) => `/api/products/${id}`,
    details: (id: string) => `/api/products/${id}`,
  },
  orders: {
    list: '/api/orders',
    create: '/api/orders',
    delete: (id: string) => `/api/orders/${id}`,
    update: (id: string) => `/api/orders/${id}`,
    details: (id: string) => `/api/orders/${id}`,
  },
  categories: {
    list: '/api/categories',
    create: '/api/categories',
    delete: (id: string) => `/api/categories/${id}`,
    update: (id: string) => `/api/categories/${id}`,
    details: (id: string) => `/api/categories/${id}`,
  },
} as const
