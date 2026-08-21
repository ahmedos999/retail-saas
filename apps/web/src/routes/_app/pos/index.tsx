import { createFileRoute } from '@tanstack/react-router'
import { CategoryList, Checkout, Pagination, SaleInfoCard } from '@retail/ui'
import { ProductList } from '#/components/ProductList'
import { Cart } from '#/components/Cart'
import { categoriesQueryOptions } from '#/feature/categories/categories.queries'
import { productsQueryOptions } from '#/feature/products/products.queries'
import { useQuery } from '@tanstack/react-query'
import { getCategoryIcon } from '#/util/getCategoryIcon'
import { useCartStore } from '#/feature/pos/cart.store'
import { useState } from 'react'

export const Route = createFileRoute('/_app/pos/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useRouteContext()
  const [categoryId, setCategoryId] = useState('')
  const {
    items: cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore()
  const { data: networkProducts } = useQuery(
    productsQueryOptions({
      storeId: user.storeId,
      categoryId: categoryId || undefined,
    }),
  )
  const { data: netWorkcategories } = useQuery(
    categoriesQueryOptions({ storeId: user.storeId }),
  )

  const categories =
    netWorkcategories?.map((category) => ({
      id: category.id,
      name: category.name,
      icon: getCategoryIcon(category.icon),
      bgColor: category.color,
    })) ?? []

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 flex">
        <div className="w-8/12 flex flex-col">
          <h1 className="text-xl font-bold">All Categories</h1>
          <div className="mt-4">
            <CategoryList
              categories={categories}
              onClick={setCategoryId}
              selectedID={categoryId}
            />
          </div>

          <div className="mt-8">
            {networkProducts && (
              <ProductList
                products={networkProducts}
                onProductClick={addToCart}
              />
            )}
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
            <Cart
              items={cartItems}
              onQuantityChange={updateQuantity}
              onRemove={removeFromCart}
            />
          </div>
          <div className="mt-4">
            <Checkout
              subtotal={subtotal}
              discount={10}
              taxRate={0.05}
              ClearCart={clearCart}
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
