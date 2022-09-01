import { Box } from "@mui/system";

const Img = ({ width = "30px", height = "30px", src, px, onClick }) => {
  console.log(onCLick)
  return (
    <Box>
      <img
        onClick={onClick}
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
