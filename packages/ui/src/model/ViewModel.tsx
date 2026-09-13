import { ClipboardList, History, Package, ReceiptText, X } from "lucide-react";
import { Table, TableCell, TableRow } from "../table";

type OrderDetailItem = {
  id?: string;
  orderId?: string;
  productId: string;
  productName: string;
  quantity: number;
  sku: string;
  totalPrice: number | string;
  unitPrice: number | string;
};

type ViewOrderModal = {
  orderNumber: string;
  createdAt?: Date | string;
  customerName: string;
  status: "Pending" | "Refunded" | "Completed" | "Cancelled";
  paymentMethod: "Cash" | "Card" | "Online" | "Other";
  subtotal: number | string;
  total: number | string;
  taxRate?: number | string;
  taxAmount: number | string;
};

interface ViewOrderModalProps {
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  isPending?: boolean;
  error?: string | null;
  currentOrder: ViewOrderModal;
  orderDetails?: OrderDetailItem[];
}

const statusStyles: Record<ViewOrderModal["status"], string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Refunded: "bg-purple-100 text-purple-700",
};

export const getStatusColor = (status: ViewOrderModal["status"]): string =>
  statusStyles[status];

const itemColumns = [
  { key: "product", header: "Product" },
  { key: "sku", header: "SKU" },
  { key: "unitPrice", header: "Unit Price" },
  { key: "quantity", header: "QTY" },
  { key: "total", header: "Total" },
];

type TimelineEvent = {
  label: string;
  date: string;
};

const Timeline = ({ events }: { events: TimelineEvent[] }) => (
  <div className="relative">
    <div className="absolute left-1.5 top-3 bottom-3 w-px bg-green-200" />
    <div className="relative space-y-5">
      {events.map((event, index) => (
        <div
          className="flex items-center justify-between gap-2 text-sm"
          key={`${event.label}-${index}`}
        >
          <div className="flex items-center gap-2">
            <div className="z-10 h-3 w-3 rounded-full bg-green-500 ring-4 ring-white" />
            <p>{event.label}</p>
          </div>
          <p className="text-xs text-gray-500">{event.date}</p>
        </div>
      ))}
    </div>
  </div>
);

export const ViewOrderModal = ({
  onClose,
  orderDetails,
  currentOrder,
}: ViewOrderModalProps) => {
  return (
    <div
      className="flex items-center justify-center h-full w-full bg-gray-800/80 absolute top-0 left-0 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-7xl p-6 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <ClipboardList size={24} className="text-red-600" />
                </span>
                <span>Order {currentOrder.orderNumber} </span>
                <p
                  className={`text-sm p-1 rounded-md font-semibold ${getStatusColor(currentOrder.status)}`}
                >
                  {currentOrder.status}
                </p>
              </h2>
              <div className="flex gap-3 text-sm">
                <p className="text-gray-500">
                  {" "}
                  {String(currentOrder.createdAt).split("T")[0]}
                </p>{" "}
                -
                <p className="text-gray-500">
                  Customer: {currentOrder.customerName}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-3">
              <div className="box-shadow rounded-md p-4 shadow-md">
                <h4 className="font-semibold mb-4 flex items-center gap-3">
                  <Package size={18} className="text-gray-600" />
                  Items ({orderDetails?.length ?? 0})
                </h4>
                <div className="mt-4">
                  {!(orderDetails?.length && orderDetails?.length > 0) ? (
                    <p>
                      There is not Items for Order {currentOrder.orderNumber}
                    </p>
                  ) : (
                    <Table columns={itemColumns}>
                      {orderDetails.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell>{item.sku}</TableCell>
                          <TableCell>{item.unitPrice}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.totalPrice}</TableCell>
                        </TableRow>
                      ))}
                    </Table>
                  )}
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="box-shadow rounded-md p-4 text-sm">
                <h4 className="mb-4 font-semibold flex items-center gap-3">
                  <ReceiptText size={24} className="text-gray-600" />
                  Order Summary
                </h4>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p>Subtotal:</p>
                    <p>{currentOrder.subtotal}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Tax:</p>
                    <p>{currentOrder.taxAmount}</p>
                  </div>
                </div>
                <div className="flex justify-between border-t border-gray-300 mt-4 pt-3 font-semibold">
                  <p>Total:</p>
                  <p>{currentOrder.total}</p>
                </div>
                {/* Order summary details go here */}
              </div>
              <div className="box-shadow rounded-md p-4">
                <h4 className="mb-4 font-semibold flex items-center gap-3">
                  <History size={18} className="text-gray-600" />
                  Timeline
                </h4>
                <Timeline
                  events={[
                    {
                      label: "Order Placed",
                      date: String(currentOrder.createdAt).split("T")[0],
                    },
                    {
                      label: "Order Shipped",
                      date: String(currentOrder.createdAt).split("T")[0],
                    },
                    {
                      label: "Order Delivered",
                      date: String(currentOrder.createdAt).split("T")[0],
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
