import { createFileRoute } from '@tanstack/react-router'
import { CategoryList, Checkout } from '@retail/ui'
import { ProductList } from '#/components/ProductList'
import { CartItems, categories, items } from '#/data/products'
import { Cart } from '#/components/Cart'

export const Route = createFileRoute('/pos/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-6 flex">
      <div className="w-8/12">
        <h1 className="text-xl font-bold">All Categories</h1>
        <div className="mt-4">
          <CategoryList categories={categories} />
        </div>

        <div className="mt-8">
          <ProductList products={items} />
        </div>
      </div>
      <div className="w-4/12 ml-12 box-shadow rounded-md px-4 py-2">
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
  )
}
