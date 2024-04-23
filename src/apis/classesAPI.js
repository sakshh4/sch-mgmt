import { get, post, remove, update } from "./firebaseServices";

export const getClassData = async () => {
  const response = await get("class");
  return response;
};

export const postClassData = async (formData) => {
  try {
    const response = await post("class", {
      Class: formData.class,
      ClassTeacher: formData.classTeacher,
      ClassId: formData.class + formData.division,
      Division: formData.division,
      Strength: formData.strength,
    });
    return {
      success: true,
      message: "Class Data Added Successfully!",
      data: response,
    };
  } catch (error) {
    console.log(error);
  }
};
export const getClassOptions = async () => {
  const snapshot = await get("class");
  const classOptions = [];
  snapshot.forEach((doc) => {
    const { ClassId } = doc;
    classOptions.push({ label: ClassId, value: ClassId });
  });
  return classOptions;
};

export const getClassNumberOptions = async () => {
  const snapshot = await get("class");
  const classOptions = [];
  snapshot.forEach((doc) => {
    const { Class } = doc;
    classOptions.push({ label: Class, value: Class });
  });
  return classOptions;
};

export const updateClassData = async (id, updatedData) => {
  console.log(updatedData);
  try {
    const res = await update(
      id,
      {
        Class: updatedData.class,
        Division: updatedData.division,
        ClassId: updatedData.class + updatedData.division,
        ClassTeacher: updatedData.classTeacher,
        Strength: updatedData.strength,
      },
      "class"
    );
    return {
      success: true,
      message: "Class data updated successfully",
      data: res,
    };
  } catch (error) {
    console.error("Error updating class data:", error);
    return { success: false, message: "Failed to update class data" };
  }
};
export const deleteClassData = async (id) => {
  try {
    const res = await remove(id, "class");
    return {
      success: true,
      message: "Class data deleted successfully",
      data: res,
    };
  } catch (error) {
    console.error("Error deleting class data:", error);
    return { success: false, message: "Failed to update class data" };
  }
};
