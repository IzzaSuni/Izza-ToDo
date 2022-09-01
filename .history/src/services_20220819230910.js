import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

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
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
const Github = new GithubAuthProvider();

const GetNotes = ({ type = "notes", author, data }) => {
  const colRef = collection(db, type);
  let col = [];
  const getData = async () => {
    try {
      await getDocs(colRef).then((e) => {
        return e.docs.forEach((e) => {
          type === "u&p" ? (
            col.push([...e.data().username])
          ) : author ? (
            e.data().author === author ? (
              col.push({ ...e.data(), id: e.id })
            ) : (
              <></>
            )
          ) : (
            col.push({ ...e.data(), id: e.id })
          );
        });
      });
      return col;
    } catch (e) {
      return (col = []);
    }
  };
  return getData();
};

const CreateNote = (data, type = "notes") => {
  const colRef = collection(db, type);
  try {
    addDoc(colRef, data);
  } catch (err) {
    console.log(err);
  }
};

const DeleteNote = (dataId, type = "notes") => {
  const docRef = doc(db, type, dataId);
  try {
    return deleteDoc(docRef);
  } catch (err) {
    return console.log(err);
  }
};

const UpdateNote = (data, type = "notes") => {
  const docRef = doc(db, type, data.id);
  try {
    return updateDoc(docRef, data);
  } catch (err) {
    return console.log(err);
  }
};

const UseDoCreateUser = ({ email, password }) => {
  try {
    createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error;
  }
};

const UseDoLogOut = () => {
  signOut(auth)
    .then((e) => e)
    .catch((err) => err);
};

const UseDoLogIn = ({ email, password, type }) => {
  switch (type) {
    case "google":
      return signInWithPopup(auth, providerGoogle)
        .then((e) => {
          const cookies = new Cookies();
          cookies.set("akikToken", e._tokenResponse.idToken, {
            path: "/",
            maxAge: 43200,
          });
        })
        .catch((err) => {
          return err;
        });
    case "facebook":
      return signInWithPopup(auth, providerFacebook)
        .then((e) => {
          const cookies = new Cookies();
          cookies.set("akikToken", e._tokenResponse.idToken, {
            path: "/",
            maxAge: 43200,
          });
        })
        .catch((err) => {
          return err;
        });

    case "github":
      return signInWithPopup(auth, Github)
        .then((e) => {
          const cookies = new Cookies();
          cookies.set("akikToken", e._tokenResponse.idToken, {
            path: "/",
            maxAge: 43200,
          });
        })
        .catch((err) => {
          return err;
        });

    default:
      return signInWithEmailAndPassword(auth, email, password)
        .then((e) => {
          const cookies = new Cookies();
          cookies.set("akikToken", e._tokenResponse.idToken, {
            path: "/",
            maxAge: 43200,
          });
        })
        .catch((err) => {
          return err;
        });
  }
};

export {
  UpdateNote,
  DeleteNote,
  CreateNote,
  GetNotes,
  UseDoCreateUser,
  UseDoLogIn,
  UseDoLogOut,
};
