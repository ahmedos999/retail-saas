export type Order = {
  storeId: string
  id: string
  createdAt: Date
  updatedAt: Date
  status: 'Pending' | 'Completed' | 'Refunded' | 'Cancelled'
  orderNumber: string
  customerId: string | null
  customerName: string
  staffId: string
  subtotal: string
  discountCode: string | null
  discountAmount: string
  taxRate: string
  taxAmount: string
  total: string
  paymentMethod: 'Cash' | 'Card' | 'Online' | 'Other'
  notes: string | null
  itemCount?: number
  items?: OrderItems[]
}

export type OrderFilters = {
  page?: number
  limit?: number
  search?: string
  status?: 'Pending' | 'Completed' | 'Refunded' | 'Cancelled'
  paymentMethod?: 'Cash' | 'Card' | 'Online' | 'Other'
  startDate?: Date
  storeId?: string
}

export type OrderItems = {
  productId: string
  productName: string
  sku: string
  unitPrice: string
  quantity: number
}

export type CreateOrderInput = {
  customerName: string
  storeId: string
  orderNumber: string
  staffId: string
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  paymentMethod: Order['paymentMethod']
  status: Order['status']
  items?: CreateOrderItemInput[]
}

export type CreateOrderItemInput = {
  productId: string
  sku: string
  productName: string
  unitPrice: number
  quantity: number
  totalPrice: number
}
