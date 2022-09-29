import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import ListNotes from "./List";

const useStyles = makeStyles({
  paperList: {
    width: "82%",
    flexWrap: "wrap",
    background: "#2C3639!important",
    overflow: "auto",
  },
  box: {
    width: "calc(18%)",
    height: "calc(100vh - 60px)",
    paddingTop: "12px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    // boxShadow: "5px 0px 5px #693737",
  },
  pad: {
    "&.MuiButtonBase-root": {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      borderRadius: "0 32px 32px 0",
    },
  },
  filterText: {
    fontSize: "12px !important",
    color: "white",
    width: "auto",
  },
  filter: {
    "&.Mui-selected": {
      backgroundColor: "#693737 !important",
      borderRadius: "0 32px 32px 0",
    },
    "& MuiTouchRipple-child": {
      backgroundColor: "#693737",
    },
  },
  root: {
    "&.MuiList-root": {
      paddingTop: 0,
    },
  },
});
const Filter = ({
  handleDelete,
  handleEdit,
  handleCancel,
  handleEditSubmit,
  list,
  search,
  ort,
}) => {
  const classes = useStyles();
  const [filter, setFilter] = useState(0);

  //colored amount label
  const label = (color, amount) => {
    return (
      <Box height={"20px"} width="24px" bgcolor={color} borderRadius="4px">
        <Typography
          textAlign={"center"}
          fontSize={"12px"}
          fontWeight="800"
          color="white"
        >
          {amount}
        </Typography>
      </Box>
    );
  };

  return (
    <>
      {!ort.small ? (
        <>
          <Box className={classes.box}>
            <Box>
              <List className={classes.root}>
                {filters.map((e, i) => {
                  return (
                    <ListItemButton
                      TouchRippleProps={{ background: "#693737" }}
                      key={`item` + i}
                      autoFocus={filter === i}
                      selected={filter === i}
                      onClick={() => setFilter(i)}
                      className={`${classes.filter} ${classes.pad}`}
                    >
                      <Typography className={classes.filterText}>
                        {e.text}
                      </Typography>
                      {label(e.color, e.amount)}
                    </ListItemButton>
                  );
                })}
              </List>
            </Box>
          </Box>
          <Box
            className={classes.paperList}
            height="calc(100vh - 60px)"
            id="listForm"
          >
            <ListNotes
              handleDelete={handleDelete}
              handleCancel={handleCancel}
              handleEdit={handleEdit}
              handleEditSubmit={handleEditSubmit}
              list={list}
              filter={filters[filter].text}
              isfilter={filter !== 0}
              search={search}
            />
          </Box>
        </>
      ) : (
        <Box
          mt={2}
          bgcolor={"#4C3A51"}
          borderRadius="32px 32px 0 0"
          display={"block"}
          width="100%"
          height={`calc(100vh - 200px)`}
        >
          <Box display={"flex"} justifyContent="center">
            <Box mt={2} display="flex">
              <List sx={{ display: "flex", width: "100vw",overflowX:'scroll' }}>
                {filters.map((e, i) => {
                  return (
                    <Button
                      key={`item` + i}
                      onClick={() => setFilter(i)}
                      className={`  ${filter === i ? "selected" : ""}`}
                      sx={{
                        background: e.color,
                        margin: "0 8px 8px 8px",
                        borderRadius: "12px !important",
                        "&.selected": {
                          border: `1px white solid !important`,
                          borderRadius: "0 32px 32px 0",
                        },
                        "&:hover": {
                          background: `${e.color} !important`,
                        },
                      }}
                    >
                      <Typography className={classes.filterText}>
                        {e.text}
                      </Typography>
                    </Button>
                  );
                })}
              </List>
            </Box>
          </Box>
          <Box
            width={"100%"}
            height="calc(100vh - 290px)"
            overflow={"scroll"}
            id="listForm"
          >
            <ListNotes
              handleDelete={handleDelete}
              handleCancel={handleCancel}
              handleEdit={handleEdit}
              handleEditSubmit={handleEditSubmit}
              list={list}
              filter={filters[filter].text}
              isfilter={filter !== 0}
              search={search}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Filter;

const filters = [
  {
    text: "All",
    color: "#693737",
    amount: 14,
  },
  {
    text: "To do",
    color: "#54BAB9",
    amount: 14,
  },
  {
    text: "Work",
    color: "#533535",
    amount: 14,
  },
  {
    text: "Reminder",
    color: "#FF6363",
    amount: 14,
  },
  {
    text: "Money",
    color: "#8479E1",
    amount: 14,
  },
  {
    text: "Assignment",
    color: "#F0A500",
    amount: 14,
  },
  {
    text: "Study",
    color: "#2B2B2B",
    amount: 14,
  },
];
