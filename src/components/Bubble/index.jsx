import { FaCircleXmark } from "react-icons/fa6";

const Bubble = ({ key, title, handleFilter }) => {
  const handleRemoveSubject = () => {
    handleFilter(title);
  };
  return (
    <div
      key={key}
      className=" flex justify-evenly items-center rounded-full bg-secondary text-primary py-1 text-sm gap-x-1"
    >
      <div className="pl-4">{title}</div>
      <div className="ml-auto mr-2">
        <FaCircleXmark
          color="#ff0000"
          size={14}
          onClick={handleRemoveSubject}
        />
      </div>
    </div>
  );
};

export default Bubble;
