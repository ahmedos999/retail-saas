import { createLazyFileRoute } from '@tanstack/react-router'
import {
  Button,
  CategoryModel,
  DropDown,
  Pagination,
  Search,
  ViewProductsModel,
  type ProductData,
} from '@retail/ui'
import { getCategoryIcon } from '#/util/getCategoryIcon'
import { debounce } from '#/util/debounce'
import { Box, DollarSign, Plus, Tag } from 'lucide-react'
import { useMemo, useState } from 'react'
import { CueList } from '#/components/CueList'
import {
  CategoryCardList,
  type CategoryCardItem,
} from '#/components/CategoryCardList'
import { useQueries, useQuery } from '@tanstack/react-query'
import {
  categoriesQueryOptions,
  emptyCategoriesQueryOptions,
  largestCategoriesQueryOptions,
  totalCategoriesQueryOptions,
} from '#/feature/categories/categories.queries'
import { Route as AppRoute } from '#/routes/_app'
import {
  useCreateCategory,
  useDeleteCategory,
} from '#/feature/categories/categories.mutation'
import {
  productsQueryOptions,
  productsTotalMetricsQueryOptions,
} from '#/feature/products/products.queries'
import type { Category } from '#/feature/categories/categories.types'
import { updateCategory } from '#/feature/categories/categories.api'
import { ToastContainer, toast } from 'react-toastify'

export const Route = createLazyFileRoute('/_app/categories/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = AppRoute.useRouteContext()
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null)
  const [categoryToView, setCategoryToView] = useState<Category | null>(null)
  const { data: categories } = useQuery(
    categoriesQueryOptions({ storeId: user.storeId, search, page }),
  )

  const { data: categoryProducts, isLoading: isCategoryProductsLoading } =
    useQuery({
      ...productsQueryOptions({
        storeId: user.storeId,
        categoryId: categoryToView?.id,
      }),
      enabled: Boolean(categoryToView),
    })
  const { mutateAsync: deleteCategory } = useDeleteCategory()

  // metrics

  const [
    { data: totalCategories },
    { data: largestCategory },
    { data: emptyCategories },
    { data: productsTotalMetrics },
  ] = useQueries({
    queries: [
      totalCategoriesQueryOptions(user.storeId),
      largestCategoriesQueryOptions(user.storeId),
      emptyCategoriesQueryOptions(user.storeId),
      productsTotalMetricsQueryOptions(user.storeId),
    ],
  })

  const { mutateAsync: createCategory } = useCreateCategory()

  // keep the debounced setter stable across renders
  const debouncedSetSearch = useMemo(() => debounce(setSearch, 500), [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearch(e.target.value)
  }

  const handleEditCategory = (category: Category) => {
    setCategoryToEdit(category)
    setIsOpen(true)
  }

  const handleViewCategoryProducts = (category: Category) => {
    setCategoryToView(category)
  }

  const categoryCardItems: CategoryCardItem[] =
    categories?.map((category) => ({
      onEdit: () => handleEditCategory(category),
      onView: () => handleViewCategoryProducts(category),
      onDelete: () => {
        deleteCategory(category.id)
        toast.success('Category deleted successfully')
      },
      title: category.name,
      description: category.description ?? '',
      icon: getCategoryIcon(category.icon),
      id: category.id,
      lowStock: category.outOfStockCount,
      numberOfProducts: category.productCount,
      totalValue: `$${category.totalValue.toLocaleString('en-US')}`,
      bgColor: category.color,
    })) ?? []

  const viewProductItems: ProductData[] =
    categoryProducts?.map((product) => ({
      storeId: product.storeId,
      name: product.name,
      sku: product.sku,
      price: product.price,
      stock: product.stock,
      costPrice: product.costPrice,
      status: product.status,
      categoryId: product.categoryId,
    })) ?? []

  return (
    <>
      {isOpen && (
        <CategoryModel
          onClose={() => setIsOpen(false)}
          onSubmit={async (data) => {
            if (categoryToEdit) {
              await updateCategory(categoryToEdit.id, {
                ...data,
                storeId: user?.storeId ?? '',
              })
            } else {
              await createCategory({ ...data, storeId: user?.storeId ?? '' })
            }
            setIsOpen(false)
          }}
          categoryToEdit={categoryToEdit}
        />
      )}
      {categoryToView && (
        <ViewProductsModel
          onClose={() => setCategoryToView(null)}
          title={`Products in ${categoryToView.name}`}
          loading={isCategoryProductsLoading}
          products={viewProductItems}
        />
      )}
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
          <CueList
            items={[
              {
                title: 'Total Categories',
                value: totalCategories?.data?.total?.toString() ?? '-',
                percentage: '12.2%',
                icon: <Box size={24} className="text-red-800" />,
                bgColor: 'bg-red-200',
              },
              {
                title: 'Largest Category',
                value: largestCategory?.data?.name ?? '-',
                percentage: '5.2%',
                icon: <DollarSign size={24} className="text-blue-800" />,
                bgColor: 'bg-blue-200',
              },
              {
                title: 'Empty Categories',
                value: emptyCategories?.data?.total?.toString() ?? '-',
                percentage: '8.5%',
                icon: <Box size={24} className="text-green-800" />,
                bgColor: 'bg-green-200',
              },
              {
                title: 'Total Products',
                value: productsTotalMetrics?.data?.total?.toString() ?? '-',
                percentage: '2.1%',
                icon: <Tag size={24} className="text-yellow-800" />,
                bgColor: 'bg-yellow-200',
              },
            ]}
          />
        </div>

        <div className="mt-6 flex gap-4">
          <Search
            placeholder="Search products..."
            className="flex-1"
            onChange={handleSearchChange}
          />
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
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  )
}
