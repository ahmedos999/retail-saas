import { useActionState } from "react";

export interface CreateProductData {
  storeId: string;
  name: string;
  sku: string;
  price: string;
  stock: number;
  costPrice: string;
  status: "Active" | "Inactive" | "OutOfStock";
  categoryId: string;
}

interface ProductModalProps {
  onClose: () => void;
  onSubmit: (data: CreateProductData) => Promise<void>;
  categories: { id: string; name: string }[];
  storeId: string;
}

export const ProductModel = ({
  onClose,
  onSubmit,
  categories,
  storeId,
}: ProductModalProps) => {
  const [error, action, isPending] = useActionState(
    async (_prev: string | null, formData: FormData) => {
      try {
        await onSubmit({
          storeId,
          name: formData.get("name") as string,
          sku: formData.get("sku") as string,
          price: formData.get("price") as string,
          stock: Number(formData.get("stock")),
          costPrice: formData.get("costPrice") as string,
          status: formData.get("status") as CreateProductData["status"],
          categoryId: formData.get("categoryId") as string,
        });
        return null;
      } catch (e) {
        return (e as Error).message ?? "Something went wrong";
      }
    },
    null,
  );

  return (
    <div
      className="flex items-center justify-center h-full w-full bg-gray-800/80 absolute top-0 left-0 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Add Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <form className="flex flex-col gap-4" action={action}>
          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Air Max 90"
              required
              className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="categoryId"
                required
                defaultValue=""
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors"
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">SKU</label>
              <input
                type="text"
                name="sku"
                placeholder="e.g. SKU12345"
                required
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                min={0}
                step={0.01}
                placeholder="0.00"
                required
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Cost Price ($)
              </label>
              <input
                type="number"
                name="costPrice"
                min={0}
                step={0.01}
                placeholder="0.00"
                required
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                name="stock"
                min={0}
                placeholder="0"
                required
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                defaultValue="Active"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="OutOfStock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 rounded-md bg-primary text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
