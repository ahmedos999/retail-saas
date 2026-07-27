interface ReceiptItem {
  name: string;
  qty: number;
  price: number;
}

interface ReceiptPreviewProps {
  storeName?: string;
  storeAddress?: string;
  storeCity?: string;
}

const defaultItems: ReceiptItem[] = [
  { name: "Air Max 90", qty: 1, price: 99.0 },
  { name: "Slim Fit T-Shirt", qty: 2, price: 19.99 },
  { name: "Wireless Headphones", qty: 1, price: 149.0 },
];

const TAX_RATE = 0.08;

export const ReceiptPreview = ({
  storeName = "My Retail Store",
  storeAddress = "123 Main Street",
  storeCity = "New York, USA",
}: ReceiptPreviewProps) => {
  const subtotal = defaultItems.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="box-shadow p-4 w-full rounded-md">
      <h2 className="font-bold mb-3">Receipt Preview</h2>
      <p className="text-gray-500 text-sm mb-4">
        How your printed receipts will look.
      </p>

      <div className="mx-auto max-w-55 bg-white border border-gray-200 rounded-sm shadow-sm p-4 text-[11px] font-mono text-gray-800 leading-relaxed">
        {/* Header */}
        <div className="text-center mb-2">
          <p className="font-bold text-sm tracking-wide uppercase">
            {storeName}
          </p>
          <p className="text-gray-500">{storeAddress}</p>
          <p className="text-gray-500">{storeCity}</p>
        </div>

        <div className="border-t border-dashed border-gray-300 my-2" />

        <div className="flex justify-between text-gray-500">
          <span>Date:</span>
          <span>Jul 24, 2026</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Receipt #:</span>
          <span>0001</span>
        </div>

        <div className="border-t border-dashed border-gray-300 my-2" />

        {/* Items */}
        <div className="flex flex-col gap-1 mb-1">
          {defaultItems.map((item) => (
            <div key={item.name} className="flex justify-between">
              <span className="truncate max-w-27.5">
                {item.qty}× {item.name}
              </span>
              <span>{fmt(item.price * item.qty)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-gray-300 my-2" />

        {/* Totals */}
        <div className="flex flex-col gap-0.5">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>{fmt(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Tax (8%)</span>
            <span>{fmt(tax)}</span>
          </div>
          <div className="flex justify-between font-bold mt-1 text-[12px]">
            <span>TOTAL</span>
            <span>{fmt(total)}</span>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-300 my-2" />

        {/* Footer */}
        <div className="text-center text-gray-500">
          <p className="uppercase tracking-widest text-[10px]">Cash</p>
          <p className="mt-1 font-semibold">Thank you!</p>
          <p className="text-[9px] text-gray-400 mt-0.5">Please come again</p>
        </div>
      </div>
    </div>
  );
};
