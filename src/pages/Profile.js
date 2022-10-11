import IsLogin from "../utils/isLogin";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  InputAdornment,
  Typography,
} from "@mui/material";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import {
  changePassword,
  DeleteNote,
  GetNotes,
  GetUser,
  updateName,
  uploadImages,
} from "../services";
import Edit from "@mui/icons-material/Edit";
import Snackbars from "../components/Alert";
import Cookies from "universal-cookie";
import { getAuth, updateProfile } from "firebase/auth";
import { useHistory } from "react-router-dom";
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

export default function Profile() {
  let objectURL;
  const [image, setImage] = useState();
  const [msg, setMsg] = useState({ message: "", type: "" });
  const [edit, setEdit] = useState(false);
  const { user, signed } = IsLogin();
  const classes = useStyles();
  const [Loading, setLoading] = useState(false);
  const [temp, setTemp] = useState({ name: user.user, pict: user.picture });
  const [open, setOpen] = useState(false);
  const [isdisabled, setDisable] = useState({ file: false, uName: false });
  const uname = localStorage.getItem("uname");
  const hisory = useHistory();
  if (!signed) {
    hisory.replace("/publicNote");
  }

  //handleClose snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //changing file
  const onChangeFile = (e) => {
    setMsg({ message: "", type: "" });
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3000000) {
        setMsg({ message: "Maksimal size gambar 3mb", type: "error" });
        setOpen(true);
        return (e.target.value = "");
      }
      if (file.type.includes("image/") === false) {
        setMsg({ message: "Tipe file harus gambar", type: "error" });
        setOpen(true);
        return (e.target.value = "");
      }
      if (msg.type !== "error") {
        setDisable({ ...isdisabled, file: true });
        objectURL = URL.createObjectURL(file);
        setImage(objectURL);
      }
    } else return;
  };

  // handleSave
  const save = (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ message: "Menyimpan, harap tunggu", type: "info" });
    setOpen(true);
    const file = e.target[0].files[0];
    const nameNew = e.target[2].value;
    if ((file === undefined) & (nameNew === user.user)) return;
    const auth = getAuth();
    if (isdisabled.uName === true) {
      updateProfile(auth.currentUser, {
        displayName: nameNew,
      });
      GetUser({
        type: "update",
        name: uname ? uname : user.user,
        deleteid: nameNew,
      }).then(() => {
        setMsg({ message: "Menyimpan sukses", type: "success" });
      });
      localStorage.setItem("uname", nameNew);
    }
    if (isdisabled.file === true) {
      uploadImages({ images: file, name: user.userId }).then(() => {
        setLoading(false);
        setMsg({ message: "Menyimpan sukses", type: "success" });
        setOpen(true);
      });
    }
    setEdit(false);
    return setDisable({ file: false, uName: false });
  };

  //render the alert component
  const renderAlert = () => {
    return (
      <Snackbars
        type={msg.type}
        message={msg.message}
        opens={open}
        handleClose={handleCloseSnackbar}
      />
    );
  };

  //changeUname
  const changeUname = (uName) => {
    const es = uName.target.value;
    GetUser({ name: es }).then((e) => {
      const helperU = document.getElementById("uNameHelper");
      let msg;
      if (e === true) {
        if (user.user === es || es === uname) {
          msg = "";
          setDisable({ ...isdisabled, uName: false });
        } else {
          msg = "Username sudah dipakai ❌";
          setDisable({ ...isdisabled, uName: false });
        }
      } else {
        if (es === "") {
          msg = "Username tidak boleh kosong";
          setDisable({ ...isdisabled, uName: false });
        } else if (es.replace(/^\s+|\s+$/gm, "").length < 4) {
          msg = "Username terlalu pendek";
          setDisable({ ...isdisabled, uName: false });
        } else {
          msg = "Username tersedia ✔️";
          setDisable({ ...isdisabled, uName: true });
        }
      }
      if (msg === "Username tersedia ✔️") {
        helperU.style.color = "#7DCE13";
      } else {
        helperU.style.color = "#D1512D ";
      }
      helperU.innerHTML = msg;
    });
  };

  //reset popup
  if (open === true)
    setTimeout(() => {
      setOpen(false);
    }, 3000);

  //handleChangePass
  const changePass = () => {
    changePassword(user.email).then(() => {
      setMsg({ message: "Email reset password terkirim", type: "success" });
      setOpen(true);
    });
  };
  return (
    <>
      {renderAlert()}
      <form onSubmit={save}>
        <Box className={classes.container}>
          <Box className={`${classes.card} shadow profileCard`}>
            <Box
              display="inline-flex"
              width="100%"
              justifyContent={"center"}
              alignItems="center"
            >
              <Box
                onClick={() =>
                  edit ? document.getElementById("uploadImg").click() : null
                }
              >
                <Avatar
                  id={`halo-${edit}`}
                  sx={{ width: "72px", height: "72px" }}
                  src={image ? image : user.picture}
                ></Avatar>
              </Box>
            </Box>
            <Box>
              <Box pb={1}>
                <Input
                  id={"uploadImg"}
                  type="file"
                  inputType={"file"}
                  hdlChange={onChangeFile}
                  // className={{ display: "none" }}
                />
              </Box>

              <Box pb={2}>
                <Typography>Username</Typography>
                <Input
                  id={"uName"}
                  type="email"
                  maxchar={25}
                  minchar={4}
                  defVal={uname ? uname : user.user}
                  isdisabled={!edit}
                  hdlChange={changeUname}
                  icon={
                    edit
                      ? {
                          endAdornment: <Edit sx={{ color: "white" }} />,
                        }
                      : {}
                  }
                />
                <Box height={"12px"} mt={1} pl="14px">
                  <Typography id="uNameHelper"></Typography>
                </Box>
              </Box>
              <Typography>E-mail</Typography>
              <Input type="email" defVal={user.email} isdisabled />
            </Box>

            <Box display={"flex"} justifyContent="center" pt={2}>
              {!edit && (
                <Input type="buttonCustom" onClickBtn={() => setEdit(true)}>
                  Edit Profile
                </Input>
              )}
              {edit && (
                <Box display={"inline-flex"}>
                  <Input
                    type="buttonCustom"
                    className={{ marginRight: "8px" }}
                    onClickBtn={() => {
                      setEdit(false);
                      setImage(temp.pict);
                      document.getElementById("uName").value = temp.name;
                      document.getElementById("uNameHelper").innerHTML = "";
                    }}
                  >
                    Cancel
                  </Input>
                  <Input
                    type="button"
                    isdisabled={
                      isdisabled.file === false && isdisabled.uName == false
                    }
                  >
                    Save
                  </Input>
                </Box>
              )}
            </Box>
            <Box display={"flex"} justifyContent="center" pt={2}>
              <Input type="buttonCustom" onClickBtn={changePass}>
                Ganti password
              </Input>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
}
