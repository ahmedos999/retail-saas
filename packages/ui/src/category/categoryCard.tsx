import {
  Box,
  Edit,
  View,
  Menu,
  CheckCircle2,
  RotateCcw,
  XCircle,
  Trash,
  Delete,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

interface CategoryCardProps {
  title: string;
  description?: string;
  numberOfProducts: number;
  totalValue: string;
  lowStock: number;
  bgColor?: string;
  icon?: ReactNode;
  onClick?: () => void;
  onView?: () => void;
  onDelete?: () => void;
}

export const CategoryCard = ({
  bgColor,
  icon,
  title,
  description,
  numberOfProducts,
  totalValue,
  lowStock,
  onClick,
  onView,
  onDelete,
}: CategoryCardProps) => {
  // TODO Pass an ID to only keep one delete menu open at a time
  const [deleteMenuOpen, setDeleteMenuOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4 p-4  rounded-md box-shadow">
      <div className="flex gap-4 pb-8 pt-4 border-b border-gray-300">
        <div
          className="min-w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{ backgroundColor: bgColor ? `${bgColor}1A` : "#fee2e2" }}
        >
          {icon ? icon : <Box size={32} className="text-red-800" />}
        </div>
        <div>
          <h4>{title}</h4>
          <p className="text-gray-400 text-sm mt-2 ">{description}</p>
        </div>
      </div>
      <div className="flex justify-between pb-4 border-b border-gray-300">
        <div>
          <h4 className="font-bold">{numberOfProducts}</h4>
          <p className="text-gray-500 text-sm">Products</p>
        </div>
        <div>
          <h4 className="font-bold">{totalValue}</h4>
          <p className="text-gray-500 text-sm">Total Value</p>
        </div>

        <div>
          <h4 className="font-bold">{lowStock}</h4>
          <p className="text-gray-500 text-sm">Low Stock</p>
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={onClick}>
          <Edit size={18} className="mr-1 inline" /> Edit
        </button>
        <button onClick={onView}>
          <View size={18} className="mr-1 inline" /> view products
        </button>
        <button
          className="relative"
          onClick={() => setDeleteMenuOpen(!deleteMenuOpen)}
        >
          <Menu size={18} className="mr-1 inline" />
          {deleteMenuOpen && (
            <div className="absolute right-0 top-full mt-1.5 z-20 w-44 rounded-lg bg-white border border-gray-200 shadow-xl py-1 text-sm">
              <div className="py-1">
                <button
                  type="button"
                  onClick={onDelete}
                  className="w-full text-left px-3 py-2 flex items-center gap-2.5 text-red-700 hover:bg-red-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors font-medium"
                >
                  <Trash size={14} className="text-red-600" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
