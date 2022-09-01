import { Box, InputAdornment, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { CreateNote, GetNotes, GetUser, UseDoCreateUser } from "../services";
import Input from "./Input";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import Cookies from "universal-cookie";
import bcrypt from "bcryptjs";
import { LoadingButton } from "@mui/lab";
import { useHistory } from "react-router-dom";
const auth = getAuth();
const firebaseConfig = {
  apiKey: "AIzaSyAjZX0rIvNdmRXab8sDlkjihku_Bh4y0jg",
  authDomain: "notes-9e77e.firebaseapp.com",
  projectId: "notes-9e77e",
  storageBucket: "notes-9e77e.appspot.com",
  messagingSenderId: "518427613842",
  appId: "1:518427613842:web:af718e1b48a3b7972be44b",
  measurementId: "G-4QZVSNXS15",
};

const useStyles = makeStyles({
  card: {
    height: "60vh",
    width: "40vw",
    background: "#2B2B2B",
    borderRadius: "8px",
    padding: "32px",
  },
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function CreateAccount(prop) {
  const classes = useStyles();
  const [msges, setMsg] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);
  const [checkUn, setCheckUn] = useState(false);
  const [msgCheck, setMsgCheck] = useState();
  const [create, setCreate] = useState({ e: false, u: false, p: false });
  const history = useHistory();
  //check if signed
  const signed = prop.signed;
  if (!signed) {
    localStorage.clear();
  } else {
    history.push("/publicNote");
  }

  //generateErr
  const generateErrEmail = (content, type) => {
    if (type === "email") {
      if (content.length === 0) return " ";
      else if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(content) === false
      )
        return "format e-mail salah ❌";
      else if (content.length > 0 && content.indexOf("@") === -1)
        return "format e-mail salah ❌";
      else return "format e-mail sesuai ✔️";
    } else {
      let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (content.length === 0) return "";
      if (content.length > 0 && content.length < 6)
        return "minimal password 6 karakter ❌";
      else if (/[A-Z]/.test(content) === false)
        return "Password wajib terdapat huruf kapital ❌";
      else if (/\d/.test(content) === false)
        return "Password wajib terdapat angka ❌";
      else if (format.test(content) === false)
        return "Password wajib terdapat karakter spesial (!@#$%^&*) ❌";
      else return "Password ✔️";
    }
  };

  //handleSubmit
  const submit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (create.e === false || create.p == false || create.u === false) {
      console.log("invalid");
      setLoading(false);
      return;
    }
    const userName = e.target[0].value;
    const email = e.target[2].value;
    const passwordOld = e.target[4].value;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(passwordOld, salt);
    await createUserWithEmailAndPassword(auth, email, passwordOld)
      .then((e) => {
        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then((ev) => ev)
          .catch((err) => err);
        CreateNote({ username: userName, email: email, password: hash }, "u&p");
        setMsg({ type: "success", msg: "User berhasil dibuat" });
        setCreate({ e: false, u: false, p: false });
        setLoading(false);
        const cookies = new Cookies();
        cookies.set("akikToken", e._tokenResponse.idToken, {
          path: "/",
          maxAge: 43200,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: email,
            username: e.user.displayName,
          })
        );
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use")
          setMsg({ msg: "Maaf email sudah digunakan👀", type: "error" });
        else {
          setMsg({ msg: err.code, type: "error" });
        }
        setCreate({ e: false, u: true, p: true });
        setLoading(false);
        return err;
      });
    return;
  };

  //handleChangeE
  const handleChangeE = (e) => {
    const helperE = document.getElementById("helperEmail");
    const msg = generateErrEmail(e.target.value, "email");
    if (msg === "format e-mail sesuai ✔️") {
      setCreate({ ...create, e: true });
      helperE.style.color = "#7DCE13";
    } else {
      setCreate({ ...create, e: false });
      helperE.style.color = "#D1512D";
    }
    helperE.innerHTML = msg;
  };

  //handleChangeP
  const handleChangeP = (e) => {
    const helperP = document.getElementById("helperPass");
    const msga = generateErrEmail(e.target.value, "pass");
    if (msga === "Password ✔️") {
      setCreate({ ...create, p: true });
      helperP.style.color = "#7DCE13";
    } else {
      setCreate({ ...create, p: false });
      helperP.style.color = "#D1512D ";
    }
    helperP.innerHTML = msga;
  };

  //handleChangeU
  const handleChangeU = async (es) => {
    setCheckUn(true);
    await GetUser().then((e) => {
      const uName = es.target.value;
      console.log(e);
      const result = e.map((ev) => {
        console.log(ev);
        let chk;
        if (uName === ev.username) {
          return (chk = "ok");
        } else {
          return;
        }
      });
      const helperU = document.getElementById("helperUser");
      const msg =
        result.includes("ok") === true
          ? "Username sudah dipakai ❌"
          : "Username tersedia ✔️";
      if (msg === "Username tersedia ✔️") {
        setCreate({ ...create, u: true });
        helperU.style.color = "#7DCE13";
      } else {
        setCreate({ ...create, e: false });
        helperU.style.color = "#D1512D ";
      }
      helperU.innerHTML = msg;
    });
    setCheckUn(false);
  };

  //return
  return (
    <Box className={classes.container}>
      <Box className={`${classes.card} shadow`}>
        <Typography textAlign="center" variant={"h4"}>
          Create an account
        </Typography>
        <Box marginY={6}>
          <form onSubmit={submit}>
            <Box>
              <Input
                type="email"
                label={"Username"}
                inputType="text"
                hdlChange={handleChangeU}
                maxchar={15}
                icon={
                  checkUn === true
                    ? {
                        endAdornment: (
                          <InputAdornment position="end">
                            <LoadingButton loading />
                          </InputAdornment>
                        ),
                      }
                    : {}
                }
              />
              <Box height={"12px"} mt={1} pl="14px">
                <Typography id="helperUser"></Typography>
              </Box>
            </Box>

            <Box mt={2}>
              <Input
                type="email"
                label={"Email"}
                inputType="text"
                hdlChange={handleChangeE}
              />
              <Box height={"12px"} mt={1} pl="14px">
                <Typography id="helperEmail"></Typography>
              </Box>
            </Box>

            <Box mt={2}>
              <Input
                type="email"
                label="Password"
                inputType={"password"}
                hdlChange={handleChangeP}
              />
              <Box height={"24px"} my={1} pl="14px">
                <Typography id="helperPass" />
                <Typography id="helperPassStreng" />
              </Box>
            </Box>
            <Box display="flex" justifyContent={"center"} pt={1}>
              <Input
                type={"buttonLoading"}
                loading={loading}
                className={{ width: "30%" }}
                isdisabled={
                  create.e !== true || create.e !== true || create.p !== true
                }
              >
                Sign Up
              </Input>
            </Box>
          </form>
        </Box>
        <Typography textAlign="center">{msges.msg}</Typography>
      </Box>
    </Box>
  );
}

//generate password strength
//   const generatePassStrength = (pass) => {
//     let value = 0;
//     let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
//     if (pass.length === 0) value = 0;
//     if (pass.length > 0 && pass.length < 6) value = 0;
//     if (pass.length > 6) value += 1;
//     if (pass.length > 8) value += 1;
//     if (pass.length > 10) value += 1;
//     if (/[A-Z]/.test(pass) === true) value += 1;
//     if (/\d/.test(pass) === true) value += 1;
//     if (format.test(pass) === true) value += 1;
//     if (value === 0) return "";
//     else if (value === 1) return "weak";
//     else if (value === 2) return "good";
//     else if (value === 3) return "good";
//     else if (value === 4) return "good";
//     else if (value === 5) return "excelent";
//     else if (value === 6) return "excelent";
//   };
