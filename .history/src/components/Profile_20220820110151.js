import IsLogin from "../utils/isLogin";

export default function Profile() {
  const { user, signed } = IsLogin();

  return (
    <>
      {" "}
      <Box className={classes.container}>
        <Box className={`${classes.card} shadow`}>
          
        </Box>
      </Box>
    </>
  );
}
