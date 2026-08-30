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
