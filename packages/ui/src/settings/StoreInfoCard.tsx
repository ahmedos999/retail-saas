import { BadgeCheck, CalendarDays, MapPin, Tag } from "lucide-react";

interface StoreInfoCardProps {
  logo?: string;
  name: string;
  type: string;
  location: string;
  createdAt: string;
  plan: string;
  version: string;
}

export const StoreInfoCard = ({
  logo,
  name,
  type,
  location,
  createdAt,
  plan,
  version,
}: StoreInfoCardProps) => {
  return (
    <div className="box-shadow p-4 w-full rounded-md">
      <div className="flex flex-col items-center text-center gap-3 pb-4 border-b border-gray-100">
        <div className="h-16 w-16 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
          {logo ? (
            <img
              src={logo}
              alt={`${name} logo`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-gray-400">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <p className="font-bold text-gray-800">{name}</p>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {type}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-gray-400 shrink-0" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays size={14} className="text-gray-400 shrink-0" />
          <span>Created {createdAt}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-gray-500">
            <BadgeCheck size={14} className="text-green-500" />
            <span>Plan</span>
          </div>
          <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs">
            {plan}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Tag size={14} className="text-gray-400" />
            <span>Version</span>
          </div>
          <span className="font-medium text-gray-700 text-xs">{version}</span>
        </div>
      </div>
    </div>
  );
};
