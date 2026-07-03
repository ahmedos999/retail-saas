import { Box } from "lucide-react";

type CueCardProps = {
  title: string;
  value: string;
  percentage?: string;
  icon?: React.ReactNode;
  bgColor?: string;
};

export const CueCard = ({
  title,
  value,
  percentage,
  icon,
  bgColor,
}: CueCardProps) => {
  return (
    <div className="flex flex-1 justify-center  gap-6 rounded-lg bg-white p-6 box-shadow">
      <div
        className={`w-16 h-16 rounded-3xl flex items-center justify-center ${bgColor ? bgColor : "bg-red-500"}`}
      >
        {icon ? icon : <Box size={24} className="text-red-800" />}
      </div>
      <div>
        <h2 className=" text-gray-500">{title}</h2>
        <p className=" font-bold text-2xl">{value}</p>
        {/* TODO make it red when it less than last month */}
        {percentage && <p className=" text-green-500 text-xs">{percentage}</p>}
        {percentage && <p className=" text-gray-500 text-xs">vs last month</p>}
      </div>
    </div>
  );
};
