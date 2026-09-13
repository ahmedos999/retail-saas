import { CueList } from '#/components/CueList'
import { ordersCueItems } from '#/data/cueItems'
import { useUpdateOrderMutation } from '#/feature/orders/order.mutation'
import {
  orderQueryOptions,
  orderDetailQueryOptions,
} from '#/feature/orders/order.queries'
import type {
  Order,
  OrderFilters,
  OrderStatus,
} from '#/feature/orders/order.types'
import { debounce } from '#/util/debounce'
import { getStartDate } from '#/util/getStartDate'
import { getStatusColor } from '#/util/getStatusColor'
import { toFixedPrice } from '#/util/toFixedPrice'
import {
  Button,
  DropDown,
  Pagination,
  Search,
  Table,
  TableCell,
  TableRow,
  ViewOrderModal,
} from '@retail/ui'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import {
  CheckCircle2,
  Eye,
  MoreHorizontal,
  ReceiptText,
  RotateCcw,
  XCircle,
} from 'lucide-react'
import { useMemo, useState } from 'react'

export const Route = createFileRoute('/_app/orders/')({
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
  // orders filters
  const [status, setStatus] = useState<OrderFilters['status'] | undefined>(
    undefined,
  )
  const [paymentMethod, setPaymentMethod] = useState<
    OrderFilters['paymentMethod'] | undefined
  >(undefined)
  const [startDate, setStartDate] = useState<
    OrderFilters['startDate'] | undefined
  >(undefined)
  const [search, setSearch] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewOrderModalOpen, setViewOrderModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [openMenuOrderId, setOpenMenuOrderId] = useState<string | null>(null)
  const { user } = Route.useRouteContext()
  const { data: orders } = useQuery(
    orderQueryOptions({
      storeId: user.storeId,
      search,
      paymentMethod,
      status,
      startDate,
      page: currentPage,
    }),
  )

  const { data, isPending: isDetailsPending } = useQuery(
    orderDetailQueryOptions(selectedOrder?.id ?? ''),
  )

  const debouncedSetSearch = useMemo(() => debounce(setSearch, 300), [])

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
    debouncedSetSearch(event.target.value)
  }

  const updateOrderMutation = useUpdateOrderMutation()

  function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    updateOrderMutation.mutate({
      orderId,
      order: { status: newStatus },
    })
    setOpenMenuOrderId(null)
  }
  return (
    <>
      {openMenuOrderId && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpenMenuOrderId(null)}
        />
      )}
      {/* TODO: Refactor this section to improve readability and maintainability */}
      {viewOrderModalOpen && selectedOrder && (isDetailsPending || data) && (
        <ViewOrderModal
          onClose={() => setViewOrderModalOpen(false)}
          currentOrder={selectedOrder}
          onSubmit={() => {}}
          orderDetails={data}
        />
      )}
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
          <Search
            placeholder="Enter order number..."
            className="flex-1"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <DropDown
            options={['Pending', 'Completed', 'Refunded', 'Cancelled']}
            placeholder="All Statuses"
            onChange={(value) => setStatus(value as OrderFilters['status'])}
          />
          <DropDown
            options={['Card', 'Cash', 'Online', 'Other']}
            placeholder="All Payments"
            onChange={(value) =>
              setPaymentMethod(value as OrderFilters['paymentMethod'])
            }
          />
          <DropDown
            options={['Today', 'Last 7 Days', 'Last 30 Days', 'This Month']}
            placeholder="Date Range"
            onChange={(value) => setStartDate(getStartDate(value))}
          />
        </div>

        <div className="mt-6">
          <Table columns={orderColumns}>
            {orders &&
              orders.length > 0 &&
              orders?.map((order) => (
                <TableRow key={order.orderNumber}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center items-center w-8 h-8 bg-red-300 rounded-md">
                        <ReceiptText size={16} className="text-red-600" />
                      </div>
                      <span className="font-bold">{order.orderNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>{String(order.createdAt).split('T')[0]}</TableCell>
                  <TableCell>
                    {String(order.createdAt)
                      .split('T')[1]
                      .split(':')
                      .slice(0, 2)
                      .join(':')}
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.itemCount ?? 0}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    <span className="font-medium">
                      {toFixedPrice(order.total)}
                    </span>
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
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setViewOrderModalOpen(true)
                          setSelectedOrder(order)
                        }}
                      >
                        <Eye size={14} />
                      </Button>
                      <div className="relative">
                        <Button
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (order.id) {
                              setOpenMenuOrderId(
                                openMenuOrderId === order.id ? null : order.id,
                              )
                            }
                          }}
                        >
                          <MoreHorizontal size={14} />
                        </Button>
                        {order.id && openMenuOrderId === order.id && (
                          <div className="absolute right-0 top-full mt-1.5 z-20 w-44 rounded-lg bg-white border border-gray-200 shadow-xl py-1 text-sm">
                            <div className="px-3 py-1.5 text-xs text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-100">
                              Change Status
                            </div>
                            <div className="py-1">
                              <button
                                type="button"
                                onClick={() =>
                                  order.id &&
                                  handleStatusChange(order.id, 'Completed')
                                }
                                disabled={order.status === 'Completed'}
                                className="w-full text-left px-3 py-2 flex items-center gap-2.5 text-emerald-700 hover:bg-emerald-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors font-medium"
                              >
                                <CheckCircle2
                                  size={14}
                                  className="text-emerald-600"
                                />
                                <span>Complete</span>
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  order.id &&
                                  handleStatusChange(order.id, 'Refunded')
                                }
                                disabled={order.status === 'Refunded'}
                                className="w-full text-left px-3 py-2 flex items-center gap-2.5 text-amber-700 hover:bg-amber-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors font-medium"
                              >
                                <RotateCcw
                                  size={14}
                                  className="text-amber-600"
                                />
                                <span>Refund</span>
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  order.id &&
                                  handleStatusChange(order.id, 'Cancelled')
                                }
                                disabled={order.status === 'Cancelled'}
                                className="w-full text-left px-3 py-2 flex items-center gap-2.5 text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors font-medium"
                              >
                                <XCircle size={14} className="text-red-500" />
                                <span>Cancel</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </Table>
          <Pagination
            totalItems={100}
            pageSize={5}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  )
}
