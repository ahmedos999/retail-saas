import type { Order } from '#/feature/orders/order.types'

const statusStyles: Record<Order['status'], string> = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
  Refunded: 'bg-purple-100 text-purple-700',
}

export const getStatusColor = (status: Order['status']): string =>
  statusStyles[status]
