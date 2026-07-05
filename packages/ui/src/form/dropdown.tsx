type DropDownProps = {
  options: string[];
  placeholder?: string;
};

export const DropDown = ({
  options,
  placeholder = "Select an option",
}: DropDownProps) => {
  return (
    <select
      defaultValue=""
      className="text-black py-2 px-3 border rounded-md border-gray-200 box-shadow text-sm"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  );
};
