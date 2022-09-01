import { Box } from "@mui/system";

const Img = ({ online, width = "30px", height = "30px", src, px, onClick }) => {
  return (
    <Box>
      <img
        onClick={onClick}
        src={online ? src : process.env.PUBLIC_URL + src}
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
