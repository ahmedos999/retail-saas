import { CueList } from '#/components/CueList'
import { Button, Search } from '@retail/ui'
import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-500">
            Manage your products, inventory and pricing
          </p>
        </div>
        <Button variant="secondary">
          <div className="flex items-center">
            <Plus className="mr-2" /> <div>Add Product</div>
          </div>
        </Button>
      </div>

      <div className="mt-10 w-full">
        <CueList />
      </div>

      <div className="mt-6">
        <Search placeholder="Search products..." />
      </div>
    </div>
  )
}
