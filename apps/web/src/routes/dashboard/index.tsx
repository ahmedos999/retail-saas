import { CueList } from '#/components/CueList'
import OrderList from '#/components/OrderList'
import StockList from '#/components/StockList'
import {
  dashboardCueItems,
  dashboardListItems,
  salesChartData,
} from '#/data/cueItems'
import { DropDown, ListView, SalesChart } from '@retail/ui'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p>Overview of your store's performance.</p>
        </div>
        <DropDown
          options={['Active', 'Inactive', 'Pending']}
          placeholder="Date Range"
        />
      </div>

      <div className="mt-10 w-full">
        <CueList items={dashboardCueItems} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <SalesChart data={salesChartData} title="Sales Over Time" />

        <ListView title="Top Selling Products" items={dashboardListItems} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <OrderList
          title="Recent Orders"
          items={[
            {
              OrderNumber: 'ORD12345',
              Customer: 'John Doe',
              status: 'Pending',
              price: 100,
            },
            {
              OrderNumber: 'ORD12346',
              Customer: 'Jane Smith',
              status: 'Completed',
              price: 150,
            },
            {
              OrderNumber: 'ORD12347',
              Customer: 'Alice Johnson',
              status: 'Cancelled',
              price: 200,
            },
          ]}
        />
        <StockList
          title="Low Stock Products"
          items={[
            {
              product: 'Air Max 90',
              image:
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&q=80',
              stock: 3,
            },
            {
              product: 'Slim Fit T-Shirt',
              image:
                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=80&q=80',
              stock: 6,
            },
            {
              product: 'Wireless Headphones',
              image:
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&q=80',
              stock: 2,
            },
          ]}
        />
      </div>
    </div>
  )
}
