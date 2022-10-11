import { Box, InputAdornment, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { CreateNote, GetUser } from "../services";
import Input from "../components/Input";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import Cookies from "universal-cookie";
import bcrypt from "bcryptjs";
import { LoadingButton } from "@mui/lab";
import { useHistory } from "react-router-dom";
import IsLogin from "../utils/isLogin";
import generateErrEmail from "../utils/GenerateError";
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
    width: "40vw",
    background: "#2B2B2B",
    borderRadius: "8px",
    padding: "32px",
    height:'fit-content',
    margin:'16px 0'
  },
  container: {
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
  const [create, setCreate] = useState({ e: false, u: false, p: false });
  const history = useHistory();

  //check if signed
  const { signed } = IsLogin();
  if (signed) {
    history.replace("/publicNote");
  }

  //handleSubmit
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (create.e === false || create.p == false || create.u === false) {
      setLoading(false);
      return;
    }
    //getting data
    const userName = e.target[0].value;
    const email = e.target[2].value;
    const passwordOld = e.target[4].value;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(passwordOld, salt);

    //do create user
    await createUserWithEmailAndPassword(auth, email, passwordOld)
      .then((e) => {
        updateProfile(auth.currentUser, {
          displayName: userName,
        });
        CreateNote({ username: userName, email: email, password: hash }, "u&p");
        setMsg({ type: "success", msg: "User berhasil dibuat" });
        setCreate({ e: false, u: false, p: false });
        setLoading(false);
        const cookies = new Cookies();
        cookies.set("akikToken", e._tokenResponse.idToken, {
          path: "/",
          maxAge: 43200,
        });
        localStorage.setItem("uname", userName);
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
    setCreate({ ...create, u: false });
    const uName = es.target.value;
    GetUser({ name: uName }).then((e) => {
      const helperU = document.getElementById("helperUser");
      let msg =
        e === true ? "Username sudah dipakai ❌" : "Username tersedia ✔️";
      if (uName === "") msg = "";
      if (e === true) {
        setCreate({ ...create, u: false });
        helperU.style.color = "#D1512D";
      } else if (e !== true) {
        setCreate({ ...create, u: true });
        helperU.style.color = "#7DCE13";
      }
      helperU.innerHTML = msg;
    });
  };

  //return
  return (
    <Box className={classes.container}>
      <Box className={`${classes.card} create-account-card`}>
        <Typography textAlign="center" variant={"h4"}>
          Create an account
        </Typography>
        <Box marginY={6} bgcolor="#2B2B2B">
          <form onSubmit={submit}>
            <Box>
              <Input
                type="email"
                label={"Username"}
                inputType="text"
                hdlChangeCapture={handleChangeU}
                maxchar={15}
                icon={
                  loading === true
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
                  create.e === false || create.u === false || create.p === false
                }
              >
                Sign Up
              </Input>
            </Box>
            <Box>
              <Typography textAlign={"center"}>sudah punya akun?</Typography>
              <Typography
                textAlign={"center"}
                sx={{ cursor: "pointer" }}
                onClick={() => history.push("/login")}
              >
                login
              </Typography>
            </Box>
          </form>
        </Box>
        <Typography textAlign="center">{msges.msg}</Typography>
      </Box>
    </Box>
  );
}
