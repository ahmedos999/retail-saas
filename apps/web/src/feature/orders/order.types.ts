export type OrderStatus = 'Pending' | 'Completed' | 'Refunded' | 'Cancelled'
export type PaymentMethod = 'Cash' | 'Card' | 'Online' | 'Other'

export type OrderItem = {
  id?: string
  orderId?: string
  productId: string
  productName: string
  sku: string
  unitPrice: number | string
  quantity: number
  totalPrice: number | string
}

export type Order = {
  id?: string
  storeId: string
  orderNumber: string
  customerName: string
  staffId: string
  status: OrderStatus
  paymentMethod: PaymentMethod
  subtotal: number | string
  taxRate: number | string
  taxAmount: number | string
  total: number | string
  customerId?: string | null
  discountCode?: string | null
  discountAmount?: number | string
  notes?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  itemCount?: number
  items?: OrderItem[]
}

export type OrderFilters = {
  page?: number
  limit?: number
  search?: string
  status?: OrderStatus
  paymentMethod?: PaymentMethod
  startDate?: Date
  storeId?: string
}
