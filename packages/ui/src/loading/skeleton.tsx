interface ChartSkeletonProps {
  title: string;
}

export const ChartSkeleton = ({ title }: ChartSkeletonProps) => {
  return (
    <div className="p-4 rounded-md bg-white box-shadow">
      <h2 className="font-bold mb-2">{title}</h2>
      <div className="skeleton-shimmer h-7 w-40 rounded-md mb-4" />
      <div className="skeleton-shimmer h-85 w-full rounded-md" />
    </div>
  );
};

interface ListSkeletonProps {
  title: string;
  rows?: number;
}

export const ListSkeleton = ({ title, rows = 3 }: ListSkeletonProps) => {
  return (
    <div className="p-4 box-shadow rounded-md bg-white">
      <div className="flex justify-between border-b border-gray-300 pb-4 mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="skeleton-shimmer w-9 h-9 rounded-md shrink-0" />
            <div className="skeleton-shimmer h-4 flex-1 rounded" />
            <div className="skeleton-shimmer h-4 w-16 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};
