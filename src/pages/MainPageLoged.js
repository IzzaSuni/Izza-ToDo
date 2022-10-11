import { Button, Drawer, SwipeableDrawer, Typography } from "@mui/material";
//icons
import AddIcon from "@mui/icons-material/Add";
import * as service from "../services";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Input from "../components/Input";
import Filter from "../modules/Filter";
import Navbar from "../modules/navbar";
import Cookies from "universal-cookie";
import IsLogin from "../utils/isLogin";
import {
  useHistory,
  useLocation,
  useParams,
  withRouter,
} from "react-router-dom";
import useQuery from "../utils/Query";
import ListNotes from "../modules/List";

const useStyles = makeStyles({
  container: {
    position: "fixed",
    height: "100vh",
    width: "100vw",
    background: "rgb(0 0 0 / 70%)",
    top: 0,
  },
  paperList: {
    width: "82%",
    flexWrap: "wrap",
    background: "#2C3639!important",
    overflow: "auto",
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

const MainPage = (prop) => {
  //check if signed
  const { signed, user } = IsLogin();
  const [list, setList] = useState([]);
  const [select, setSelect] = useState("Reminder");
  const [openForm, setOpenForm] = useState(false);
  const [renderId, setRenderId] = useState(
    window.innerWidth > 900
      ? { big: true, small: false }
      : { big: false, small: true }
  );
  const cookies = new Cookies();
  const [search, setSearch] = useState();
  const classes = useStyles();
  const history = useHistory();
  const query = useQuery();
  const location = useLocation().pathname === "/publicNote";
  const Private = useLocation().pathname === "/publicNote/Private";

  // getData from API
  useEffect(() => {
    if (signed === true && Private) {
      service
        .GetNotes({
          type: "notes",
          author: user?.user,
        })
        .then((e) => {
          e.forEach((ev) => {
            ev.isedit = false;
            ev.temp = "";
          });
          setList([...list, ...e]);
        });
    } else {
      history.push("/publicNote");
      service
        .GetNotes({
          type: "publicNote",
        })
        .then((e) => {
          e.forEach((ev) => {
            ev.isedit = false;
            ev.temp = "";
          });
          setList([...list, ...e]);
        });
    }
  }, []);

  //checkDatachange
  const check = (e) => {
    let val = [];
    const a = ["title", "desc", "time", "cat"];
    a.forEach((ev, i) => {
      val.push(e[ev] === e.temp[ev]);
    });
    return val.find((e) => e === false);
  };

  //handleLogout
  const logOut = () => {
    cookies.remove("akikToken");
    localStorage.clear();
    return history.push("/login");
  };

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[2].value;
    const cat = e.target[5].value;
    const picture = user.picture;
    if (title.length === 0) return;
    const data = {
      title: title,
      isedit: false,
      temp: "",
      desc: desc,
      cat: cat,
      time: `${moment().format()}`,
      author: user.user ? user.user : "anonymous",
      picture: picture,
    };
    setList([...list, data]);
    service.CreateNote(data, !location ? "notes" : "publicNote");
    setOpenForm(false);
  };

  //handleDelete
  const handleDelete = (index) => {
    const oldArr = list.slice();
    const data = oldArr[index].id;
    oldArr.splice(index, 1);
    if (data) service.DeleteNote(data, !location ? "notes" : "publicNote");
    return setList(oldArr);
  };

  //handleEdit
  const handleEdit = (event, index, type) => {
    const oldArr = list.slice();
    if (event.type === "click") {
      oldArr[index].temp = { ...oldArr[index] };
      oldArr[index].isedit = true;
      return setList(oldArr);
    }
    event.type === "change" && type === "title"
      ? (oldArr[index].title = event.target.value)
      : (oldArr[index].desc = event.target.value);
  };

  //handleEditSubmit
  const handleEditSubmit = (event, index) => {
    event.preventDefault();
    const oldArr = list.slice();
    const data = oldArr[index];
    if (check(data) === false) {
      data.temp = "";
      data.edited = true;
      data.lastEdit = `${moment().format()}`;
      if (data.id) {
        data.isedit = false;
        data.temp = "";
        service.UpdateNote(data, !location ? "notes" : "publicNote");
      }
    }
    data.isedit = false;
    return setList(oldArr);
  };

  //handleCancel
  const handleCancel = (index) => {
    const oldArr = list.slice();
    oldArr[index].title = oldArr[index].temp.title;
    oldArr[index].desc = oldArr[index].temp.desc;
    oldArr[index].isedit = false;
    return setList(oldArr);
  };

  //handleSelect
  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  //Form add note
  const mainForm = (id, style) => {
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

  //listener screen
  useEffect(() => {
    window.onresize = function () {
      if (window.innerWidth >= 900) {
        if (renderId.big === true && renderId.small === false) return;
        else if (renderId.big === false && renderId.small === true) {
          return setRenderId({ big: true, small: false });
        }
      } else if (window.innerWidth < 900) {
        if (renderId.big === false && renderId.small === true) return;
        else if (renderId.big === true && renderId.small === false) {
          return setRenderId({ big: false, small: true });
        }
      }
    };
  }, [renderId]);

  //render shadow footer and header

  //handleSearch
  const handleSearch = (e, type) => {
    type === "clear" ? setSearch("") : setSearch(e.target.value);
  };

  //clearOpenForm
  const close = () => {
    setOpenForm(false);
  };

  //handleOpenForm
  const open = () => {
    setOpenForm(true);
  };

  //filter
  const [Filters, setFilter] = useState(0);
  const filtered = (e) => {
    setFilter(e);
  };
  //return
  return (
    <Box id="mainContainer" display={"block"} width={"100%"}>
      <Navbar
        search={handleSearch}
        open={open}
        isSigned={signed}
        logOut={logOut}
        ort={renderId}
        filter={filtered}
      />
      <Box display="inline-flex" width={"100%"}>
        <Filter
          handleCancel={handleCancel}
          handleDelete={handleDelete}
          handleEditSubmit={handleEditSubmit}
          list={list}
          handleEdit={handleEdit}
          search={search}
          ort={renderId}
          type="list"
          mFilter={Filters}
        />
        {openForm ? mainForm("mainForm") : null}
      </Box>

      {/* <Drawer
        anchor={"bottom"}
        open={state}
        onClose={() => setState(false)}
        onOpen={() => setState(true)}
        sx={{
          "& .MuiDrawer-paper": {
            borderRadius: "16px 16px 0 0",
          },
        }}
      ></Drawer> */}

      {/* <div id="buttonAddNotes">
        <React.Fragment key={"bottom"}>
          <Button
            className="buttonAddNotesPopup"
            onClick={() => setState(true)}
          >
            Add notes <AddIcon />
          </Button>

          <SwipeableDrawer
            anchor={"bottom"}
            open={state}
            onClose={() => setState(false)}
            onOpen={() => setState(true)}
            sx={{
              "& .MuiDrawer-paper": {
                borderRadius: "16px 16px 0 0",
              },
            }}
          >
            {renderId.small === true ? mainForm("popUp") : <></>}
          </SwipeableDrawer>
        </React.Fragment>
      </div> */}
    </Box>
  );
};
export default MainPage;
