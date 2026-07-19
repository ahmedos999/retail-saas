type Category = {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  isActive: boolean;
  createdAt: Date;
};

interface CategoryModalProps {
  onClose: () => void;
  onSubmit?: (category: Omit<Category, "id" | "createdAt">) => void;
}

export const CategoryModel = ({ onClose, onSubmit }: CategoryModalProps) => {
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
          <h2 className="text-xl font-bold">Add Category</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            onSubmit?.({
              name: data.get("name") as string,
              description: (data.get("description") as string) || undefined,
              color: (data.get("color") as string) || undefined,
              icon: (data.get("icon") as string) || undefined,
              isActive: data.get("isActive") === "true",
            });
          }}
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Electronics"
              required
              className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="e.g. Electronic devices and accessories"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Color</label>
              <input
                type="text"
                name="color"
                placeholder="e.g. #3B82F6"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Icon</label>
              <input
                type="text"
                name="icon"
                placeholder="e.g. tag"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              name="isActive"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500 transition-colors"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
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
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
