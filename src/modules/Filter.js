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
import { useEffect, useLayoutEffect, useState } from "react";
import getOffset from "../utils/getPost";
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
let mfilter = 0;

const Filter = ({
  handleDelete,
  handleEdit,
  handleCancel,
  handleEditSubmit,
  list,
  search,
  ort,
  type,
  filtered,
  mFilter,
}) => {
  const classes = useStyles();
  const [filter, setFilter] = useState(0);
  useEffect(() => {
    if (typeof mFilter === "undefined") return;
    setFilter(mFilter);
  }, [mFilter]);

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
  const container = document.getElementById("itemContainer");

  const clickScroll = (el, id) => {
    el?.addEventListener("click", (e) => {
      container?.scrollTo({
        left: getOffset(el, container),
        behavior: "smooth",
      });
    });
    let time;
    container?.addEventListener("scroll", () => {
      if (
        container?.scrollLeft >= getOffset(el) - 30 &&
        container?.scrollLeft < 30 + getOffset(el)
      ) {
        setFilter(id);
        if (container.scrollLeft !== getOffset(el)) {
          time = setTimeout(() => {
            container?.scrollTo({
              left: getOffset(el, container),
              behavior: "smooth",
            });
          }, 4000);
          console.log(time);
        }
      }
      if (time) clearTimeout(time);
    });
  };
  ["item-0", "item-1", "item-2", "item-3"].map((e, i) => {
    clickScroll(document.getElementById(e), i);
  });

  //return
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
      ) : type === "list" ? (
        <Box width={"100%"} mt={2} minWidth="100vw" id="listForm">
          <ListNotes
            handleCancel={handleCancel}
            handleEdit={handleEdit}
            handleEditSubmit={handleEditSubmit}
            list={list}
            filter={filters[filter].text}
            isfilter={filter !== 0}
            search={search}
          />
        </Box>
      ) : (
        <List
          sx={{
            display: "flex",
            background: "#252933",
            borderRadius: "12px",
            placeContent: "flex-start",
            width: "64px",
            overflow: "auto",
            padding: "2px 0",
          }}
          id="itemContainer"
        >
          {filters.map((e, i) => {
            return (
              <Button
                key={`item` + i}
                id={`item-${i}`}
                onClick={() => filtered(i)}
                className={`${filter === i ? "selected" : ""}`}
                sx={{
                  borderRadius: "12px !important",
                  margin: "0 8px 0 0",
                  "&.selected": {
                    border: `1px white solid !important`,
                    background: "#181c25",
                  },
                  "&:hover": {
                    background: `${e.color} !important`,
                  },
                  padding: 0,
                }}
              >
                <Typography className={classes.filterText}>{e.text}</Typography>
              </Button>
            );
          })}
        </List>
      )}
    </>
  );
};

export default Filter;

const filters = [
  {
    text: "All",
    amount: 14,
  },
  {
    text: "To do",
    amount: 14,
  },

  {
    text: "Reminder",
    amount: 14,
  },
  {
    text: "Money",
    amount: 14,
  },
];
