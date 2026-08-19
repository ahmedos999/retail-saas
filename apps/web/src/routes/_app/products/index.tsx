import { CueList } from '#/components/CueList'
import { productCueItems } from '#/data/cueItems'
import { productColumns } from '#/data/products'
import { categoriesQueryOptions } from '#/feature/categories/categories.queries'
import { useCreateProduct } from '#/feature/products/products.mutation'
import { productsQueryOptions } from '#/feature/products/products.queries'
import {
  Button,
  DropDown,
  Pagination,
  ProductModel,
  Search,
  Table,
  TableCell,
  TableRow,
} from '@retail/ui'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_app/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useRouteContext()
  const { data: networkProducts } = useQuery(
    productsQueryOptions({ storeId: user?.storeId ?? '' }),
  )
  const { data: categories } = useQuery(
    categoriesQueryOptions({ storeId: user?.storeId ?? '' }),
  )
  const { mutateAsync: createProduct } = useCreateProduct()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {isOpen && (
        <ProductModel
          onClose={() => setIsOpen(false)}
          onSubmit={async (data) => {
            await createProduct(data as any)
            setIsOpen(false)
          }}
          categories={
            categories?.map((c) => ({ id: c.id, name: c.name })) ?? []
          }
          storeId={user?.storeId ?? ''}
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-gray-500">
              Manage your products, inventory and pricing
            </p>
          </div>
          <Button variant="primary" onClick={() => setIsOpen(true)}>
            <div className="flex items-center">
              <Plus className="mr-2" /> <div>Add Product</div>
            </div>
          </Button>
        </div>

        <div className="mt-10 w-full">
          <CueList items={productCueItems} />
        </div>

        <div className="mt-6 flex gap-4">
          <Search placeholder="Search products..." className="flex-1" />
          <DropDown
            options={['Shoes', 'Clothing', 'Accessories']}
            placeholder="All categories"
          />
          <DropDown
            options={['Active', 'Inactive', 'Pending']}
            placeholder="All Status"
          />
        </div>

        {networkProducts && (
          <div className="mt-6">
            <Table columns={productColumns}>
              {networkProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <span
                      className={
                        product.status === 'Active'
                          ? 'text-green-500'
                          : product.status === 'OutOfStock'
                            ? 'text-yellow-500'
                            : 'text-red-500'
                      }
                    >
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="secondary" onClick={() => setIsOpen(true)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
            <Pagination
              totalItems={100}
              pageSize={5}
              currentPage={1}
              onPageChange={(page) => console.log('Page changed to:', page)}
            />
          </div>
        )}
      </div>
    </>
  )
}
