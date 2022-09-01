import { Box } from "@mui/system";

const Img = ({ width = "30px", height = "30px", src }) => {
  return (
    <Box>
      <img
        src={process.env.PUBLIC_URL + src}
        style={{ height: height, width: width }}
        alt={src}
      />
    </Box>
  );
};

export default Img;
