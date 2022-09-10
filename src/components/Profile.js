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
import { GetUser, uploadImages } from "../services";
import Edit from "@mui/icons-material/Edit";
import Snackbars from "./Alert";
import Cookies from "universal-cookie";

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
        objectURL = URL.createObjectURL(file);
        setMsg({ message: "Loading", type: "info" });
        setOpen(true);
        setImage(objectURL);
      }
    } else return;
  };

  handleSave
  const save = () => {
    uploadImages({ images: file, name: user.user });
    updateProfile(auth.currentUser, {
      displayName: userName,
    })
  };
  //reset alert
  // useEffect(() => {
  //   if (open === false) {
  //     setMsg({ message: "", type: "" });
  //   }
  // }, [open]);

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

  //changeUname
  const changeUname = (uName) => {
    const es = uName.target.value;
    GetUser(es).then((e) => {
      const helperU = document.getElementById("uNameHelper");
      let msg =
        e === true
          ? user.user === es
            ? ""
            : "Username sudah dipakai ❌"
          : "Username tersedia ✔️";
      if (uName === "") msg = "";
      if (msg === "Username tersedia ✔️") {
        helperU.style.color = "#7DCE13";
      } else {
        helperU.style.color = "#D1512D ";
      }
      helperU.innerHTML = msg;
    });
  };

  if (open === true)
    setTimeout(() => {
      setOpen(false);
    }, 3000);



  return (
    <>
      {renderAlert()}
      <Box className={classes.container}>
        <Box className={`${classes.card} shadow`}>
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
                defVal={user.user}
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
                  onClickBtn={() => {
                    setEdit(false);
                    setImage(temp.pict);
                    document.getElementById("uName").value = temp.name;
                  }}
                >
                  Cancel
                </Input>
                <Input
                  type="buttonCustom"
                  onClickBtn={() => {
                    setEdit(false);
                    setTemp({
                      ...temp,
                      name: document.getElementById("uName").value,
                    });
                  }}
                >
                  Save
                </Input>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
