import { CueList } from '#/components/CueList'
import {
  Button,
  DropDown,
  Pagination,
  Search,
  Table,
  TableCell,
  TableRow,
  type TableColumn,
} from '@retail/ui'
import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  const columns: TableColumn[] = [
    { key: 'product', header: 'Product' },
    { key: 'category', header: 'Category' },
    { key: 'SKU', header: 'SKU' },
    { key: 'stock', header: 'Stock' },
    { key: 'price', header: 'Price' },
    { key: 'status', header: 'Status' },
    { key: 'actions', header: 'Actions' },
  ]
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

      <div className="mt-6">
        <Table columns={columns}>
          <TableRow>
            <TableCell>Product A</TableCell>
            <TableCell>Category A</TableCell>
            <TableCell>SKU12345</TableCell>
            <TableCell>50</TableCell>
            <TableCell>$19.99</TableCell>
            <TableCell>
              <span className="text-green-500">In Stock</span>
            </TableCell>
            <TableCell>
              <Button variant="secondary">Edit</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Product B</TableCell>
            <TableCell>Category B</TableCell>
            <TableCell>SKU67890</TableCell>
            <TableCell>30</TableCell>
            <TableCell>$29.99</TableCell>
            <TableCell>
              <span className="text-green-500">In Stock</span>
            </TableCell>
            <TableCell>
              <Button variant="secondary">Edit</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Product C</TableCell>
            <TableCell>Category C</TableCell>
            <TableCell>SKU11223</TableCell>
            <TableCell>20</TableCell>
            <TableCell>$39.99</TableCell>
            <TableCell>
              <span className="text-green-500">In Stock</span>
            </TableCell>
            <TableCell>
              <Button variant="secondary">Edit</Button>
            </TableCell>
          </TableRow>
        </Table>
        <Pagination
          totalItems={100}
          pageSize={5}
          currentPage={1}
          onPageChange={(page) => console.log('Page changed to:', page)}
        />
      </div>
    </div>
  )
}
