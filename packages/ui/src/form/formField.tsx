import type { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const FormField = ({
  label,
  id,
  className,
  ...props
}: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900   placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition ${className ?? ""}`}
        {...props}
      />
    </div>
  );
};
