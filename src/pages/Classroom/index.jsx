import React from "react";
import Input from "../../components/Input";
import {
  deleteClassData,
  getClassData,
  postClassData,
  updateClassData,
} from "../../apis/classesAPI";
import { Table, Spin, Dropdown } from "antd";
import ModalContainer from "../../components/ModalContainer";
import { FaPlus } from "react-icons/fa6";
// import Select from "../../components/Select";
import { Select } from "antd";
import InputInnerButton from "../../components/InputInnerButton";
import { getTeacherOptions } from "../../apis/teacherAPI";
import { AiOutlineMore } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
const Classroom = () => {
  const [data, setData] = React.useState([]);
  const [formData, setFormData] = React.useState({
    class: null,
    classTeacher: null,
    classId: "",
    division: null,
    strength: "",
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [teacherOptions, setTeacherOptions] = React.useState([]);
  const [editRecord, setEditRecord] = React.useState(null);
  const [editModal, setEditModal] = React.useState(false);
  const [recordId, setRecordId] = React.useState(null);
  const [filter, setFilter] = React.useState("Class");
  const resetFormData = () => {
    setFormData({
      class: null,
      classTeacher: null,
      classId: "",
      division: null,
      strength: "",
    });
  };
  const handleRecord = () => {
    setEditModal(true);
    setModalOpen(true);
    setFormData({
      class: editRecord.Class,
      classTeacher: editRecord.ClassTeacher,
      classId: editRecord.ClassId,
      division: editRecord.Division,
      strength: editRecord.Strength,
    });
  };

  const handleDeleteRecord = async () => {
    try {
      const res = await deleteClassData(recordId);
      if (res.success) {
        closeModal();
        fetchData();
        toast.success(res.message, {
          position: "top-right",
        });
      } else {
        toast.error(res.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const items = [
    {
      key: 1,
      label: <div onClick={() => handleRecord()}>Edit</div>,
    },
    {
      key: 2,
      label: <div onClick={() => handleDeleteRecord()}>Delete</div>,
    },
  ];

  const closeModal = () => {
    setModalOpen(false);
    setEditModal(false);
    resetFormData();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await postClassData(formData);
      if (res.success) {
        fetchData();
        closeModal();
        toast.success(res.message, {
          position: "top-right",
        });
      } else {
        toast.error(res.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchTeacherOptions = async () => {
    const res = await getTeacherOptions();
    setTeacherOptions(res);
  };

  const fetchData = async () => {
    try {
      const response = await getClassData();
      console.log(response);
      if (response) setData(response);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const classColumns = [
    { title: "Class", dataIndex: "Class", key: "Class" },
    {
      title: "Division",
      dataIndex: "Division",
      key: "Division",
    },
    { title: "Class Teacher", dataIndex: "ClassTeacher", key: "ClassTeacher" },
    { title: "Strength", dataIndex: "Strength", key: "Strength" },
    {
      title: "Action",
      render: (text, record) => {
        return (
          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <button
              className="border-[1px] border-[#2E3147] rounded-[4px] w-[30px] h-[30px] flex items-center justify-center"
              onMouseEnter={() => {
                setRecordId(record._id);
                setEditRecord(record);
              }}
            >
              <AiOutlineMore size={20} />
            </button>
          </Dropdown>
        );
      },
    },
  ];
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateClassData(recordId, formData);
      if (res.success) {
        closeModal();
        fetchData();
        toast.success(res.message, {
          position: "top-right",
        });
      } else {
        toast.error(res.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    console.log(editRecord);
    fetchData();
  }, [editRecord]);
  return (
    <div className="w-full overflow-x-hidden ">
      <div className="w-full py-10">
        <div className="w-full flex flex-row text-lg justify-between items-center px-10">
          <div className="flex flex-row text-lg font-semibold text-primary">
            Classes
          </div>
          <button
            className="max-w-[150px] w-full py-2 gap-x-1 bg-primary outline-none text-primary text-base rounded-md flex justify-center items-center "
            onClick={() => {
              setModalOpen(true);
              fetchTeacherOptions();
            }}
          >
            <span>
              <FaPlus color="#333333" size={14} />
            </span>
            <span>Add Class</span>
          </button>
        </div>
        <ModalContainer
          title={
            editModal ? "Edit Class and Sections" : "Add Class and Sections"
          }
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          closeModal={() => closeModal()}
        >
          <form
            action=""
            className="w-full gap-y-6 flex flex-col"
            onSubmit={editModal ? handleEditFormSubmit : handleSubmit}
          >
            <div className="w-full flex gap-x-8 justify-start px-10 pt-8">
              <div className="flex flex-col w-full gap-1 ">
                <Input
                  type="text"
                  placeholder="ex-1,2,3"
                  id="class"
                  title="Class"
                  value={formData.class}
                  name="class"
                  onClick={handleInputChange}
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label
                  htmlFor="classTeacher"
                  className="text-primary text-base"
                >
                  Class Teacher
                </label>
                <Select
                  id={"classTeacher"}
                  name={"classTeacher"}
                  placeholder={"Class Teacher"}
                  options={teacherOptions}
                  onChange={(selectedTeacher) =>
                    setFormData({ ...formData, classTeacher: selectedTeacher })
                  }
                  value={formData.classTeacher}
                  className="select"
                />
              </div>
            </div>
            <div className="w-full flex gap-x-8 justify-start px-10 ">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="division" className="text-primary text-base ">
                  Division
                </label>
                <Select
                  id={"division"}
                  placeholder={"Select Division"}
                  value={formData.division}
                  className="select"
                  options={[
                    { label: "A", value: "A" },
                    { label: "B", value: "B" },
                    { label: "C", value: "C" },
                    { label: "D", value: "D" },
                    { label: "E", value: "E" },
                    { label: "F", value: "F" },
                  ]}
                  onChange={(selectedDivision) =>
                    setFormData({ ...formData, division: selectedDivision })
                  }
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <Input
                  type="number"
                  placeholder="ex-1,2,3"
                  id="strength"
                  title="Strength"
                  value={formData.strength}
                  name="strength"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="w-full flex flex-row items-end mt-6 justify-end px-10">
              <button
                className="w-[15%] py-2 bg-primary text-lg text-primary rounded-md"
                type="submit"
              >
                {editModal ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </ModalContainer>
      </div>
      <div className="grid grid-cols-12 px-10 gap-x-4 w-full">
        <div className="flex flex-col w-full gap-1 col-span-4">
          <label htmlFor="filterBy" className="text-primary text-base">
            Filter By
          </label>
          <Select
            id={"Filter By"}
            name={"filterBy"}
            placeholder={"Select Filter"}
            options={[
              { label: "Class", value: "Class" },
              { label: "Division", value: "Division" },
              { label: "Class Teacher", value: "Class Teacher" },
              { label: "Strength", value: "Strength" },
            ]}
            // onChange={handleFilter}
            // onChange={(selectedTeacher) =>
            //   setFormData({ ...formData, classTeacher: selectedTeacher })
            // }
            className="selectFilter"
          />
        </div>
        <div className="col-span-4">
          <InputInnerButton
            id={filter}
            placeholder={filter}
            type="text"
            title={`Enter ${filter}`}
            value={formData.subjects}
            name={filter}
            btnTitle={"Search"}
          />
        </div>
      </div>
      {isLoading ? (
        <>
          <div className="fixed inset-0 opacity-35 bg-white z-300"></div>
          <div className=" flex justify-center items-center w-full h-full transition ease-in delay-300 ">
            <Spin size="large" />
          </div>
        </>
      ) : (
        <div className="w-full h-full p-10">
          <div className="w-full h-full p-[10px] border-[1px] border-solid border-[#d7d7d7] rounded-[10px] bg-white">
            <Table
              dataSource={data}
              columns={classColumns}
              style={{ height: "50vh", overflowY: "scroll" }}
            />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Classroom;
