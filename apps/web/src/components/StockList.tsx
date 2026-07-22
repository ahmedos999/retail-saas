import { Table, TableRow, TableCell } from '@retail/ui'

export interface StockListItem {
  product: string
  image: string
  stock: number
}

interface StockListProps {
  title: string
  items: StockListItem[]
}

const StockList = ({ title, items }: StockListProps) => {
  return (
    <div className="p-4 box-shadow rounded-md bg-white">
      <div className="flex justify-between border-b border-gray-300 pb-4 mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <button className="bg-white border rounded-md py-1 px-2 text-sm">
          View all
        </button>
      </div>
      <Table columns={[]}>
        {items.map((item) => (
          <TableRow key={item.product}>
            <TableCell>
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.product}
                  className="w-9 h-9 rounded-md object-cover border border-gray-200"
                />
                <span>{item.product}</span>
              </div>
            </TableCell>
            <TableCell className="font-bold text-secondary">
              {item.stock} left
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  )
}

export default StockList
