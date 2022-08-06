import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
//icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";

const useStyles = makeStyles({
  paper: {
    height: "100%",
    width: "20%",
    background: "#E7F6F2 !important",
    borderRadius: "16px",
    overflow: "auto",
  },
  paperList: {
    height: "100%",
    width: "80%",
    flexWrap: "wrap",
    background: "#CEE5D0 !important",
    overflow: "auto",
  },
  Button: {
    "&.MuiButton-root": {
      textTransform: "none !important",
      color: "#100F0F",
      background: "#CEE5D0 ",
      "&:hover": {
        background: "#100F0F",
        color: "#CEE5D0 ",
      },
      "&:active": {
        background: "#100F0F",
        color: "#CEE5D0 ",
      },
    },
  },
  TextField: {
    "&:hover fieldset": {
      borderColor: "#100F0F !important",
    },
    "& label.Mui-focused": {
      color: "black",
    },
    "& fieldset": {
      borderColor: "#0F3D3E !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0F3D3E !important",
    },
  },
  TextFields: {
    width: "100%",

    "& .MuiInputBase-input": {
      padding: "0px !important",
      borderBottom: "1px #100F0F dashed !important",
    },
  },
  form: {
    justifytitle: "space-between",
    width: ` 100% `,
    marginTop: "32px",
  },
  editForm: { width: "100%", display: "flex", padding: "0px 8px" },
});

export default function Input({
  type,
  select,
  hdlChange,
  children,
  defVal,
  hdlEdit,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const renderButton = ({ value, type }) => {
    return type === "delete" ? (
      value.isedit ? (
        <>
          <DoneIcon />
        </>
      ) : (
        <>
          <DeleteIcon />
        </>
      )
    ) : value.isedit ? (
      <>
        <ClearIcon sx={{ ml: 1 }} />
      </>
    ) : (
      <>
        <EditIcon sx={{ ml: 1 }} />
      </>
    );
  };

  const classes = useStyles();
  const renderInput = () => {
    switch (type) {
      case "text":
        return (
          <TextField
            size={"small"}
            label={"Title"}
            placeholder="Type the title here"
            className={classes.TextField}
            required
            inputProps={{ maxLength: "15" }}
            sx={{ width: "100%", marginBottom: 3 }}
          />
        );
      case "multiline":
        return (
          <TextField
            label={"Description"}
            size={"medium"}
            placeholder="Type the description here"
            className={classes.TextField}
            multiline
            sx={{ width: "100%", marginBottom: 3 }}
          />
        );
      case "select":
        return (
          <FormControl fullWidth className={classes.TextField}>
            <InputLabel id="catLabel">Category</InputLabel>
            <Select
              id="cat"
              label="Category"
              value={select}
              onChange={hdlChange}
            >
              <MenuItem value={"Select a category"} disabled>
                Select a category
              </MenuItem>
              <MenuItem value={"Work"}>Work</MenuItem>
              <MenuItem value={"ToDo"}>ToDo</MenuItem>
              <MenuItem value={"Money"}>Money</MenuItem>
              <MenuItem value={"Reminder"}>Reminder</MenuItem>
              <MenuItem value={"Task"}>Task</MenuItem>
            </Select>
          </FormControl>
        );
      case "button":
        return (
          <Button
            disableRipple
            type="submit"
            variant="contained"
            className={classes.Button}
          >
            {children}
          </Button>
        );

      case "editTitle":
        return (
          <InputBase
            defaultValue={defVal.title}
            onChange={hdlEdit}
            className={classes.TextFields}
            disabled={defVal.isedit === true ? false : true}
            sx={{
              fontSize: "16px !important",
            }}
          />
        );
      case "editDesc":
        return (
          <InputBase
            sx={{
              width: "100%",
              padding: "0px !important",
              mt: 2,
              lineHeight: "18px",
            }}
            defaultValue={defVal.desc}
            onChange={hdlEdit}
            className={classes.TextFields}
            disabled={defVal.isedit === true ? false : true}
            multiline
          />
        );
      case "divider":
        return (
          <Box
            height={"1px"}
            width="100%"
            bgcolor={"#CEE5D0"}
            mx={2}
            variant="middle"
            alignSelf={"center "}
          />
        );
      default:
        break;
    }
  };
  return renderInput();
}
