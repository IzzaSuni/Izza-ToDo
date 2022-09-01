import { Box } from "@mui/system";

const Img = ({ width = "30px", height = "30px", src, px, onClick }) => {
  return (
    <Box onClick={onClick}>
      <img
        src={process.env.PUBLIC_URL + src}
        style={{
          height: height,
          width: width,
          margin: `0 ${px}`,
          cursor: "pointer",
        }}
        alt={src}
      />
    </Box>
  );
};

export default Img;
