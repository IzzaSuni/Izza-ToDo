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
      // revoke the old object url to avoid using more memory than needed
      URL.revokeObjectURL(objectURL);
    }

    const file = e.target.file[0];
    objectURL = URL.createObjectURL(file);
    setImage(objectURL);
    link.download = file.name; // this name is used when the user downloads the file
    link.href = objectURL;
  };

  console.log(image);
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
