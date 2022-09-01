import IsLogin from "../utils/isLogin";
import { makeStyles } from "@mui/styles";
import { Avatar, Box, Typography } from "@mui/material";
import Input from "./Input";
import { useState } from "react";

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
  const { user, signed } = IsLogin();
  const classes = useStyles();

  const onChangeFile = (e) => {
    if (objectURL) {
      URL.revokeObjectURL(objectURL);
    }
    console.log(e);
    const file = e.target.files[0];
    objectURL = URL.createObjectURL(file);
    return setImage(objectURL);
  };

  return (
    <>
      <Box className={classes.container}>
        <Box className={`${classes.card} shadow`}>
          <Box display="inline-flex">
            <Avatar src={user.picture}></Avatar>
          </Box>
          <Box>
            <Box pb={2}>
              <Typography>Profile pict</Typography>
              <label htmlFor="uploadImg">
                <Input
                  type={"buttonCustom"}
                  onClickBtn={() =>
                    document.getElementById("uploadImg").click()
                  }
                  id="buttonUpload"
                >
                  Upload Image
                </Input>
                <Input
                  id={"uploadImg"}
                  type="file"
                  inputType={"file"}
                  hdlChange={onChangeFile}
                />
              </label>
              <a href={image} download="gambar">
                HALOO
              </a>
              <img src={image} />
            </Box>
            <Box></Box>
            <Box pb={2}>
              <Typography>Username</Typography>
              <Input type="email" defVal={user.user} isdisabled={true} />
            </Box>
            <Typography>E-mail</Typography>
            <Input type="email" defVal={user.email} isdisabled />
            <Box pt={2}>
              <Input type="buttonCustom">Reset Password</Input>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
