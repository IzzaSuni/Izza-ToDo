import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
//icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

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
      color: "white",
      background: "transparent ",
      borderRadius: "32px",
      border: "1px solid white",
      padding: "4px 16px",
      "&:hover": {
        background: "#693737",
        color: "white ",
      },
      "&:active": {
        background: "#693737",
        color: "white ",
      },
      "& .MuiLoadingButton-loadingIndicator": {
        color: "white !important",
      },
      "&.Mui-disabled": {
        color: "rgba(255, 255, 255, 0.541)",
      },
    },
  },
  TextField: {
    "&:hover fieldset": {
      borderColor: "#100F0F !important",
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& fieldset": {
      borderColor: "white !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white !important",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px !important",
      color: "white",
    },
  },
  TextFields: {
    "& .MuiInputBase-input": {
      padding: "0px !important",
      borderBottom: "1px white dashed !important",
      width: "100%",
    },
  },
  login: {
    "&:hover fieldset": {
      borderColor: "white !important",
    },
    "& label.Mui-focused": {
      color: "black",
    },
    "& fieldset": {
      borderColor: "white !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white !important",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px !important",
    },
  },
  form: {
    justifytitle: "space-between",
    width: ` 100% `,
    marginTop: "32px",
  },
  editForm: { width: "100%", display: "flex", padding: "0px 8px" },
  smallBox: {
    height: "10px",
    width: "10px",
    marginRight: "32px",
    borderRadius: "16px",
    paddingLeft: "16px",
    border: "1px dashed black",
  },
  Menu: {
    "&.MuiMenu-list": {
      background: "#2B2B2B",
      borderRadius: "12px",
      padding: "16px",
      width: "250px",
    },
    "& .MuiMenuItem-root": {
      padding: "0px",
    },
  },
});

export default function Input({
  type,
  hdlChange,
  children,
  defVal,
  hdlEdit,
  onClickBtn,
  className,
  label,
  inputType,
  loading,
  maxchar,
  isdisabled,
  icon,
  id,
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
            inputProps={{ maxLength: "20" }}
            sx={{ width: "100%", marginBottom: 3 }}
          />
        );
      case "email":
        return (
          <TextField
            size={"small"}
            defaultValue={defVal}
            id={id}
            label={label}
            placeholder={label}
            className={classes.login}
            type={inputType}
            inputProps={{ maxLength: maxchar }}
            InputProps={icon}
            disabled={isdisabled}
            sx={{
              width: "100%",
              marginBottom: 3,
              "&.MuiFormControl-root": {
                marginBottom: 0,
              },
              "& .Mui-focused": {
                color: "white !important",
              },
              "& .Mui-disabled": {
                WebkitTextFillColor: "rgb(255 255 255 / 40%) !important",
              },
            }}
            onChange={hdlChange}
          />
        );

      case "file":
        return (
          <TextField
            size={"small"}
            defaultValue={defVal}
            id={id}
            label={label}
            placeholder={label}
            className={classes.login}
            type={inputType}
            inputProps={{ accept: "image/*" }}
            InputProps={icon}
            disabled={isdisabled}
            sx={{
              display: 'none'
            }}
            onChange={hdlChange}
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
            sx={{ width: "100%", marginBottom: 3, borderRadius: 12 }}
          />
        );
      case "select":
        return (
          <FormControl
            fullWidth
            className={`${classes.TextField} `}
            sx={{
              marginBottom: "24px",
            }}
            id="kontol"
          >
            <InputLabel id="catLabel">Select Category</InputLabel>
            <Select
              id="catuu"
              label="Select Category"
              onChange={hdlChange}
              defaultChecked={false}
              required
              className={`${classes.Menu}`}
            >
              <MenuItem value={"Reminder"} disabled>
                Select a category
              </MenuItem>
              <MenuItem value={"Work"}>Work</MenuItem>
              <MenuItem value={"To do"}>To do</MenuItem>
              <MenuItem value={"Money"}>Money</MenuItem>
              <MenuItem value={"Reminder"}>Reminder</MenuItem>
              <MenuItem value={"Assignment"}>Task</MenuItem>
              <MenuItem value={"Study"}>Study</MenuItem>
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
            sx={className}
            id={id}
          >
            {children}
          </Button>
        );
      case "buttonLoading":
        return (
          <LoadingButton
            disableRipple
            type="submit"
            variant="contained"
            loading={loading}
            className={classes.Button}
            sx={className}
            disabled={isdisabled}
            loadingPosition="end"
          >
            {children}
          </LoadingButton>
        );
      case "buttonCustom":
        return (
          <Button
            disableRipple
            type="button"
            onClick={onClickBtn}
            className={`${classes.Button}`}
            id={id}
            style={className}
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
