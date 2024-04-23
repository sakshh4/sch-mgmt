import React from "react";
import Input from "../../components/Input";
import { Table, Spin, Dropdown } from "antd";
import { teacherColumns } from "../../constants/TableColumns";
import ModalContainer from "../../components/ModalContainer";
import { FaPlus } from "react-icons/fa6";
// import Select from "../../components/Select";
import InputInnerButton from "../../components/InputInnerButton";
import {
  deleteTeacherData,
  getTeachersData,
  postTeacherData,
  updateTeacherData,
} from "../../apis/teacherAPI";
// import SelectInnerButton from "../../components/SelectInnerButton";
import { renderArrayColumn } from "../../utils";
import { getClassOptions } from "../../apis/classesAPI";
import { getSubjectOptions } from "../../apis/subjectAPI";
import { Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineMore } from "react-icons/ai";
const Teacher = () => {
  const [data, setData] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: "",
    ID: "",
    classes: [],
    subjects: [],
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [classOptions, setClassOptions] = React.useState([]);
  const [editRecord, setEditRecord] = React.useState(null);
  const [editModal, setEditModal] = React.useState(false);
  const [recordId, setRecordId] = React.useState(null);
  const [subjectOptions, setSubjectOptions] = React.useState([]);
  const [filter, setFilter] = React.useState("Class");
  const resetFormData = () => {
    setFormData({
      name: "",
      ID: "",
      classes: [],
      subjects: [],
      username: "",
      password: "",
    });
  };

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
    console.log(formData);
  };

  const fetchClassOptions = async () => {
    try {
      const res = await getClassOptions();
      setClassOptions(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubjectOptions = async () => {
    try {
      const res = await getSubjectOptions();
      setSubjectOptions(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData);
    try {
      const res = await postTeacherData({ ...formData, role: "Teacher" });
      if (res.success) {
        fetchData();
        closeModal();
        toast.success(res.message, {
          position: "top-right",
          theme: "colored",
        });
      } else {
        toast.error(res.message, {
          position: "top-right",
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRecord = () => {
    fetchClassOptions();
    fetchSubjectOptions();
    setEditModal(true);
    setModalOpen(true);
    setFormData({
      name: editRecord.Name,
      ID: editRecord.id,
      classes: editRecord.classes,
      subjects: editRecord.subject,
      username: "",
      password: "",
    });
  };

  const handleDeleteRecord = async () => {
    try {
      const res = await deleteTeacherData(recordId);
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
  const teacherColumns = [
    { title: "Name", dataIndex: "Name", key: "Name" },
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Classes", dataIndex: "classes", key: "classes" },
    { title: "Subjects", dataIndex: "subject", key: "subject" },
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

  const columnsWithRender = teacherColumns.map((column) => {
    if (column.dataIndex === "subject" || column.dataIndex === "classes") {
      return {
        ...column,
        render: (text, record) => renderArrayColumn(record[column.dataIndex]),
      };
    }
    return column;
  });

  const fetchData = async () => {
    try {
      const response = await getTeachersData();
      if (response) setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateTeacherData(recordId, formData);
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
    <div className="w-full overflow-x-hidden  ">
      <div className="w-full py-10">
        <div className="w-full flex flex-row text-lg justify-between items-center px-10">
          <div className="flex flex-row text-lg font-semibold text-primary">
            Teachers
          </div>
          <button
            className="max-w-[150px] w-full py-2 gap-x-1 bg-primary outline-none text-primary text-base rounded-md flex justify-center items-center "
            onClick={() => {
              setModalOpen(true);
              fetchClassOptions();
              fetchSubjectOptions();
            }}
          >
            <span>
              <FaPlus color="#333333" size={14} />
            </span>
            <span>Add Teacher</span>
          </button>
        </div>
        <ModalContainer
          title={
            editModal ? "Edit Teacher Information" : "Add Teacher Information"
          }
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          closeModal={() => closeModal()}
        >
          <form
            className="w-full gap-y-6 flex flex-col"
            onSubmit={editModal ? handleEditFormSubmit : handleSubmit}
          >
            <div className="w-full flex gap-x-8 justify-start px-10 pt-8">
              <div className="flex flex-col w-full gap-1">
                <Input
                  type="text"
                  placeholder="ex-Hiremath"
                  id="name"
                  title="Name"
                  value={formData.name}
                  name="name"
                  onClick={handleInputChange}
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <Input
                  type="text"
                  placeholder="ID"
                  id="ID"
                  title="ID"
                  value={formData.ID}
                  name="ID"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="w-full flex gap-x-8 justify-start px-10">
              <div className="flex flex-col gap-1 w-full">
                <Input
                  type="text"
                  title={"Username"}
                  placeholder="Username"
                  name={"username"}
                  id={"username"}
                  value={formData.username}
                  onClick={handleInputChange}
                  styles={"bg-white"}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Input
                  type="password"
                  title={"Password"}
                  placeholder="Password"
                  id={"password"}
                  name={"password"}
                  value={formData.password}
                  onClick={handleInputChange}
                  styles={"bg-white"}
                />
              </div>
            </div>
            <div className="w-full flex gap-x-8 justify-start px-10 ">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="class" className="text-primary text-base ">
                  Select Classes
                </label>
                <Select
                  id={"class"}
                  placeholder={"Select Class"}
                  value={formData.classes}
                  onChange={(selectedClass) =>
                    setFormData({ ...formData, classes: selectedClass })
                  }
                  options={classOptions}
                  mode="multiple"
                  className="select"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="subjects" className="text-primary text-base ">
                  Select Subjects
                </label>
                <Select
                  id={"subjects"}
                  placeholder={"Select Subjects"}
                  value={formData.subjects}
                  onChange={(selectedSubjects) =>
                    setFormData({ ...formData, subjects: selectedSubjects })
                  }
                  options={subjectOptions}
                  mode="multiple"
                  className="select"
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
            placeholder={"Select Filter"}
            options={[
              { label: "Class", value: "Class" },
              { label: "Division", value: "Division" },
              { label: "Class Teacher", value: "Class Teacher" },
              { label: "Strength", value: "Strength" },
            ]}
            onChange={handleFilter}
            className="selectFilter"
          />
        </div>
        <div className="col-span-4">
          <InputInnerButton
            id={filter}
            placeholder={filter}
            type="text"
            title={`Enter ${filter}`}
            // value={formData.subjects}
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
              columns={columnsWithRender}
              style={{ height: "50vh", overflowY: "scroll" }}
            />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Teacher;
