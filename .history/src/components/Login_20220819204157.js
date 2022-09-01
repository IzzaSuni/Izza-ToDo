import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { UseDoLogIn } from "../services";
import Input from "./Input";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import Img from "./Img";

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

export default function Login(prop) {
  const history = useHistory();
  const classes = useStyles();
  const [msg, setMsg] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const auth = getAuth();

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
      else if (content[content.indexOf("@") + 1] === undefined)
        return "format e-mail salah";
      else if (content.length > 0 && content.indexOf("@") === -1)
        return "format e-mail salah";
      else return " ";
    } else {
      if (content.length === 0) return "";
      if (content.length > 0 && content.length < 6)
        return "minimal password 8 karakter";
      else return " ";
    }
  };

  //handleSubmit
  const submit = (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[2].value;
    signInWithEmailAndPassword(auth, email, password)
      .then((e) => {
        const cookies = new Cookies();
        cookies.set("akikToken", e._tokenResponse.idToken, {
          path: "/",
          maxAge: 43200,
        });
        setMsg({ type: "success", msg: "berhasil login" });
        setLoading(false);
        history.push(`/publicNote/Private?user=${e.user.displayName}`);
      })
      .catch((err) => {
        if (err.code === "auth/wrong-password")
          setMsg({ msg: "Maaf email atau password salah 👀", type: "error" });
        if (err.code === "auth/user-not-found")
          setMsg({ msg: "Maaf user tidak ditemukan 👀", type: "error" });
        setLoading(false);
        return err;
      });
  };

  //handleChangeE
  const handleChangeE = (e) => {
    const helperE = document.getElementById("helperEmail");
    const msg = generateErrEmail(e.target.value, "email");
    if (msg === "e-mail sesuai format") helperE.style.color = "green";
    else {
      helperE.style.color = "yellow ";
    }
    helperE.innerHTML = msg;
  };

  //handleChangeE
  const handleChangeU = (e) => {
    const helperE = document.getElementById("helperEmail");
    const msg = generateErrEmail(e.target.value, "email");
    if (msg === "e-mail sesuai format") helperE.style.color = "green";
    else {
      helperE.style.color = "yellow ";
    }
    helperE.innerHTML = msg;
  };

  //handleChangeP
  const handleChangeP = (e) => {
    const helperP = document.getElementById("helperPass");
    const msg = generateErrEmail(e.target.value, "pass");
    if (msg === "sukses") helperP.style.color = "green";
    else {
      helperP.style.color = "yellow ";
    }
    helperP.innerHTML = msg;
  };

  //return
  return (
    <Box className={classes.container}>
      <Box className={`${classes.card} shadow`}>
        <Typography textAlign="center" variant={"h4"}>
          Login
        </Typography>
        <Box marginY={3}>
          <form onSubmit={submit}>
            <Box>
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
              <Box height={"12px"} my={1} pl="14px">
                <Typography id="helperPass" />
              </Box>
            </Box>
            <Box display="flex" justifyContent={"center"} pb={0.5}>
              <Input
                type={"buttonLoading"}
                loading={loading}
                className={{ width: "30%" }}
              >
                Login
              </Input>
            </Box>
            <Box>
              <Typography textAlign={"center"}>atau login dengan</Typography>
            </Box>
            <Box
              display="inline-flex"
              justifyContent={"center"}
              width="100%"
              pb={2}
            >
              <Img src="/facebook.svg" px={"8px"} />
              <Img src="/google.svg" px={"8px"} />
              <Img src="/Github.svg" px={"8px"} />
            </Box>
            <Typography textAlign={"center"}>Belum punya akun?</Typography>
            <Box display="flex" justifyContent={"center"}>
              <Typography>Daftar</Typography>
            </Box>
          </form>
        </Box>
        <Typography textAlign="center">{msg.msg}</Typography>
      </Box>
    </Box>
  );
}
