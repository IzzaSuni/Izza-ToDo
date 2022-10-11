import {
  Avatar,
  Box,
  Divider,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Ohayo from "./ohayo";
import Input from "../components/Input";
import AddIcon from "@mui/icons-material/Add";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import IsLogin from "../utils/isLogin";
import useQuery from "../utils/Query";
import Filter from "./Filter";

const useStyles = makeStyles({
  box: {
    width: "calc(100%)",
    display: "inline-flex",
    marginTop: "12px",
  },
  boxChild1: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxChild2: {
    width: "calc(18%)",
    display: "flex",
    justifyContent: "center",
  },
  Menu: {
    "& .MuiPopover-paper": {
      background: "#2B2B2B",
      borderRadius: "12px",
      padding: "16px",
      width: "250px",
      marginTop: "8px",
    },
    "& .MuiMenuItem-root": {
      padding: "0px",
    },
  },
});

const Navbar = ({ filter, search, open, logOut, ort, filterValue }) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const { signed, user } = IsLogin();
  const Private = useLocation().pathname === "/publicNote/Private";
  const uname = localStorage.getItem("uname");
  const [Filters, setFilters] = useState(0);

  const deFilter = (e) => {
    setFilters(e);
    filter(e);
  };

  //renderSearchbar
  const searchBar = () => {
    return (
      <InputBase
        sx={{
          borderRadius: "12px",
          mr: ort.small ? 0 : 1,
          width: ort.small ? "90%" : "auto",
          fontSize: "10px",
          fontFamily: "poppins",
          background: "#252933",
          padding: "4px",
        }}
        startAdornment={
          <SearchOutlinedIcon sx={{ fill: "white", fontSize: "24px" }} />
        }
        endAdornment={
          ort.small === true ? (
            <div style={{ display: "flex" }}>
              <Filter ort={ort} filtered={deFilter} mFilter={Filters} />
            </div>
          ) : (
            <></>
          )
        }
        onChange={(e) => search(e)}
        id="searchBar"
        placeholder="Search"
      />
    );
  };

  //renderAddButton
  const togle = () => {
    return (
      <Input type={"buttonCustom"} onClickBtn={open}>
        Add <AddIcon />
      </Input>
    );
  };

  //goto private note
  const privateNote = (state) => {
    return (
      <Input
        type={"buttonCustom"}
        onClickBtn={() => {
          if (state === false) {
            user.user
              ? history.replace(`/publicNote/Private`)
              : history.replace(`/login`);
          } else {
            history.replace(`/publicNote`);
          }
        }}
      >
        {state ? "Private notes" : "Public notes"}
      </Input>
    );
  };

  //handleMenu
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //RenderAva
  const avatar = () => {
    if (signed === true) {
      return (
        <>
          {!ort.small ? (
            <>
              <Avatar
                src={user?.picture}
                sx={{ height: "27px", width: "27px", mr: 1 }}
                onClick={handleClick}
              ></Avatar>
              {Private && signed === true
                ? privateNote(true)
                : privateNote(false)}
            </>
          ) : (
            <>
              <Avatar
                src={user?.picture}
                sx={{ height: "32px", width: "32px", mr: 1 }}
                onClick={handleClick}
              ></Avatar>
            </>
          )}
          <div style={{ color: "white", alignSelf: "center" }}>
            <Menu
              anchorEl={anchorEl}
              open={opens}
              onClose={handleClose}
              className={classes.Menu}
            >
              <Box display="inline-flex" pb={1}>
                <Avatar
                  sx={{ height: "40px", width: "40px" }}
                  onClick={handleClick}
                  src={user?.picture}
                ></Avatar>
                <Typography
                  alignSelf={"center"}
                  fontSize={"14px"}
                  sx={{ marginLeft: 1 }}
                >
                  {uname ? uname : user?.user}
                </Typography>
              </Box>
              <Divider sx={{ background: "white" }}></Divider>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  history.push("/publicNote/Private/profile");
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  logOut();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </>
      );
    }
  };
  //return
  return (
    <>
      {!ort.small ? (
        <>
          <Box className={classes.box} id="Navbar">
            <Box className={classes.boxChild2}>
              {signed ? (
                <Box className={classes.boxChild1}>{avatar()}</Box>
              ) : (
                <></>
              )}

              <Box justifyContent={"center"}>
                {!signed ? (
                  <Input
                    type={"buttonCustom"}
                    onClickBtn={() => history.push("/login")}
                    className={{ border: `0 !important`, marginRight: 1 }}
                    id="loginButton"
                  >
                    Login
                  </Input>
                ) : null}
              </Box>
            </Box>
            <Box
              sx={{
                width: "calc(82% - 16px)",
                display: "inline-flex",
                justifyContent: "space-between",
                marginRight: "8px",
              }}
            >
              <Typography alignSelf="center" fontSize={"12px"} sx={{ pl: 1 }}>
                {Ohayo(signed ? `kak ${user?.user} ` : null)}
              </Typography>
              <Box id="rightSidebar">
                {searchBar()}
                {togle()}
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box>
          <Box className={classes.box} id="Navbar">
            <Box width={"30%"} display="flex" sx={{ translate: "24px" }}>
              {signed ? (
                <Box className={classes.boxChild1}>{avatar()}</Box>
              ) : (
                <></>
              )}

              <Box>
                {!signed ? (
                  <Input
                    type={"buttonCustom"}
                    onClickBtn={() => history.push("/login")}
                    className={{ border: `0 !important`, marginRight: 1 }}
                    id="loginButton"
                  >
                    Login
                  </Input>
                ) : null}
              </Box>
            </Box>
            <Box
              sx={{
                width: "40%",
                display: "inline-flex",
                justifyContent: "center",
              }}
            ></Box>
            <Box
              width={"30%"}
              sx={{ translate: "-24px" }}
              display="flex"
              justifyContent="end"
            >
              {Private && signed === true
                ? privateNote(true)
                : privateNote(false)}
            </Box>
          </Box>
          <Box mt={1} display={"flex"} justifyContent="center" width={"100%"}>
            {searchBar()}
          </Box>{" "}
        </Box>
      )}
    </>
  );
};
export default Navbar;
