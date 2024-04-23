import Sidebar from "../../components/Sidebar";

const Home = () => {
  return (
    <div className="w-full h-screen  text-primary">
      <div className="grid grid-cols-3 gap-20 p-10">
        <div className="flex flex-row justify-center items-center text-2xl font-semibold bg-[#cdcdcd] rounded-md py-20">
          Total Students - 310
        </div>
        <div className="flex flex-row justify-center items-center text-2xl font-semibold bg-[#f472b6] rounded-md py-20">
          Total Teachers - 30
        </div>
        <div className="flex flex-row justify-center items-center text-2xl font-semibold rounded-md py-20 bg-[#60a5fa]">
          Total Classes - 16
        </div>
      </div>
    </div>
  );
};

export default Home;
