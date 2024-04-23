import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import db from "../config/firebaseConfig";

export const get = async (collectionName) => {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = [];
  snapshot.forEach((doc) => {
    data.push({ _id: doc.id, ...doc.data() });
  });
  return data;
};
export const post = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef._id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
export const update = async (id, updatedData, collectionName) => {
  try {
    const docRef = await updateDoc(doc(db, collectionName, id), updatedData);
    return docRef;
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};
export const remove = async (id, collectionName) => {
  try {
    const docRef = await deleteDoc(doc(db, collectionName, id));
    return docRef;
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};
