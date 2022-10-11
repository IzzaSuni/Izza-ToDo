import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Input from "../components/Input";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles({
  container: {
    position: "fixed",
    height: "100vh",
    width: "100vw",
    background: "rgb(0 0 0 / 70%)",
    top: 0,
  },
  containerPopUp: {
    width: `calc(50%)`,
    display: "flex",
    flexDirection: "column",
    padding: "16px 16px",
    height: "50%",
    borderRadius: "16px",
    position: "absolute",
    background: "#2B2B2B",
    left: "50%",
    top: 0,
    transform: "translate(-50%,50%)",
  },
  form: {
    justifytitle: "space-between",
    width: ` 100% `,
    marginTop: "32px",
  },
});

const MainForm = ({ id, style, handleSelect, handleSubmit, select, close }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.container} onClick={close} />
      <Box className={`shadow ${classes.containerPopUp}`} id={id}>
        <Typography variant="h4" textAlign={"center"}>
          {style === 1 ? "My Notes" : "Create a Note"}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Input type={"text"} />
          <Input type={"multiline"} />
          <Input type={"select"} hdlChange={handleSelect} select={select} />
          <Box textAlign={"center"} mt={2}>
            <Input type={"button"}>
              Add Notes <AddIcon />
            </Input>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default MainForm;
