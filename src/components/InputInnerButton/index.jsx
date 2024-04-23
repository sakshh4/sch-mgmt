import React from "react";
import Bubble from "../Bubble";

const InputInnerButton = ({
  id,
  placeholder,
  title,
  type,
  value,
  name,
  handleClick,
  btnTitle,
  handleFilter,
}) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };

  const handleButtonClick = () => {
    handleClick(inputValue);
    setInputValue("");
  };
  return (
    <>
      <div className="flex flex-col w-full gap-1">
        <label htmlFor={id} className="text-primary text-base">
          {title}
        </label>
        <div className="w-full flex flex-row justify-between rounded-md border-[1px] border-primary bg-white border-solid py-[0.25rem] outline-none px-4 text-primary">
          <input
            id={id}
            type={type}
            className="w-[60%] text-primary outline-none bg-white"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            name={name}
          />
          <button
            className="w-[20%] bg-primary text-base text-primary py-1.5 rounded-md"
            onClick={handleButtonClick}
            type="button"
          >
            {btnTitle}
          </button>
        </div>
        <div className="flex gap-2">
          {value &&
            value.map((item, index) => (
              <Bubble key={index} title={item} handleFilter={handleFilter} />
            ))}
        </div>
      </div>
    </>
  );
};

export default InputInnerButton;
