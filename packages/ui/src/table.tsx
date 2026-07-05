import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface TableColumn {
  key: string;
  header: ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  children: ReactNode;
}

interface TableRowProps {
  children: ReactNode;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export const Table = ({ columns, children }: TableProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-md box-shadow border border-gray-200">
      <table className="w-full text-sm bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">{children}</tbody>
      </table>
    </div>
  );
};

export const TableRow = ({ children }: TableRowProps) => {
  return <tr className="hover:bg-gray-50 transition-colors">{children}</tr>;
};

export const TableCell = ({ children, className }: TableCellProps) => {
  return (
    <td className={`px-4 py-3 text-gray-700 ${className ?? ""}`}>{children}</td>
  );
};

export interface PaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) return null;

  // Build the visible page list with "..." gaps
  const getPages = (): (number | "...")[] => {
    const delta = 2; // neighbours on each side of current page
    const range: number[] = [];

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    for (let i = left; i <= right; i++) range.push(i);

    const result: (number | "...")[] = [1];
    if (left > 2) result.push("...");
    result.push(...range);
    if (right < totalPages - 1) result.push("...");
    if (totalPages > 1) result.push(totalPages);

    return result;
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-between px-2 py-3 text-sm text-gray-600">
      <span>
        Page {currentPage} of {totalPages} &mdash; {totalItems} items
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((page, i) =>
          page === "..." ? (
            <span
              key={`dots-${i}`}
              className="w-8 h-8 flex items-center justify-center text-gray-400 text-xs select-none"
            >
              &hellip;
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                page === currentPage
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
