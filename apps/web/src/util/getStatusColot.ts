import type { OrderStatus } from '#/util/types'

const statusStyles: Record<OrderStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Processing: 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
}

export const getStatusColor = (status: OrderStatus): string =>
  statusStyles[status]
