import { Table, TableRow, TableCell } from '@retail/ui'
import { Receipt } from 'lucide-react'

interface OrderListItem {
  OrderNumber: string
  Customer: string
  status: 'Pending' | 'Completed' | 'Cancelled'
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
                <div className="flex justify-center items-center w-9 h-9 bg-red-300 rounded-md">
                  <Receipt size={18} className="text-red-600" />
                </div>
                <span className="font-bold">{item.OrderNumber}</span>
              </div>
            </TableCell>
            <TableCell>{item.Customer}</TableCell>
            <TableCell>
              <div
                className={`p-1 rounded-md w-fit text-sm ${
                  item.status === 'Pending'
                    ? 'text-yellow-600 bg-amber-200'
                    : item.status === 'Completed'
                      ? 'text-green-600 bg-green-200'
                      : 'text-red-600 bg-red-200'
                }`}
              >
                {item.status}
              </div>
            </TableCell>
            <TableCell>{item.price}</TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  )
}

export default OrderList
