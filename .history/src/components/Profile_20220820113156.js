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
  console.log(user.user);
  return (
    <>
      <Box className={classes.container}>
        <Box className={`${classes.card} shadow`}>
          <Box display="inline-flex">
            <Avatar src={user.picture}></Avatar>
            <Typography sx={{ pl: 2 }} alignSelf={"center"} variant={"h5"}>
              {user.user}
            </Typography>
          </Box>
          <Box>
            <Box pb={2}>
              <Typography>Username</Typography>
              <Input type="email" defVal={user.user} isdisabled={true} />
            </Box>
            <Typography>E-mail</Typography>
            <Input type="email" defVal={user.email} isdisabled />
            <Input type="email" defVal={user.user} isdisabled />
          </Box>
        </Box>
      </Box>
    </>
  );
}
