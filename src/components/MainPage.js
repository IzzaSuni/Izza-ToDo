import {
  Button,
  Collapse,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
//icons
import AddIcon from "@mui/icons-material/Add";
import * as service from "../services";
import { makeStyles } from "@mui/styles";
import { Box, padding } from "@mui/system";
import React, { useEffect, useState } from "react";
import ListNotes from "./List";
import moment from "moment";
import Input from "./Input";
import Ohayo from "./ohayo";

const useStyles = makeStyles({
  paperList: {
    height: "100%",
    width: "75%",
    flexWrap: "wrap",
    background: "#CEE5D0 !important",
    overflow: "auto",
  },

  container: {
    width: `calc(25% - 32px)`,
    display: "flex",
    flexDirection: "column",
    marginLeft: 16,
    borderRight: "1px #AC7088 dashed",
    height: "100vh",
    paddingRight: "16px",
    display: "flex",
    justifyContent: "center",
  },
  containerPopUp: {
    width: `calc(100% - 32px)`,
    display: "flex",
    flexDirection: "column",
    marginLeft: 16,
    marginRight: 16,
    padding: "16px 0",
    height: "50%",
  },
  form: {
    justifytitle: "space-between",
    width: ` 100% `,
    marginTop: "32px",
  },
});

const MainPage = () => {
  const [list, setList] = useState(initialValue);
  const [select, setSelect] = useState("Select a category");
  const [state, setState] = React.useState(false);
  const classes = useStyles();

  //getData from API
  useEffect(() => {
    service.GetNotes().then((e) => {
      e.forEach((ev) => {
        ev.isedit = false;
        ev.temp = "";
      });
      setList([...list, ...e]);
    });
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

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target[0];
    const desc = e.target[2];
    const cat = e.target[5];
    if (title.length === 0) return;
    const data = {
      title: title.value,
      isedit: false,
      temp: "",
      desc: desc.value,
      cat: cat.value,
      time: `${moment().format()}`,
    };
    setList([...list, data]);

    title.value = null;
    desc.value = null;
    document.getElementById("cat").innerHTML = "Select a category";
    document.getElementById("catLabel").innerHTML = "Category";
    service.CreateNote(data);
    setState(false);
  };

  //handleDelete
  const handleDelete = (index) => {
    const oldArr = list.slice();
    const data = oldArr[index].id;
    oldArr.splice(index, 1);
    if (data) service.DeleteNote(data);
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

  //   handleEditSubmit
  const handleEditSubmit = (event, index) => {
    event.preventDefault();
    const oldArr = list.slice();
    const data = oldArr[index];
    if (check(data) === false) {
      data.temp = "";
      data.edited = true;
      data.lastEdit = `${moment().format()}`;
      if (data.id) {
        delete data.isedit;
        delete data.temp;
        service.UpdateNote(data);
      }
    }
    data.isedit = false;
    return setList(oldArr);
  };

  //   handleCancel
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
  console.log(list);
  const mainForm = (id, style) => {
    return (
      <Box
        className={style === 1 ? classes.container : classes.containerPopUp}
        id={id}
      >
        <Typography textAlign={"center"} variant="h4" id="ohayoBig">
          {Ohayo()}
        </Typography>
        <Typography variant="h4" textAlign={"center"}>
          {style === 1 ? "My Notes" : "Create Note"}
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
    );
  };

  //render shadow footer and header
  const page = document.getElementById("listForm");
  page?.addEventListener("scroll", (e) => {
    const elm = document.getElementById("ohayoSmall");
    const elms = document.getElementById("buttonAddNotes");
    const b = page.scrollHeight - page.clientHeight;
    if (page.scrollTop >= 8) {
      elm.style = "box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.507)";
      elm.style.transition = "all 0.3s ease-in-out";
    } else {
      elm.style = "box-shadow:0";
      elm.style.transition = "all 0.3s ease-in-out";
    }
    if (page.scrollTop <= b - 16) {
      elms.style = "box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.507)";
      elms.style.transition = "all 0.3s ease-in-out";
    } else if (page.scrollTop >= b - 16) {
      elms.style = "box-shadow:0";
      elms.style.transition = "all 0.3s ease-in-out";
    }
  });

  //return
  return (
    <Box id="mainContainer">
      {mainForm("mainForm", 1)}
      <Box id="ohayoSmall">
        <Typography variant={"h6"}>My Notes</Typography>
        <Typography>{Ohayo()}</Typography>
      </Box>
      <Box className={classes.paperList} height="100%" id="listForm">
        <ListNotes
          handleDelete={handleDelete}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
          handleEditSubmit={handleEditSubmit}
          list={list}
        />
      </Box>
      <div id="buttonAddNotes">
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
          >
            {mainForm("popUp")}
          </SwipeableDrawer>
        </React.Fragment>
      </div>
    </Box>
  );
};
export default MainPage;

//dummy
const initialValue = [
  {
    title: "~Dummy-Pembelajaran",
    isedit: false,
    temp: "",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    cat: "ToDo",
    time: `${moment().subtract(3, "days").format()}`,
  },
  {
    title: "~Dummy-Business",
    isedit: false,
    temp: "",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    cat: "Money",
    time: `${moment().subtract(2, "days").format()}`,
  },
  {
    title: "~Dummy-Kuliah",
    isedit: false,
    temp: "",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    cat: "Reminder",
    time: `${moment().subtract(1, "days").format()}`,
  },
  {
    title: "~Dummy-People",
    isedit: false,
    temp: "",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset ",
    cat: "Work",
    time: `${moment().subtract(4, "days").format()}`,
  },
  {
    title: "~Dummy-Penyelesaian",
    isedit: false,
    temp: "",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset ",
    cat: "Works",
    time: `${moment().subtract(6, "days").format()}`,
  },
];
