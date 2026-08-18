import { Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { FormField } from "../form/formField";
import { DropDown } from "../form/dropdown";

interface AddUserModalProps {
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  isPending?: boolean;
  error?: string | null;
}

export const AddUserModal = ({
  onClose,
  onSubmit,
  isPending,
  error,
}: AddUserModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  return (
    <div
      className="flex items-center justify-center h-full w-full bg-gray-800/80 absolute top-0 left-0 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Add User</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form className="flex flex-col gap-4" action={onSubmit}>
          <FormField
            id="fullName"
            name="fullName"
            label="Full Name"
            placeholder="John Doe"
            required
          />
          <FormField
            id="email"
            name="email"
            label="Email Address"
            type="email"
            placeholder="user@example.com"
            required
          />
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter password"
                autoComplete="new-password"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="role" className="text-sm font-medium text-gray-700">
              Role
            </label>
            <DropDown
              id="role"
              name="role"
              options={["Owner", "Manager", "Cashier"]}
              placeholder="Select role"
            />
          </div>

          {passwordError && (
            <p className="text-sm text-red-600">{passwordError}</p>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isPending ? "Adding…" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
