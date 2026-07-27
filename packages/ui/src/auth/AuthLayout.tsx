import type { ReactNode } from "react";
import { CheckCircle2, Store } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

const features = [
  "Real-time sales & inventory tracking",
  "Built-in POS system",
  "Orders, categories & product management",
  "Receipt customisation & tax settings",
];

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-screen">
      {/* Left — branding panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-primary flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
            <Store size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">RetailOS</span>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-bold leading-tight">
              Your complete
              <br />
              retail management
              <br />
              platform.
            </h1>
            <p className="mt-4 text-white/60 text-sm leading-relaxed">
              Everything you need to run your store — from inventory to
              checkout, all in one place.
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-3 text-sm text-white/80"
              >
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} RetailOS. All rights reserved.
        </p>
      </div>

      {/* Right — form panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
