import React from "react";
import Input from "../../components/Input";
import { Table, Spin, Dropdown } from "antd";
import { studentColumns } from "../../constants/TableColumns";
import ModalContainer from "../../components/ModalContainer";
import { FaPlus } from "react-icons/fa6";
import { DatePicker } from "antd";
import moment from "moment";
import {
  deleteStudentData,
  getStudentData,
  postStudentData,
  updateStudentData,
} from "../../apis/studentsAPI";
import InputInnerButton from "../../components/InputInnerButton";
import { renderArrayColumn } from "../../utils";
import { getSubjectOptions } from "../../apis/subjectAPI";
import { getClassNumberOptions } from "../../apis/classesAPI";
import { Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineMore } from "react-icons/ai";

const Student = () => {
  const [data, setData] = React.useState([]);
  const [formData, setFormData] = React.useState({
    class: null,
    name: "",
    division: null,
    dob: "",
    rollNo: "",
    session: "",
    subjects: [],
    username: "",
    password: "",
    role: "Student",
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [subjectOptions, setSubjectOptions] = React.useState([]);
  const [classOptions, setClassOptions] = React.useState([]);
  const [editRecord, setEditRecord] = React.useState(null);
  const [editModal, setEditModal] = React.useState(false);
  const [recordId, setRecordId] = React.useState(null);
  const [filter, setFilter] = React.useState("Filter");
  const resetFormData = () => {
    setFormData({
      class: null,
      name: "",
      division: null,
      dob: "",
      rollNo: "",
      session: "",
      subjects: [],
      username: "",
      password: "",
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    resetFormData();
    setEditModal(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await postStudentData({ ...formData, role: "Student" });
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
  const handleSessionChange = (dates) => {
    if (dates && dates.length === 2) {
      const startYear = moment(dates[0]).format("YYYY");
      const endYear = moment(dates[1]).format("YYYY");
      if (startYear && endYear) {
        const session = `${startYear} - ${endYear}`;
        setFormData((prevData) => ({
          ...prevData,
          session: session,
        }));
      }
    }
    console.log(formData.session);
  };
  const fetchClassOptions = async () => {
    const res = await getClassNumberOptions();
    setClassOptions(res);
  };
  const fetchSubjectOptions = async () => {
    const res = await getSubjectOptions();
    setSubjectOptions(res);
  };
  const handleDateOfBirthChange = (date, dateString) => {
    setFormData((prevData) => ({
      ...prevData,
      dob: dateString,
    }));
    console.log(formData.dob);
  };

  const handleRecord = () => {
    setEditModal(true);
    setModalOpen(true);
    setFormData({
      class: editRecord.Class,
      name: editRecord.Name,
      division: editRecord.Division,
      dob: editRecord.Dob,
      rollNo: editRecord.RollNo,
      session: editRecord.session,
      subjects: editRecord.subjects,
      username: "",
      password: "",
    });
  };

  const handleDeleteRecord = async () => {
    try {
      const res = await deleteStudentData(recordId);
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
      label: <div onClick={() => handleDeleteRecord(editRecord)}>Delete</div>,
    },
  ];

  const studentColumns = [
    { title: "Name", dataIndex: "Name", key: "Name" },
    { title: "RollNo", dataIndex: "RollNo", key: "RollNo" },
    { title: "Class", dataIndex: "Class", key: "Class" },
    { title: "Division", dataIndex: "Division", key: "Division" },
    { title: "DOB", dataIndex: "Dob", key: "Dob" },
    { title: "Session", dataIndex: "session", key: "session" },
    { title: "Subjects", dataIndex: "subjects", key: "subjects" },
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
  const columnsWithRender = studentColumns.map((column) => {
    if (column.dataIndex === "subjects") {
      return {
        ...column,
        render: (text, record) => renderArrayColumn(record[column.dataIndex]),
      };
    }
    return column;
  });

  const fetchData = async () => {
    try {
      const response = await getStudentData();
      console.log(response);
      if (response) setData(response);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateStudentData(recordId, formData);
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
            Students
          </div>
          <button
            className="max-w-[150px] w-full py-2 gap-x-1 bg-primary outline-none text-primary text-base rounded-md flex justify-center items-center "
            onClick={() => {
              setModalOpen(true);
              fetchSubjectOptions();
              fetchClassOptions();
            }}
          >
            <span>
              <FaPlus color="#333333" size={14} />
            </span>
            <span>Add Student</span>
          </button>
        </div>
        <ModalContainer
          title={editModal ? "Edit Student Details" : "Add Student Details"}
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
              <div className="flex flex-col w-full gap-1">
                <Input
                  type="text"
                  placeholder="ex-Raj"
                  id="name"
                  title="Name"
                  value={formData.name}
                  name="name"
                  onClick={handleInputChange}
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <Input
                  type="number"
                  placeholder="ex-1,2,3"
                  id="rollNo"
                  title="Roll Number"
                  value={formData.rollNo}
                  name="rollNo"
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
                  id={"username"}
                  name={"username"}
                  value={formData.username}
                  onClick={handleInputChange}
                  styles={"bg-white"}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Input
                  type="password"
                  title={"Password"}
                  name={"password"}
                  placeholder="Password"
                  id={"password"}
                  value={formData.password}
                  onClick={handleInputChange}
                  styles={"bg-white"}
                />
              </div>
            </div>
            <div className="w-full flex gap-x-8 justify-start px-10">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="class" className="text-primary text-base">
                  Class
                </label>
                <Select
                  id={"class"}
                  placeholder={"Select Class"}
                  options={classOptions}
                  onChange={(selectedClass) =>
                    setFormData({ ...formData, class: selectedClass })
                  }
                  value={formData.class}
                  className="select"
                  filterOption={(inputValue, option) =>
                    option.label
                      .toLowerCase()
                      .indexOf(inputValue.toLowerCase()) >= 0
                  }
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="division" className="text-primary text-base ">
                  Division
                </label>
                <Select
                  id={"division"}
                  placeholder={"Select Division"}
                  value={formData.division}
                  onChange={(selectedDivision) =>
                    setFormData({ ...formData, division: selectedDivision })
                  }
                  options={[
                    { label: "A", value: "A" },
                    { label: "B", value: "B" },
                    { label: "C", value: "C" },
                    { label: "D", value: "D" },
                    { label: "E", value: "E" },
                    { label: "F", value: "F" },
                  ]}
                  className="select"
                  filterOption={(inputValue, option) =>
                    option.label
                      .toLowerCase()
                      .indexOf(inputValue.toLowerCase()) >= 0
                  }
                />
              </div>
            </div>
            <div className="w-full flex gap-x-8 justify-start px-10 ">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="dob" className="text-primary text-base">
                  Date of Birth
                </label>
                <DatePicker
                  id="dob"
                  format="YYYY-MM-DD"
                  placeholder="Select Date of Birth"
                  onChange={handleDateOfBirthChange}
                  className="w-full rounded-md border-[1px] border-primary border-solid py-[0.6rem] outline-none px-4 text-primary"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="session" className="text-primary text-base">
                  Session
                </label>
                <DatePicker.RangePicker
                  id="session"
                  format={"YYYY"}
                  picker="year"
                  placeholder={["Start Year", "End Year"]}
                  onChange={(dates, dateStrings) =>
                    handleSessionChange(dateStrings)
                  }
                  className="w-full rounded-md border-[1px] border-primary border-solid py-[0.6rem] outline-none px-4 text-primary"
                />
              </div>
            </div>
            <div className="w-full flex gap-x-8 justify-start px-10 ">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="subjects" className="text-primary text-base ">
                  Subjects
                </label>

                <Select
                  id={"subjects"}
                  placeholder={"Select Subjects"}
                  value={formData.subjects}
                  onChange={(selectedValues) =>
                    setFormData({ ...formData, subjects: selectedValues })
                  }
                  className="select"
                  mode="multiple"
                >
                  {subjectOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                  filterOption=
                  {(inputValue, option) =>
                    option.label
                      .toLowerCase()
                      .indexOf(inputValue.toLowerCase()) >= 0
                  }
                </Select>
              </div>
            </div>
            <div className="w-full flex flex-row justify-end items-end mt-6 px-10">
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
              { label: "Name", value: "Name" },
              { label: "Roll No", value: "Roll No" },
              { label: "Division", value: "Division" },
              { label: "Date of Birth", value: "DOB" },
              { label: "Session", value: "Session" },
            ]}
            onChange={handleFilter}
            filterOption={(inputValue, option) =>
              option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
            }
            className="select"
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

export default Student;
