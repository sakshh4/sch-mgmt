import React from "react";
import Input from "../../components/Input";
import { Table, Spin, Dropdown } from "antd";
import ModalContainer from "../../components/ModalContainer";
import { FaPlus } from "react-icons/fa6";
import { Select } from "antd";
import {
  deleteSubjectData,
  getSubjectData,
  postSubjectData,
  updateSubjectData,
} from "../../apis/subjectAPI";
import InputInnerButton from "../../components/InputInnerButton";
import { getClassOptions } from "../../apis/classesAPI";
import { AiOutlineMore } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
const Subjects = () => {
  const [data, setData] = React.useState([]);
  const [formData, setFormData] = React.useState({
    class: null,
    subjectId: "",
    subjectName: "",
  });
  const [classOptions, setClassOptions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editRecord, setEditRecord] = React.useState(null);
  const [editModal, setEditModal] = React.useState(false);
  const [recordId, setRecordId] = React.useState(null);
  const [filter, setFilter] = React.useState("Class");
  const resetFormData = () => {
    setFormData({
      class: null,
      subjectId: "",
      subjectName: "",
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
  const handleRecord = () => {
    setEditModal(true);
    setModalOpen(true);
    setFormData({
      class: editRecord.Class,
      subjectId: editRecord.Subject_Id,
      subjectName: editRecord.Subject_Name,
    });
  };

  const handleDeleteRecord = async () => {
    try {
      const res = await deleteSubjectData(recordId);
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
  const subjectColumns = [
    { title: "Class", dataIndex: "Class", key: "Class" },
    { title: "Subject ID", dataIndex: "Subject_Id", key: "Subject_Id" },
    { title: "Subject Name", dataIndex: "Subject_Name", key: "Subject_Name" },
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

  const fetchClassOptions = async () => {
    const res = await getClassOptions();
    setClassOptions(res);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData);
    try {
      const res = await postSubjectData(formData);
      console.log(res);
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

  const fetchData = async () => {
    try {
      const response = await getSubjectData();
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
      const res = await updateSubjectData(recordId, formData);
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
    fetchData();
  }, []);
  return (
    <div className="w-full overflow-x-hidden  ">
      <div className="w-full py-10">
        <div className="w-full flex flex-row text-lg justify-between items-center px-10">
          <div className="flex flex-row text-lg font-semibold text-primary">
            Subjects
          </div>
          <button
            className="max-w-[150px] w-full py-2 gap-x-1 bg-primary outline-none text-primary text-base rounded-md flex justify-center items-center "
            onClick={() => {
              setModalOpen(true);
              fetchClassOptions();
            }}
          >
            <span>
              <FaPlus color="#333333" size={14} />
            </span>
            <span>Add Subject</span>
          </button>
        </div>
        <ModalContainer
          title={editModal ? "Edit Record" : "Add Subject"}
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
                <label htmlFor="class" className="text-primary text-base">
                  Class
                </label>
                <Select
                  id={"class"}
                  placeholder={"Class"}
                  options={classOptions}
                  onChange={(selectedClass) =>
                    setFormData({ ...formData, class: selectedClass })
                  }
                  value={formData.class}
                  className="select"
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <Input
                  type="number"
                  placeholder="ex-001"
                  id="subjectId"
                  title="Subject ID"
                  value={formData.subjectId}
                  name="subjectId"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="w-full flex gap-x-8 justify-start px-10 ">
              <div className="flex flex-col w-full gap-1">
                <Input
                  type="text"
                  placeholder="ex-English,Maths"
                  id="subjectName"
                  title="Subject Name"
                  value={formData.subjectName}
                  name="subjectName"
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
              { label: "Subject ID", value: "Subject Id" },
              { label: "Subject Name", value: "Subject Name" },
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
              columns={subjectColumns}
              style={{ height: "50vh", overflowY: "scroll" }}
            />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Subjects;
