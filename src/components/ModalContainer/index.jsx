import React from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { BsXLg } from "react-icons/bs";
const ModalContainer = ({
  modalOpen,
  closeModal,
  title,
  children,
  isCloseable = true,
  width = "85%",
}) => {
  return modalOpen ? (
    <div className="popup z-[200] top-0 left-0 flex justify-center items-center fixed w-[100vw] min-h-[100vh]">
      <div
        className="bg-[#00000040] cursor-pointer absolute w-[100%] h-[100%]"
        onClick={() => {
          isCloseable && closeModal();
        }}
      ></div>

      <div
        className={`rounded-[8px] max-w-[1000px] py-8 w-full bg-[#fff] relative w-[${width}] overflow-hidden`}
      >
        <div className="header pt-1">
          <h2 className="text-[1.25em] font-semibold text-primary pl-16">
            {title}
          </h2>
          {isCloseable && (
            <div
              className="fa-solid fa-circle-xmark absolute right-[30px] top-[35px] cursor-pointer"
              onClick={() => closeModal()}
            >
              <BsXLg color="#000000" size={24} />
            </div>
          )}
        </div>

        <div className="content__box px-8 flex flex-col gap-[24px]">
          {children}
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalContainer;
