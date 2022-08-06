import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAjZX0rIvNdmRXab8sDlkjihku_Bh4y0jg",
  authDomain: "notes-9e77e.firebaseapp.com",
  projectId: "notes-9e77e",
  storageBucket: "notes-9e77e.appspot.com",
  messagingSenderId: "518427613842",
  appId: "1:518427613842:web:af718e1b48a3b7972be44b",
  measurementId: "G-4QZVSNXS15",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const GetNotes = () => {
  const colRef = collection(db, "notes");
  let col = [];
  const getData = async () => {
    try {
      await getDocs(colRef).then((e) => {
        return e.docs.forEach((e) => {
          col.push({ ...e.data(), id: e.id });
        });
      });
      return col;
    } catch (e) {
      return (col = []);
    }
    return col;
  };
  return getData();
};

const CreateNote = (data) => {
  const colRef = collection(db, "notes");
  try {
    addDoc(colRef, data);
  } catch (err) {
    console.log(err);
  }
};
const DeleteNote = (dataId) => {
  const docRef = doc(db, "notes", dataId);
  try {
    return deleteDoc(docRef);
  } catch (err) {
    return console.log(err);
  }
};

const UpdateNote = (data) => {
  const docRef = doc(db, "notes", data.id);
  try {
    return updateDoc(docRef, data);
  } catch (err) {
    return console.log(err);
  }
};

export { UpdateNote, DeleteNote, CreateNote, GetNotes };
