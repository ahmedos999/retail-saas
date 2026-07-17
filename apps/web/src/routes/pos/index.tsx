import { createFileRoute } from '@tanstack/react-router'
import { CategoryList, Checkout, Pagination, SaleInfoCard } from '@retail/ui'
import { ProductList } from '#/components/ProductList'
import { CartItems, categories, items } from '#/data/products'
import { Cart } from '#/components/Cart'

export const Route = createFileRoute('/pos/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 flex">
        <div className="w-8/12 flex flex-col">
          <h1 className="text-xl font-bold">All Categories</h1>
          <div className="mt-4">
            <CategoryList categories={categories} />
          </div>

          <div className="mt-8">
            <ProductList products={items} />
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
        <div className="w-4/12 ml-12 box-shadow rounded-md px-4 py-2 h-fit">
          <h2 className="border-b border-gray-300 py-2 font-bold">
            Current Sale
          </h2>
          <div className="mt-4">
            <Cart items={CartItems} />
          </div>
          <div className="mt-4">
            <Checkout
              subtotal={100}
              discount={10}
              taxRate={0.05}
              ClearCart={() => console.log('Clear Cart')}
              Checkout={() => console.log('Checkout')}
            />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <SaleInfoCard />
      </div>
    </div>
  )
}
