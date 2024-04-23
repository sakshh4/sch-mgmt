const Select = ({
  id,
  value,
  onChange,
  options = [{ label: "", value: "" }],
  name,
  title,
}) => {
  return (
    <>
      <select
        id={id}
        className={`w-full rounded-md border-[1px] border-primary border-solid py-3 outline-none px-4 ${
          value === "" ? "text-[#cdcdcd]" : "text-primary"
        } } bg-transparent`}
        defaultValue=""
        value={value}
        onChange={onChange}
        name={name}
      >
        <option value="" disabled>
          {" "}
          {title}
        </option>
        {options.map((option, index) => (
          <option key={index} className="text-primary" value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
