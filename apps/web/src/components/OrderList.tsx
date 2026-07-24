import { Table, TableRow, TableCell } from '@retail/ui'
import { ReceiptText } from 'lucide-react'
import { getStatusColor } from '#/util/getStatusColot'

interface OrderListItem {
  OrderNumber: string
  Customer: string
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled'
  price: number
}

interface OrderListProps {
  title: string
  items: OrderListItem[]
}

const OrderList = ({ title, items }: OrderListProps) => {
  return (
    <div className="p-4 box-shadow rounded-md bg-white">
      <div className="flex justify-between border-b border-gray-300 pb-4 mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <button className="bg-white border rounded-md py-1 px-2 text-sm">
          View all Orders
        </button>
      </div>
      <Table columns={[]}>
        {items.map((item) => (
          <TableRow key={item.OrderNumber}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center w-8 h-8 bg-red-300 rounded-md">
                  <ReceiptText size={16} className="text-red-600" />
                </div>
                <span className="font-bold">{item.OrderNumber}</span>
              </div>
            </TableCell>
            <TableCell>{item.Customer}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
              >
                {item.status}
              </span>
            </TableCell>
            <TableCell>{item.price}</TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  )
}

export default OrderList
