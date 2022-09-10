import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box
      height={"100vh"}
      width={`calc("100vw - 32px")`}
      display={"flex"}
      alignItems={"center "}
    >
      {children}
    </Box>
  );
};
export default Layout;
