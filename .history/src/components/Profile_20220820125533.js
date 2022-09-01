import IsLogin from "../utils/isLogin";
import { makeStyles } from "@mui/styles";
import { Avatar, Box, Typography } from "@mui/material";
import Input from "./Input";

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
  const { user, signed } = IsLogin();
  const classes = useStyles();

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
                <Input id={"uploadImg"} type="email" inputType={"file"} />
              </label>
            </Box>
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
