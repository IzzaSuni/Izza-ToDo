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
import Input from "./Input";
import AddIcon from "@mui/icons-material/Add";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import IsLogin from "../utils/isLogin";
import useQuery from "../utils/Query";
const useStyles = makeStyles({
  box: {
    width: "calc(100% - 24px)",
    display: "inline-flex",
    marginTop: "12px",
    marginLeft: "12px",
  },
  boxChild1: {
    display: "inline-flex",
  },
  boxChild2: {
    width: "calc(18%  )",
    display: "flex",
    justifyContent: "space-between",
  },
  Menu: {
    "& .MuiPopover-paper": {
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

const Navbar = ({ filter, search, open, logOut }) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const { signed, user } = IsLogin();
  const param = useQuery().get("user");
  const loct = useLocation().pathname;
  //renderSearchbar
  const searchBar = () => {
    return (
      <InputBase
        sx={{ border: "2px white solid", borderRadius: "16px", ml: 1 }}
        endAdornment={
          <SearchOutlinedIcon sx={{ fill: "white", fontSize: "14px" }} />
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
        Add Notes <AddIcon />
      </Input>
    );
  };

  //goto private note
  const privateNote = (state) => {
    return (
      <Input
        type={"buttonCustom"}
        className={{ marginRight: "8px" }}
        onClickBtn={() => {
          if (state === true) {
            history.push(`/publicNote/Private?user=${user?.user}`);
            window.location.reload();
          } else {
            history.push(`/publicNote`);
            window.location.reload();
          }
        }}
      >
        {state ? "Private Note" : "Public Note"}
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
          <Avatar
            sx={{ height: "27px", width: "27px" }}
            onClick={handleClick}
          ></Avatar>
          <Typography alignSelf="center" sx={{ pl: 1 }} fontSize="16px">
            {loct === "/publicNote" ? `Public Notes` : `Private Notes`}
          </Typography>
          <div style={{ color: "white", alignSelf: "center" }}>
            <Menu
              anchorEl={anchorEl}
              open={opens}
              onClose={handleClose}
              className={classes.Menu}
            >
              <Box display="inline-flex" pb={1}>
                <Avatar
                  sx={{ height: "27px", width: "27px" }}
                  onClick={handleClick}
                >
                  {user?.user[0]}
                </Avatar>
                <Typography
                  alignSelf={"center"}
                  fontSize={"14px"}
                  sx={{ marginLeft: 1 }}
                >
                  {user?.user}
                </Typography>
              </Box>
              <Divider sx={{ background: "white" }}></Divider>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
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
    <Box className={classes.box}>
      <Box className={classes.boxChild2}>
        {signed ? <Box className={classes.boxChild1}>{avatar()}</Box> : <></>}

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
          width: "82%",
          display: "inline-flex",
          justifyContent: "space-between",
        }}
      >
        <Typography alignSelf="center" fontSize={"18px"} sx={{ pl: 1 }}>
          {Ohayo(signed ? `kak ${user?.user} ` : null)}
        </Typography>
        <Box>
          {param === user?.user && signed === true
            ? privateNote(false)
            : privateNote(true)}
          {togle()}
          {searchBar()}
        </Box>
      </Box>
    </Box>
  );
};
export default Navbar;
