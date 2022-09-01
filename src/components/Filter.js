import {
  Box,
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
    height: "calc(100vh - 24px)",
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
    fontSize: "18px !important",
    color: "white",
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
      <Box className={classes.paperList} height="100%" id="listForm">
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
