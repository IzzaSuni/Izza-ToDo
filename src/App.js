import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout";
import MainPage from "./components/MainPage";
import List from "./components/List";
import { Box } from "@mui/material";
import { useState } from "react";

function App({}) {
  const [item, setItem] = useState([]);
  const list = (theList) => {
    return setItem(theList);
  };
  return (
    <div className="App">
      <Layout>
        <MainPage item={list} />
      </Layout>
    </div>
  );
}

export default App;
