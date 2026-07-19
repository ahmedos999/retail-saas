import { Box } from "lucide-react";

type Category = {
  id: number;
  name: string;
  icon?: React.ReactNode;
  bgColor?: string;
};

export const CategoryList = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="flex gap-4 w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
      {categories.map((category) => (
        <div
          key={category.id}
          className="shrink-0 flex gap-2 items-center p-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 cursor-pointer transition-colors"
        >
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center p-1 ${category.bgColor ? category.bgColor : "bg-red-500"}`}
          >
            {category.icon ? (
              category.icon
            ) : (
              <Box size={24} className="text-red-800" />
            )}
          </div>
          {category.name}
        </div>
      ))}
    </div>
  );
};
