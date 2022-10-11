import "./App.css";
import "./responsive.css";
import Layout from "./utils/Layout";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import MainPageLoged from "./pages/MainPageLoged";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";

function App({}) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/publicNote">
            <Layout>
              <MainPage />
            </Layout>
          </Route>
          <Route path={"/login"}>
            <Layout>
              <Login />
            </Layout>
          </Route>
          <Route path={"/signUp"}>
            <Layout>
              <CreateAccount />
            </Layout>
          </Route>
          <Route exact path={"/publicNote/Private"}>
            <Layout>
              <MainPageLoged />
            </Layout>
          </Route>
          <Route exact path={"/publicNote/Private/profile"}>
            <Layout>
              <Profile />
            </Layout>
          </Route>
          <Route exact path={"/publicNote/reset-password"}>
            <Layout>
              <ResetPassword />
            </Layout>
          </Route>
          <Route exact path={"/"}>
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
