type DropDownOption = string | { label: string; value: string };

type DropDownProps = {
  options: DropDownOption[];
  placeholder?: string;
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const DropDown = ({
  options,
  placeholder = "Select an option",
  id,
  name,
  value,
  onChange,
}: DropDownProps) => {
  const isControlled = value !== undefined;
  return (
    <select
      id={id}
      name={name}
      {...(isControlled ? { value } : { defaultValue: "" })}
      onChange={(e) => onChange?.(e.target.value)}
      className="text-black py-2 px-3 border rounded-md border-gray-200 box-shadow text-sm"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option, index) => {
        const opt =
          typeof option === "string"
            ? { label: option, value: option }
            : option;
        return (
          <option key={opt.value || index} value={opt.value}>
            {opt.label}
          </option>
        );
      })}
    </select>
  );
};
