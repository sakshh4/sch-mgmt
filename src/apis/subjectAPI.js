import { get, post, remove, update } from "./firebaseServices";

export const getSubjectData = async () => {
  const response = await get("subjects");
  return response;
};

export const postSubjectData = async (formData) => {
  console.log(formData);
  try {
    const response = await post("subjects", {
      Class: formData.class,
      Subject_Id: formData.subjectId,
      Subject_Name: formData.subjectName,
    });
    return {
      success: true,
      message: "Subject Data Added Successfully!",
      data: response,
    };
  } catch (error) {
    console.log(error);
  }
};
export const getSubjectOptions = async () => {
  const snapshot = await get("subjects");
  const classOptions = [];
  snapshot.forEach((doc) => {
    const { Subject_Name } = doc;
    classOptions.push({ label: Subject_Name, value: Subject_Name });
  });
  return classOptions;
};
export const updateSubjectData = async (id, updatedData) => {
  console.log(updatedData);
  try {
    const res = await update(
      id,
      {
        Class: updatedData.class,
        Subject_Id: updatedData.subjectId,
        Subject_Name: updatedData.subjectName,
      },
      "subjects"
    );
    return {
      success: true,
      message: "Subject data updated successfully",
      data: res,
    };
  } catch (error) {
    console.error("Error updating subject data:", error);
    return { success: false, message: "Failed to update subject data" };
  }
};
export const deleteSubjectData = async (id) => {
  try {
    const res = await remove(id, "subjects");
    return {
      success: true,
      message: "Subject data deleted successfully",
      data: res,
    };
  } catch (error) {
    console.error("Error deleting subject data:", error);
    return { success: false, message: "Failed to update subject data" };
  }
};
