import { Table, TableRow, TableCell } from '@retail/ui'
import { ReceiptText } from 'lucide-react'
import type { Order } from '#/feature/orders/order.types'
import { getStatusColor } from '#/util/getStatusColor'
import { toFixedPrice } from '#/util/toFixedPrice'

interface RecentOrdersListProps {
  title: string
  items: Order[]
}

const RecentOrdersList = ({ title, items }: RecentOrdersListProps) => {
  return (
    <div className="p-4 box-shadow rounded-md bg-white">
      <div className="flex justify-between border-b border-gray-300 pb-4 mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <button className="bg-white border rounded-md py-1 px-2 text-sm">
          View all
        </button>
      </div>
      <Table columns={[]}>
        {items.map((order) => (
          <TableRow key={order.orderNumber}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center w-8 h-8 bg-red-300 rounded-md">
                  <ReceiptText size={16} className="text-red-600" />
                </div>
                <span className="font-bold">{order.orderNumber}</span>
              </div>
            </TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>
              <span className="font-medium">{toFixedPrice(order.total)}</span>
            </TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
              >
                {order.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  )
}

export default RecentOrdersList
