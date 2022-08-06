import "./App.css";
import Layout from "./components/Layout";
import MainPage from "./components/MainPage";
import { BrowserRouter as Router, Switch, Route  } from "react-router-dom";

function App({}) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/Izza-Todo">
            <Layout>
              <MainPage />
            </Layout>
          </Route>
          <Route path="*">
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
