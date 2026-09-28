import { Table, TableRow, TableCell } from "../table";

export interface ProductData {
  storeId: string;
  name: string;
  sku: string;
  price: string;
  stock: number;
  status: "Active" | "Inactive" | "OutOfStock";
}

interface ViewProductsModalProps {
  onClose: () => void;
  title: string;
  loading: boolean;
  products: ProductData[] | null;
}

const productheaders = [
  { key: "name", header: "Name" },
  { key: "sku", header: "SKU" },
  { key: "price", header: "Unit Price" },
  { key: "stock", header: "Stock" },
  { key: "status", header: "Status" },
];

export const ViewProductsModel = ({
  onClose,
  title,
  loading,
  products,
}: ViewProductsModalProps) => {
  return (
    <div
      className="flex items-center justify-center h-full w-full bg-gray-800/80 absolute top-0 left-0 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {products && products?.length > 0 ? (
              <Table columns={productheaders}>
                {products.map((item) => (
                  <TableRow key={item.sku}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))}
              </Table>
            ) : (
              <div>No products available</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
