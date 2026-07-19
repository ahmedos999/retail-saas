import { createFileRoute } from '@tanstack/react-router'
import { Button, CategoryModel, DropDown, Pagination, Search } from '@retail/ui'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { CueList } from '#/components/CueList'
import { CategoryCardList } from '#/components/CategoryCardList'
import { categoryCueItems, categoryCardItems } from '#/data/cueItems'

export const Route = createFileRoute('/categories/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {isOpen && <CategoryModel onClose={() => setIsOpen(false)} />}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <p>Organize your product categories here.</p>
          </div>
          <Button variant="secondary" onClick={() => setIsOpen(true)}>
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
