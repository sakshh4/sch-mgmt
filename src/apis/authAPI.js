import { getDocs, collection, addDoc, where, query } from "firebase/firestore";
import db from "../config/firebaseConfig";
import bcrypt from "bcryptjs";

export const getAuthData = async (collectionName) => {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

export const postAuthData = async (data) => {
  try {
    console.log(data);
    const userId = data.username + "_" + data.role;

    const q = query(collection(db, "users"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return {
        success: false,
        message: "Username already exists.",
      };
    }
    data.userId = userId;
    const hashedPassword = await hashPassword(data.password);

    data.password = hashedPassword;

    const addedDocRef = await addDoc(collection(db, "users"), {
      username: data.username,
      password: data.password,
      userId: data.userId,
    });
    return {
      success: true,
      message: "User successfully registered.",
      id: addedDocRef.id,
      userId: data.userId,
    };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}
