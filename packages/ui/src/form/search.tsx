import type { InputHTMLAttributes } from "react";
import { Search as SearchIcon } from "lucide-react";

type SearchProps = InputHTMLAttributes<HTMLInputElement>;

export const Search = ({
  placeholder = "Search...",
  className,
  ...props
}: SearchProps) => {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md focus-within:border-gray-500 transition-colors ${className ?? ""}`}
    >
      <SearchIcon size={16} className="text-gray-400 shrink-0" />
      <input
        type="search"
        placeholder={placeholder}
        className="flex-1 outline-none bg-transparent text-sm placeholder:text-gray-400"
        {...props}
      />
    </div>
  );
};
