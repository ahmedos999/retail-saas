import { Box, Edit, View, Menu } from "lucide-react";
import type { ReactNode } from "react";

interface CategoryCardProps {
  title: string;
  description?: string;
  numberOfProducts: number;
  revenue: string;
  lowStock: number;
  bgColor?: string;
  icon?: ReactNode;
}

export const CategoryCard = ({
  bgColor,
  icon,
  title,
  description,
  numberOfProducts,
  revenue,
  lowStock,
}: CategoryCardProps) => {
  return (
    <div className="flex flex-col gap-4 p-4  rounded-md box-shadow">
      <div className="flex gap-4 pb-8 pt-4 border-b border-gray-300">
        <div
          className={`w-20 h-20 rounded-3xl flex items-center justify-center ${bgColor ? bgColor : "bg-red-500"}`}
        >
          {icon ? icon : <Box size={32} className="text-red-800" />}
        </div>
        <div>
          <h4>{title}</h4>
          <p className="text-gray-400 text-sm mt-2">{description}</p>
        </div>
      </div>
      <div className="flex justify-between pb-4 border-b border-gray-300">
        <div>
          <h4 className="font-bold">{numberOfProducts}</h4>
          <p className="text-gray-500 text-sm">Products</p>
        </div>
        <div>
          <h4 className="font-bold">{revenue}</h4>
          <p className="text-gray-500 text-sm">Revenue</p>
        </div>

        <div>
          <h4 className="font-bold">{lowStock}</h4>
          <p className="text-gray-500 text-sm">Low Stock</p>
        </div>
      </div>
      <div className="flex justify-between">
        <button>
          <Edit size={18} className="mr-1 inline" /> Edit
        </button>
        <button>
          <View size={18} className="mr-1 inline" /> view products
        </button>
        <button>
          <Menu size={18} className="mr-1 inline" />
        </button>
      </div>
    </div>
  );
};
