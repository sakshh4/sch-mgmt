import React from "react";
import { SidebarItems } from "../../constants/sidebar";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { logo } from "../../assets";
// color - f8f8f866
const Sidebar = () => {
  const navigate = useNavigate();
  const { selectedTab, setSelectedTab } = React.useContext(GlobalContext);
  return (
    <div className="w-full min-h-[100vh] bg-primary py-6 px-4 flex flex-col">
      <div className="flex flex-row text-3xl gap-x-4 font-[500] tracking-wide text-primary px-3">
        <img src={logo} alt="logo" className="w-[25%] max-h-[80px]" />
        <div className="flex flex-1 justify-start items-center">
          Pearls School
        </div>
      </div>
      <div className="flex flex-col gap-y-3 w-full py-8 pt-12">
        {SidebarItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-row text-base gap-x-3 font-bold text-primary tracking-wide justify-start items-center px-4 py-[10px] cursor-pointer ${
              selectedTab === item.title && "bg-[#e9eaec] rounded-md "
            }`}
            onClick={() => {
              navigate(item.link);
              setSelectedTab(item.title);
            }}
          >
            <item.Icon
              fill={selectedTab === item.title ? "#333333" : "#5a5a5a"}
              width="18px"
              height="18px"
            />
            <div
              className={`${
                selectedTab === item.title ? "text-[#333333]" : "text-[#5a5a5a]"
              }`}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
