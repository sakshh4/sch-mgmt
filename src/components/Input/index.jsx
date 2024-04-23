const Input = ({
  id,
  placeholder,
  type,
  title,
  styles,
  value,
  name,
  onClick,
}) => {
  return (
    <>
      <label htmlFor={id} className="text-primary text-base">
        {title}
      </label>
      <input
        id={id}
        type={type}
        className={` ${styles} w-full rounded-md border-[1px] border-primary border-solid bg-transparent py-[0.6rem] outline-none px-4 text-primary`}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onClick}
      />
    </>
  );
};

export default Input;
