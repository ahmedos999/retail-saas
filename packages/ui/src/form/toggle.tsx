interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export const Toggle = ({
  label,
  checked,
  onChange,
  disabled = false,
}: ToggleProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <span
        className={`text-sm font-medium ${disabled ? "text-gray-400" : "text-gray-700"}`}
      >
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`mt-1 relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
          disabled
            ? "bg-gray-100 cursor-not-allowed opacity-40"
            : checked
              ? "bg-red-600 cursor-pointer"
              : "bg-gray-200 cursor-pointer"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};
