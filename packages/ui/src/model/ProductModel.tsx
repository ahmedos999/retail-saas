interface ProductModalProps {
  onClose: () => void;
}

export const ProductModel = ({ onClose }: ProductModalProps) => {
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

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              placeholder="e.g. Air Max 90"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors">
                <option value="" disabled selected>
                  Select category
                </option>
                <option>Shoes</option>
                <option>Clothing</option>
                <option>Accessories</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">SKU</label>
              <input
                type="text"
                placeholder="e.g. SKU12345"
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
                min={0}
                step={0.01}
                placeholder="0.00"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                min={0}
                placeholder="0"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors">
              <option value="" disabled selected>
                Select status
              </option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
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
              className="px-4 py-2 rounded-md bg-primary text-white text-sm hover:opacity-90 transition-opacity"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
