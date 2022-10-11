import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box
      width={`calc("100vw - 32px")`}
      display={"flex"}
      alignItems={"center "}
      className="master"
    >
      {children}
    </Box>
  );
};
export default Layout;
