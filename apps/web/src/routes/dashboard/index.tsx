import { CueList } from '#/components/CueList'
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
    </div>
  )
}
