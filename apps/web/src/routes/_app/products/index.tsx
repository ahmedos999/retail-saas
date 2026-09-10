import { CueList } from '#/components/CueList'
import { productCueItems } from '#/data/cueItems'
import { productColumns } from '#/data/products'
import { categoriesQueryOptions } from '#/feature/categories/categories.queries'
import {
  useCreateProduct,
  useUpdateProduct,
} from '#/feature/products/products.mutation'
import { productsQueryOptions } from '#/feature/products/products.queries'
import type { Product } from '#/feature/products/products.types'
import { debounce } from '#/util/debounce'
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
import { useMemo, useState } from 'react'

export const Route = createFileRoute('/_app/products/')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(
      productsQueryOptions({ storeId: context.user.storeId }),
    )
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useRouteContext()
  const { data: categories } = useQuery(
    categoriesQueryOptions({ storeId: user.storeId }),
  )

  const [categoryId, setCategoryId] = useState('')
  const [search, setSearch] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState<Product['status'] | ''>('')
  const [productToEdit, setProductToEdit] = useState<Product | null>(null)
  const { data: networkProducts } = useQuery(
    productsQueryOptions({
      storeId: user.storeId,
      categoryId: categoryId,
      status: status || undefined,
      search: search,
    }),
  )

  const { mutateAsync: updateProduct } = useUpdateProduct()

  function handleEditProduct(product: Product) {
    setProductToEdit(product)
    setIsOpen(true)
  }

  const debouncedSetSearch = useMemo(() => debounce(setSearch, 300), [])

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('Search term changed:', event.target.value)
    setSearchTerm(event.target.value)
    debouncedSetSearch(event.target.value)
  }

  const { mutateAsync: createProduct } = useCreateProduct()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {isOpen && (
        <ProductModel
          onClose={() => setIsOpen(false)}
          onSubmit={async (data) => {
            if (productToEdit) {
              await updateProduct({
                productId: productToEdit.id,
                product: data as Product,
              })
            } else {
              await createProduct(data as Product)
            }
            setProductToEdit(null)
            setIsOpen(false)
          }}
          categories={
            categories?.map((c) => ({ id: c.id, name: c.name })) ?? []
          }
          storeId={user.storeId}
          product={productToEdit}
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
          <Search
            placeholder="Search products..."
            className="flex-1"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <DropDown
            options={[
              { label: 'All categories', value: '' },
              ...(categories?.map((c) => ({ label: c.name, value: c.id })) ??
                []),
            ]}
            placeholder="All categories"
            value={categoryId}
            onChange={setCategoryId}
          />
          <DropDown
            options={[
              { label: 'All', value: '' },
              { label: 'Active', value: 'Active' },
              { label: 'Inactive', value: 'Inactive' },
              { label: 'Out of Stock', value: 'OutOfStock' },
            ]}
            placeholder="All Status"
            value={status}
            onChange={(value) => setStatus(value as Product['status'] | '')}
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
                    <Button
                      variant="secondary"
                      onClick={() => handleEditProduct(product)}
                    >
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
