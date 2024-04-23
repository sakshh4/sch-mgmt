import { postAuthData } from "./authAPI";
import { get, post, remove, update } from "./firebaseServices";

export const getStudentData = async () => {
  const response = await get("students");
  return response;
};

export const postStudentData = async (formData) => {
  const authResponse = await postAuthData(formData);
  if (authResponse.success) {
    const userId = authResponse.userId;
    if (userId) {
      const response = await post("students", {
        Name: formData.name,
        Class: formData.class,
        Division: formData.division,
        ClassId: formData.class + formData.division,
        Dob: formData.dob,
        RollNo: formData.rollNo,
        session: formData.session,
        subjects: formData.subjects,
        userId: userId,
      });
      return {
        success: true,
        message: "Student Data Added Successfully!",
        data: response,
      };
    }
  } else {
    return { success: false, message: "Username already Exists" };
  }
};

export const updateStudentData = async (id, updatedData) => {
  console.log(updatedData);
  try {
    const res = await update(
      id,
      {
        Name: updatedData.name,
        RollNo: updatedData.rollNo,
        ClassId: updatedData.class + updatedData.division,
        Class: updatedData.class,
        Division: updatedData.division,
        session: updatedData.session,
        Dob: updatedData.dob,
        subjects: updatedData.subjects,
      },
      "students"
    );
    return {
      success: true,
      message: "Student data updated successfully",
      data: res,
    };
  } catch (error) {
    console.error("Error updating student data:", error);
    return { success: false, message: "Failed to update student data" };
  }
};
export const deleteStudentData = async (id) => {
  try {
    const res = await remove(id, "students");
    return {
      success: true,
      message: "Student data deleted successfully",
      data: res,
    };
  } catch (error) {
    console.error("Error deleting student data:", error);
    return { success: false, message: "Failed to update student data" };
  }
};
