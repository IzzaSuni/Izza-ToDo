import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, Slide } from "@mui/material";
import "../index.css";
export default function Snackbars({ message, type, opens, handleClose }) {
  console.log(type);

  function TransitionLeft(props) {
    return <Slide {...props} direction="right" />;
  }
  //return
  return (
    <Snackbar
      open={opens}
      // autoHideDuration={4000}
      onClose={handleClose}
      TransitionComponent={TransitionLeft}
      key={TransitionLeft.name}
    >
      <Alert
        severity={type}
        sx={{
          width: "30%",
          background: "#2B2B2B",
          color: "white !important",
        }}
        className={"shadows"}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
