import React from "react";
import Bubble from "../Bubble";

const SelectInnerButton = ({
  id,
  title,
  value = [],
  name,
  handleClick,
  btnTitle,
  onChange,
  handleFilter,
  options = [{ label: "", value: "" }],
}) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
    // onChange(e);
  };

  const handleButtonClick = () => {
    if (inputValue) {
      handleClick(inputValue);
      setInputValue("");
    }
  };

  React.useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <>
      <div className="flex flex-col w-full gap-3">
        <div className="w-full flex flex-row justify-between rounded-md border-[1px] border-primary border-solid py-[0.25rem] outline-none px-3 text-primary">
          <select
            id={id}
            className={`w-full rounded-md py-3 outline-none ${
              inputValue === "" ? "text-[#cdcdcd]" : "text-primary"
            } } bg-transparent`}
            defaultValue=""
            value={inputValue}
            onChange={handleChange}
            name={name}
          >
            <option value="" disabled>
              {title}
            </option>
            {options.map((option, index) => (
              <option key={index} className="text-primary" value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            className="w-[20%] bg-primary text-lg text-primary py-1 rounded-md"
            onClick={handleButtonClick}
            type="button"
          >
            {btnTitle}
          </button>
        </div>
        <div className="flex gap-2">
          {value &&
            value?.map((item, index) => (
              <Bubble key={index} title={item} handleFilter={handleFilter} />
            ))}
        </div>
      </div>
    </>
  );
};

export default SelectInnerButton;
