export type OrderStatus = 'Pending' | 'Processing' | 'Completed' | 'Cancelled'
export type PaymentMethod = 'Credit Card' | 'Cash' | 'PayPal' | 'Bank Transfer'

export interface Order {
  orderNumber: string
  date: string
  time: string
  customer: string
  items: number
  paymentMethod: PaymentMethod
  total: string
  status: OrderStatus
}
