import { type LucideIcon } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";

export interface NavLink {
  label: string;
  icon: LucideIcon;
  link: "dashboard" | "products" | "categories" | "pos" | "orders";
}

interface SideBarProps {
  links: NavLink[];
}

export const SideBar = ({ links }: SideBarProps) => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex bg-primary h-screen flex-col w-fit justify-between p-6 ">
      <div className="text-white text-2xl font-bold">Logo</div>
      <div>
        <ul className="flex flex-col gap-4">
          {links.map(({ label, icon: Icon, link }) => {
            const isActive = pathname === `/${link}`;
            return (
              <li
                key={label}
                className={`text-white cursor-pointer p-2 rounded-md transition-colors ${isActive ? "bg-secondary" : "hover:text-gray-300 hover:bg-secondary"}`}
              >
                <Link to={`/${link}`} className="flex items-center gap-3">
                  <Icon size={20} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center gap-3 text-white">
        <div className="w-9 aspect-square rounded-full flex justify-center items-center bg-gray-500">
          AO
        </div>
        <div>
          <h4>Ahmed Osman</h4>
          <p className="text-sm text-gray-300">Admin</p>
        </div>
      </div>
    </div>
  );
};
