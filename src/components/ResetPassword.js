import IsLogin from "../utils/isLogin";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  InputAdornment,
  Typography,
} from "@mui/material";
import Input from "./Input";
import { useEffect, useState } from "react";
import {
  changePassword,
  confirmPassword,
  DeleteNote,
  GetUser,
  updateName,
  uploadImages,
} from "../services";
import Edit from "@mui/icons-material/Edit";
import Snackbars from "./Alert";
import Cookies from "universal-cookie";
import { getAuth, updateProfile } from "firebase/auth";
import useQuery from "../utils/Query";
import { useHistory } from "react-router-dom";
import "../index.css";

const useStyles = makeStyles({
  card: {
    height: "35vh",
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

export default function ResetPassword() {
  const [msg, setMsg] = useState({ message: "", type: "" });
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isdisabled, setDisable] = useState(false);

  //handleClose snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // handleSave

  //render the alert component
  const renderAlert = () => {
    return (
      <Snackbars
        // type={msg.type}
        message={msg.message}
        opens={open}
        handleClose={handleCloseSnackbar}
      />
    );
  };

  const generateErrEmail = (content, type) => {
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
  };

  //changePass
  const handleChangeP = (e) => {
    const helperP = document.getElementById("helperPass");
    const helperPs = document.getElementById("helperPassKonfirm");
    const pass = document.getElementById("confirmNewPassword").value;
    const msga = generateErrEmail(e.target.value, "pass");
    // console.log(msga)
    if (msga === "Password ✔️") {
      helperP.style.color = "#7DCE13";
    } else {
      helperP.style.color = "#D1512D ";
    }
    if (e.target.value === pass && e.target.value !== "") {
      helperPs.innerHTML = "Password sama ✔️";
      setDisable(true);
      helperPs.style.color = "#7DCE13";
    } else if (e.target.value !== pass && e.target.value !== "") {
      helperPs.innerHTML = "Password tak sama";
      setDisable(false);
      helperPs.style.color = "#D1512D ";
    } else if (e.target.value === "") {
      helperPs.innerHTML = "";
    }
    helperP.innerHTML = msga;
  };

  //changePassKonfirmasi
  const handleChangePKonfirm = (e) => {
    const value = e.target.value;
    const pass = document.getElementById("newPassword").value;
    const helperP = document.getElementById("helperPassKonfirm");
    const msga = value === pass ? "Password sama ✔️" : "Password tak sama";
    if (msga === "Password sama ✔️") {
      setDisable(true);
      helperP.style.color = "#7DCE13";
    } else {
      setDisable(false);
      helperP.style.color = "#D1512D ";
    }
    helperP.innerHTML = msga;
  };

  //
  const q = useQuery();
  //handleConfirm
  const handleConfirm = (e) => {
    e.preventDefault();
    const oobCode = q.get("oobCode");
    confirmPassword(oobCode, document.getElementById("newPassword").value)
      .then((e) => {
        setMsg({
          message: "Sukses mengganti password, redirect ke halaman utama...",
          type: "success",
        });
        setOpen(true);
      })
      .catch((err) => {
        if (err.code === "auth/invalid-action-code")
          document.getElementById("message").innerHTML =
            "Maaf link ini sudah digunakan 👀";
        else {
          document.getElementById("message").innerHTML =
            "Maaf terjadi error 👀";
        }
        setDisable(false);
      });
  };
  const history = useHistory();

  //reset popup
  if (open === true)
    setTimeout(() => {
      setOpen(false);
      history.push("/login");
    }, 3000);

  return (
    <>
      {renderAlert()}
      <form onSubmit={handleConfirm}>
        <Box className={classes.container}>
          <Box className={`${classes.card} shadow resetPasswordCard`}>
            <Box>
              <Typography variant="h4" sx={{mb:2}} textAlign={"center"}>
                Reset Password
              </Typography>
              <Box>
                <Typography>Password</Typography>
                <Input
                  id={"newPassword"}
                  type="email"
                  inputType={"password"}
                  hdlChange={handleChangeP}
                />
              </Box>
              <Box height={"24px"} my={1} pl="14px">
                <Typography id="helperPass" />
              </Box>
              <Box>
                <Typography>Konfirmasi Password</Typography>
                <Input
                  id={"confirmNewPassword"}
                  type="email"
                  inputType={"password"}
                  hdlChange={handleChangePKonfirm}
                />
              </Box>
              <Box height={"24px"} my={1} pl="14px">
                <Typography id="helperPassKonfirm" />
              </Box>
            </Box>

            <Box display={"flex"} justifyContent="center" pt={2}>
              <Box>
                <Input type="button" isdisabled={!isdisabled}>
                  Simpan
                </Input>
              </Box>
            </Box>
            <Typography id="message" textAlign={"center"} sx={{ mt: 1 }} />
          </Box>
        </Box>
      </form>
    </>
  );
}
