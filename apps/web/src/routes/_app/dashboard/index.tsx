import { CueList } from '#/components/CueList'
import {
  avgOrderValueQueryOptions,
  ordersFulfilledQueryOptions,
  totalOrdersQueryOptions,
  totalRevenueQueryOptions,
} from '#/feature/dashboard/dashboard.queries'
import { Route as AppRoute } from '#/routes/_app'
import { useQueries } from '@tanstack/react-query'
import {
  DollarSign,
  PackageCheck,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react'
import StockList from '#/components/StockList'
import {
  dashboardListItems,
  lowStockData,
  salesChartData,
} from '#/data/cueItems'
import { DropDown, ListView, SalesChart } from '@retail/ui'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = AppRoute.useRouteContext()
  const filters = { storeId: user.storeId }

  const [
    { data: revenue },
    { data: orders },
    { data: avgOrder },
    { data: fulfilled },
  ] = useQueries({
    queries: [
      totalRevenueQueryOptions(filters),
      totalOrdersQueryOptions(filters),
      avgOrderValueQueryOptions(filters),
      ordersFulfilledQueryOptions(filters),
    ],
  })
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
        <CueList
          items={[
            {
              title: 'Total Revenue',
              value: Number(revenue?.data?.totalRevenue) ?? '-',
              percentage: '8.4%',
              icon: <TrendingUp size={24} className="text-emerald-800" />,
              bgColor: 'bg-emerald-200',
            },
            {
              title: 'Total Orders',
              value: Number(orders?.data?.total) ?? '-',
              percentage: '5.7%',
              icon: <ShoppingCart size={24} className="text-blue-800" />,
              bgColor: 'bg-blue-200',
            },
            {
              title: 'Avg Order Value',
              value: Number(avgOrder?.data.avgOrderValue) ?? '-',
              percentage: '3.2%',
              icon: <DollarSign size={24} className="text-violet-800" />,
              bgColor: 'bg-violet-200',
            },
            {
              title: 'Orders Fulfilled',
              value: Number(fulfilled?.data.total) ?? '-',
              percentage: '6.1%',
              icon: <PackageCheck size={24} className="text-orange-800" />,
              bgColor: 'bg-orange-200',
            },
          ]}
        />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <SalesChart data={salesChartData} title="Sales Over Time" />

        <ListView title="Top Selling Products" items={dashboardListItems} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {/* <OrderList title="Recent Orders" items={recentOrdersData} /> */}
        <StockList title="Low Stock Products" items={lowStockData} />
        <StockList title="Low Stock Products" items={lowStockData} />
      </div>
    </div>
  )
}
