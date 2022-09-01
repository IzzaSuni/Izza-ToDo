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
import "moment/locale/id";
import IsLogin from "../utils/isLogin";
moment.locale("id");

const useStyles = makeStyles({
  Button: {
    "&.MuiButtonBase-root": {
      marginRight: "4px !important ",
      marginLeft: "4px !important ",
      textTransform: "none",
      alignSelf: "auto",
      color: "white",
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
    fontWeight: "200",
  },

  editForm: { width: "100%", display: "flex" },
});

export default function ListNotes({
  list,
  handleCancel,
  handleDelete,
  handleEdit,
  handleEditSubmit,
  filter,
  isfilter,
  search,
}) {
  moment.locale("id");
  const classes = useStyles();
  const { user } = IsLogin();
  if (typeof user.user === 'object') user.user = "anonymous";
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

  //breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    900: 2,
    500: 1,
  };

  //generate color card
  const generateColor = (cat) => {
    switch (cat) {
      case "To do":
        return "#54BAB9";
      case "Work":
        return "#533535";
      case "Reminder":
        return "#FF6363";
      case "Money":
        return "#8479E1";
      case "Assignment":
        return "#F0A500";
      case "Study":
        return "#2B2B2B";
      default:
        break;
    }
  };

  //return
  return (
    <Box p={1}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {list?.map((value, index) => {
          value.timeText = moment(value.time).format("DD MMMM YYYY, hh:mm");
          if (isfilter) {
            if (filter !== value.cat) return;
          }
          if (search) {
            if (
              value.title.toLowerCase().includes(search.toLowerCase()) ===
                false &&
              value.desc.toLowerCase().includes(search.toLowerCase()) ===
                false &&
              value.timeText.toLowerCase().includes(search.toLowerCase()) ===
                false
            )
              return;
          }
          return (
            <Box key={`${value.title} + ${Math.random()}`}>
              <Box
                bgcolor={() => generateColor(value.cat)}
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
                    <Box display="block">
                      {value.isedit === false ? (
                        <Typography
                          color={`${value.color} !important`}
                          fontSize={"16px"}
                          fontWeight="bold"
                        >
                          {value.title}
                        </Typography>
                      ) : (
                        <Input
                          type={"editTitle"}
                          defVal={value}
                          hdlEdit={(e) => handleEdit(e, index, "title")}
                        />
                      )}
                      <Typography
                        color={`${value.color} !important`}
                        className={classes.tiny}
                      >
                        {value.cat} | {value.edited ? " diedit " : ""}
                        {moment(
                          value.edited ? value.lastEdit : value.time
                        ).fromNow()}{" "}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="block" textAlign={"end"}>
                    {user?.user !== value?.author ? (
                      <></>
                    ) : (
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
                    )}
                    <Box
                      display={"flex"}
                      width="100%"
                      justifyContent={"center"}
                      sx={{ opacity: value.isedit ? 1 : 0 }}
                    >
                      <InfoOutlinedIcon className={classes.tiny} />
                      <Typography
                        color={`${value.color} !important`}
                        className={classes.tiny}
                      >
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
                    color={`${value.color} !important`}
                    sx={{
                      mt: 1,
                    }}
                    lineHeight={"18px"}
                    fontWeight="550"
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
                <Typography
                  sx={{ width: "100%", pt: 2 }}
                  textAlign="end"
                  className={classes.tiny}
                >
                  {value.timeText}

                  {value.author ? ` - ${value.author}` : ""}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Masonry>
    </Box>
  );
}
