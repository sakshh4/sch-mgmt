// import { Input } from 'antd'
import React from "react";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Select } from "antd";
import { postAuthData } from "../../apis/authAPI";
import { ToastContainer, toast } from "react-toastify";
// import { postUserData } from "../../apis/authAPI";

const Auth = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    role: null,
  });
  const navigate = useNavigate();
  const { setIsAuth } = React.useContext(GlobalContext);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await postAuthData(formData);
  //     console.log(res);
  //     if (res.success) {
  //       setIsAuth(true);
  //       navigate("/");
  //     }
  //     toast.error(res.message, {
  //       position: "top-right",
  //       theme: "colored",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleClick = () => {
    if (formData.username === "test1" && formData.password === "test1") {
      navigate("/");
      setIsAuth(true);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[900px] bg-[#ebebeb] rounded-md w-full py-16 px-[14rem] ">
        <form
          action=""
          className="w-full h-full grid grid-rows-5 gap-2"
          // onSubmit={handleSubmit}
        >
          <div className="flex flex-row justify-center items-center text-2xl font-bold">
            Login
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Input
              type="text"
              title={"Username"}
              placeholder="Username"
              id={"username"}
              value={formData.username}
              onClick={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              styles={"bg-white"}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Input
              type="password"
              title={"Password"}
              placeholder="Password"
              id={"password"}
              value={formData.password}
              onClick={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              styles={"bg-white"}
            />
          </div>
          {/* <div className="flex flex-col w-full gap-1">
            <label htmlFor="role" className="text-primary text-base ">
              Role
            </label>
            <Select
              id={"role"}
              placeholder={"Select Role"}
              value={formData.role}
              className="select"
              options={[
                { label: "Student", value: "Student" },
                { label: "Teacher", value: "Teacher" },
                { label: "Admin", value: "Admin" },
              ]}
              onChange={(selectedRole) =>
                setFormData({ ...formData, role: selectedRole })
              }
            />
          </div> */}
          <div className="mt-4">
            <button
              className="w-full text-primary rounded-md bg-primary py-2 text-lg font-bold"
              // type="submit"
              onClick={handleClick}
            >
              Proceed
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Auth;
