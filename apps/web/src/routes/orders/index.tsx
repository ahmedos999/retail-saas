import { CueList } from '#/components/CueList'
import { ordersCueItems, ordersData } from '#/data/cueItems'
import { getStatusColor } from '#/util/getStatusColot'
import {
  Button,
  DropDown,
  Pagination,
  Search,
  Table,
  TableCell,
  TableRow,
} from '@retail/ui'
import { createFileRoute } from '@tanstack/react-router'
import { Eye, MoreHorizontal, ReceiptText } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/orders/')({
  component: RouteComponent,
})

const orderColumns = [
  { key: 'orderNumber', header: 'Order #' },
  { key: 'date', header: 'Date' },
  { key: 'time', header: 'Time' },
  { key: 'customer', header: 'Customer' },
  { key: 'items', header: 'Items' },
  { key: 'paymentMethod', header: 'Payment' },
  { key: 'total', header: 'Total' },
  { key: 'status', header: 'Status' },
  { key: 'action', header: 'Action' },
]

function RouteComponent() {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-gray-500">Track and manage customer orders</p>
        </div>
      </div>

      <div className="mt-10 w-full">
        <CueList items={ordersCueItems} />
      </div>

      <div className="mt-6 flex gap-4">
        <Search placeholder="Search orders..." className="flex-1" />
        <DropDown
          options={['Pending', 'Processing', 'Completed', 'Cancelled']}
          placeholder="All Statuses"
        />
        <DropDown
          options={['Credit Card', 'Cash', 'PayPal', 'Bank Transfer']}
          placeholder="All Payments"
        />
        <DropDown
          options={['Today', 'Last 7 Days', 'Last 30 Days', 'This Month']}
          placeholder="Date Range"
        />
      </div>

      <div className="mt-6">
        <Table columns={orderColumns}>
          {ordersData.map((order) => (
            <TableRow key={order.orderNumber}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center w-8 h-8 bg-red-300 rounded-md">
                    <ReceiptText size={16} className="text-red-600" />
                  </div>
                  <span className="font-bold">{order.orderNumber}</span>
                </div>
              </TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.time}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell>
                <span className="font-medium">{order.total}</span>
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="secondary">
                    <Eye size={14} />
                  </Button>
                  <Button variant="secondary">
                    <MoreHorizontal size={14} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
        <Pagination
          totalItems={ordersData.length}
          pageSize={5}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
