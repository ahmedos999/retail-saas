import { Box } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Category = {
  id: string;
  name: string;
  icon?: LucideIcon;
  bgColor?: string;
};

export const CategoryList = ({
  categories,
  onClick,
  selectedID,
}: { categories: Category[] } & {
  onClick: (id: string) => void;
  selectedID?: string;
}) => {
  return (
    <div className="flex gap-4 w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <div
            key={category.id}
            className={`shrink-0 flex gap-2 items-center p-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 cursor-pointer transition-colors ${selectedID === category.id ? "bg-gray-200" : ""}`}
            onClick={() => {
              if (selectedID === category.id) {
                onClick("");
              } else {
                onClick(category.id);
              }
            }}
          >
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center p-1 ${category.bgColor ? category.bgColor : "bg-red-500"}`}
            >
              {Icon ? (
                <Icon size={24} className="text-red-800" />
              ) : (
                <Box size={24} className="text-red-800" />
              )}
            </div>
            {category.name}
          </div>
        );
      })}
    </div>
  );
};
