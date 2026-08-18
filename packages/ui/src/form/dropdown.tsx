type DropDownProps = {
  options: string[];
  placeholder?: string;
  id?: string;
  name?: string;
};

export const DropDown = ({
  options,
  placeholder = "Select an option",
  id,
  name,
}: DropDownProps) => {
  return (
    <select
      id={id}
      name={name}
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
