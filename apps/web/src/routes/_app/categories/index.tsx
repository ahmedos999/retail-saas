import { createFileRoute } from '@tanstack/react-router'
import { Button, CategoryModel, DropDown, Pagination, Search } from '@retail/ui'
import { getCategoryIcon } from '#/util/getCategoryIcon'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { CueList } from '#/components/CueList'
import {
  CategoryCardList,
  type CategoryCardItem,
} from '#/components/CategoryCardList'
import { categoryCueItems, categoryCardItems } from '#/data/cueItems'
import { useQuery } from '@tanstack/react-query'
import { categoriesQueryOptions } from '#/feature/categories/categories.queries'
import { Route as AppRoute } from '#/routes/_app'

export const Route = createFileRoute('/_app/categories/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = AppRoute.useRouteContext()
  const [isOpen, setIsOpen] = useState(false)
  const { data: categories } = useQuery(
    categoriesQueryOptions({ storeId: user?.storeId ?? '' }),
  )

  const categoryCardItems: CategoryCardItem[] =
    categories?.map((category) => ({
      title: category.name,
      description: category.description ?? '',
      icon: getCategoryIcon(category.icon),
      id: category.id,
      lowStock: 50,
      numberOfProducts: 50,
      revenue: '$50,000',
      bgColor: category.color,
    })) ?? []

  return (
    <>
      {isOpen && <CategoryModel onClose={() => setIsOpen(false)} />}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <p>Organize your product categories here.</p>
          </div>
          <Button variant="primary" onClick={() => setIsOpen(true)}>
            <div className="flex items-center">
              <Plus className="mr-2" /> <div>Add Category</div>
            </div>
          </Button>
        </div>

        <div className="mt-10 w-full">
          <CueList items={categoryCueItems} />
        </div>

        <div className="mt-6 flex gap-4">
          <Search placeholder="Search products..." className="flex-1" />
          <DropDown
            options={['Active', 'Inactive', 'Pending']}
            placeholder="All Status"
          />
        </div>

        <div className="mt-4 ">
          <CategoryCardList categories={categoryCardItems} />
        </div>
        <div className="mt-auto">
          <Pagination
            totalItems={100}
            pageSize={5}
            currentPage={1}
            onPageChange={(page) => console.log('Page changed to:', page)}
          />
        </div>
      </div>
    </>
  )
}
