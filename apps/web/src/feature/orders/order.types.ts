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
}

export type OrderFilters = {
  page?: number
  limit?: number
  search?: string
  order?: string
  storeId?: string
}
