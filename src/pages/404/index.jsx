import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-cover bg-bookings flex flex-col h-screen justify-center items-center space-y-10">
        <img
          src={"/assets/notFound.png"}
          className="w-[250px]"
          alt="404 Page"
        />
        <h2 className="text-[#7C888D] text-[24px] font-[600]">
          Page not found!
        </h2>
        <p className="w-[30%] text-center text-[#7C888D] mt-[20px] font-[500]">
          Looks like the page you are looking for doesn’t exist. Try exploring
          the homepage again
        </p>
        <button
          className="bg-[#F2C347] rounded-[4px] px-[40px] py-[12.5px] text-[var(--dark)] font-[600] mt-[40px]"
          onClick={() => navigate("/")}
        >
          Back to Homepage
        </button>
      </div>
    </>
  );
};

export default NotFound;
