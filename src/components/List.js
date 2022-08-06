import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Avatar, Box, ButtonBase, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../index.css";
import Masonry from "react-masonry-css";
import moment from "moment";
import Input from "./Input";

const useStyles = makeStyles({
  Button: {
    "&.MuiButtonBase-root": {
      marginRight: "4px !important ",
      marginLeft: "4px !important ",
      textTransform: "none",
      alignSelf: "auto",
      color: "#AC7088 ",
      "&:hover": {
        color: "red",
      },
      "&:active": {
        color: "red",
      },
    },
  },

  tiny: {
    fontSize: "10px !important",
    alignSelf: "center",
    color: "#AC7088",
  },

  editForm: { width: "100%", display: "flex" },
});

export default function ListNotes({
  list,
  handleCancel,
  handleDelete,
  handleEdit,
  handleEditSubmit,
}) {
  const classes = useStyles();

  //   Render Button title
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
        <ClearIcon />
      </>
    ) : (
      <>
        <EditIcon />
      </>
    );
  };

  //ColorAvatar
  const avatar = (e) => {
    if (e === "ToDo") return "#EAE509";
    if (e === "Work") return "#FF8FB1";
    if (e === "Reminder") return "#B270A2";
    if (e === "Money") return "#7A4495";
  };

  //breakpoints
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    500: 1,
  };

  //return
  return (
    <Box py={1}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {list?.map((value, index) => (
          <Box item key={`${value.title} + ${Math.random()}`}>
            <Box
              bgcolor={"White"}
              mx={0.5}
              p={1}
              borderRadius="8px"
              className="shadow"
            >
              <Box
                display={"inline-flex"}
                width="100%"
                justifyContent={"space-between"}
              >
                <Box display="inline-flex">
                  <Avatar
                    sx={{ alignSelf: "baseline", bgcolor: avatar(value.cat) }}
                  >
                    {value.cat[0]}
                  </Avatar>
                  <Box display="block" pl="8px">
                    {value.isedit === false ? (
                      <Typography fontSize={"16px"}>{value.title}</Typography>
                    ) : (
                      <Input
                        type={"editTitle"}
                        defVal={value}
                        hdlEdit={(e) => handleEdit(e, index, "title")}
                      />
                    )}
                    <Typography className={classes.tiny}>
                      {value.cat}
                    </Typography>
                    <Typography className={classes.tiny}>
                      {value.edited ? " edited " : ""}
                      {moment(
                        value.edited ? value.lastEdit : value.time
                      ).fromNow()}
                    </Typography>
                  </Box>
                </Box>
                <Box display="block" textAlign={"end"}>
                  <Box>
                    <ButtonBase
                      disableRipple
                      className={classes.Button}
                      type={value.isedit ? "submit" : "button"}
                      onClick={(event) => {
                        value.isedit
                          ? handleEditSubmit(event, index)
                          : handleDelete(index);
                      }}
                    >
                      {renderButton({ value: value, type: "delete" })}
                    </ButtonBase>
                    <ButtonBase
                      disableRipple
                      type="button"
                      className={classes.Button}
                      onClick={(event) => {
                        value.isedit
                          ? handleCancel(index)
                          : handleEdit(event, index);
                      }}
                    >
                      {renderButton({ value: value, type: "edit" })}
                    </ButtonBase>
                  </Box>
                  <Box
                    display={"flex"}
                    width="100%"
                    justifyContent={"center"}
                    sx={{ opacity: value.isedit ? 1 : 0 }}
                  >
                    <InfoOutlinedIcon className={classes.tiny} />
                    <Typography className={classes.tiny}>
                      &nbsp;editing
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                display="inline-flex"
                width="100%"
                justifyContent={"space-between"}
              >
                <Input type={"divider"} />
              </Box>
              {value.isedit === false ? (
                <Typography
                  sx={{
                    mt: 2,
                  }}
                  lineHeight={"18px"}
                >
                  {value.desc}
                </Typography>
              ) : (
                <Input
                  type={"editDesc"}
                  defVal={value}
                  hdlEdit={(e) => handleEdit(e, index)}
                />
              )}
            </Box>
          </Box>
        ))}
      </Masonry>
    </Box>
  );
}
