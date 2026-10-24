import { CueList } from '#/components/CueList'
import {
  avgOrderValueQueryOptions,
  lowStockProductsQueryOptions,
  ordersFulfilledQueryOptions,
  salesOverTimeQueryOptions,
  topSellingProductsQueryOptions,
  totalOrdersQueryOptions,
  totalRevenueQueryOptions,
} from '#/feature/dashboard/dashboard.queries'
import { orderQueryOptions } from '#/feature/orders/order.queries'
import { Route as AppRoute } from '#/routes/_app'
import { useQueries } from '@tanstack/react-query'
import {
  DollarSign,
  PackageCheck,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react'
import RecentOrdersList from '#/components/RecentOrdersList'
import StockList from '#/components/StockList'
import { DropDown, ListView, SalesChart } from '@retail/ui'
import { createFileRoute } from '@tanstack/react-router'

// TODO: replace with the real product image once the endpoint returns it
const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&q=80'

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
    { data: topSelling },
    { data: lowStock },
    { data: recentOrders },
    { data: salesOverTime },
  ] = useQueries({
    queries: [
      totalRevenueQueryOptions(filters),
      totalOrdersQueryOptions(filters),
      avgOrderValueQueryOptions(filters),
      ordersFulfilledQueryOptions(filters),
      topSellingProductsQueryOptions(filters),
      lowStockProductsQueryOptions(filters),
      orderQueryOptions({ storeId: user.storeId, limit: 5 }),
      salesOverTimeQueryOptions(filters),
    ],
  })

  const topSellingItems = (topSelling?.data?.topProducts ?? []).map(
    (product) => ({ ...product, image: PLACEHOLDER_IMAGE }),
  )
  const lowStockItems = (lowStock?.data?.lowStockProducts ?? []).map(
    (product) => ({
      product: product.name,
      image: PLACEHOLDER_IMAGE,
      stock: product.stock,
    }),
  )
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
              value: revenue?.data?.totalRevenue
                ? Number(revenue?.data?.totalRevenue)
                : '-',
              toFixed: 2,
              percentage: '8.4%',
              icon: <TrendingUp size={24} className="text-emerald-800" />,
              bgColor: 'bg-emerald-200',
            },
            {
              title: 'Total Orders',
              value: orders?.data?.total ?? '-',
              toFixed: 0,
              percentage: '5.7%',
              icon: <ShoppingCart size={24} className="text-blue-800" />,
              bgColor: 'bg-blue-200',
            },
            {
              title: 'Avg Order Value',
              value: avgOrder?.data.avgOrderValue
                ? Number(avgOrder?.data.avgOrderValue)
                : '-',
              toFixed: 2,
              percentage: '3.2%',
              icon: <DollarSign size={24} className="text-violet-800" />,
              bgColor: 'bg-violet-200',
            },
            {
              title: 'Orders Fulfilled',
              value: fulfilled?.data?.total ?? '-',
              toFixed: 0,
              percentage: '6.1%',
              icon: <PackageCheck size={24} className="text-orange-800" />,
              bgColor: 'bg-orange-200',
            },
          ]}
        />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <SalesChart
          data={salesOverTime?.data?.salesOverTime ?? []}
          title="Sales Over Time"
        />

        <ListView title="Top Selling Products" items={topSellingItems} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <StockList title="Low Stock Products" items={lowStockItems} />
        <RecentOrdersList title="Recent Orders" items={recentOrders ?? []} />
      </div>
    </div>
  )
}
