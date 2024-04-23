import { postAuthData } from "./authAPI";
import { get, post, remove, update } from "./firebaseServices";

export const getTeachersData = async () => {
  const response = await get("teachers");
  return response;
};

export const postTeacherData = async (formData) => {
  console.log(formData);
  // const cleanedFormData = Object.fromEntries(
  //   Object.entries(formData).filter(
  //     ([key, value]) => value !== undefined && value !== ""
  //   )
  // );
  const authResponse = await postAuthData(formData);
  console.log(authResponse);
  if (authResponse.success) {
    const userId = authResponse.userId;
    console.log(userId);
    if (userId) {
      const response = await post("teachers", {
        Name: formData.name,
        id: formData.ID,
        subject: formData.subjects,
        classes: formData.classes,
        userId: userId,
      });
      return {
        success: true,
        message: "Teacher Data Added Successfully!",
        data: response,
      };
    }
  } else {
    return { success: false, message: "Username already Exists" };
  }
};
export const getTeacherOptions = async () => {
  const snapshot = await get("teachers");
  const teacherOptions = [];
  snapshot.forEach((doc) => {
    const { Name } = doc;
    teacherOptions.push({ label: Name, value: Name });
  });
  return teacherOptions;
};
export const updateTeacherData = async (id, updatedData) => {
  console.log(updatedData);
  try {
    const res = await update(
      id,
      {
        Name: updatedData.name,
        classes: updatedData.classes,
        id: updatedData.ID,
        userId: updatedData.username + "_Teacher",
        subject: updatedData.subjects,
      },
      "teachers"
    );
    return {
      success: true,
      message: "Teacher data updated successfully",
      data: res,
    };
  } catch (error) {
    console.error("Error updating teacher data:", error);
    return { success: false, message: "Failed to update teacher data" };
  }
};
export const deleteTeacherData = async (id) => {
  try {
    const res = await remove(id, "teachers");
    return {
      success: true,
      message: "Teacher data deleted successfully",
      data: res,
    };
  } catch (error) {
    console.error("Error deleting teacher data:", error);
    return { success: false, message: "Failed to update teacher data" };
  }
};
