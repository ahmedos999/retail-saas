import { Table, TableRow, TableCell } from "../table";

export interface ListViewItem {
  product: string;
  image: string;
  sold: number;
  revenue: string;
}

interface ListViewProps {
  title: string;
  items: ListViewItem[];
}

const columns = [
  { key: "product", header: "Product" },
  { key: "sold", header: "Sold" },
  { key: "revenue", header: "Revenue" },
];

const ListView = ({ title, items }: ListViewProps) => {
  return (
    <div className="p-4 box-shadow rounded-md bg-white">
      <div className="flex justify-between border-b border-gray-300 pb-4 mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <button className="bg-white border rounded-md py-1 px-2 text-sm">
          View all
        </button>
      </div>
      <Table columns={columns}>
        {items.map((item, index) => (
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
            <TableCell className={`${index === 0 ? "font-bold" : ""}`}>
              {item.sold}
            </TableCell>
            <TableCell className={`${index === 0 ? "font-bold" : ""}`}>
              {item.revenue}
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
};

export default ListView;
