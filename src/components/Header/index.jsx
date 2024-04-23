import React from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import { avatar } from "../../assets";

const Header = () => {
  const { setIsAuth } = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const handleClick = () => {
    setIsAuth(false);
    navigate("/");
  };
  return (
    <div className="flex flex-row w-full justify-end items-center p-6 px-10 border-b-[1px] border-solid border-gray-100 bg-white shadow-sm">
      <button className="flex justify-end w-full" onClick={handleClick}>
        <img src={avatar} alt="avatar" className="w-[40px] h-[40px]" />
      </button>
    </div>
  );
};

export default Header;
