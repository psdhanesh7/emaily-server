import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import History from "../History/History";
import Compose from "../Compose/Compose";
import SelectedMailHistory from "../History/SelectedMailHistory/SelectedMailHistory";
import SelectedMailHome from "../Home/SelectedMailHome/SelectedMailHome";
import AlertSuccess from "../Compose/AlertSuccess/AlertSuccess";
import AlertFailure from "../Compose/AlertFailure/AlertFailure";
import Nav from "../Navigationbar/Navigationbar";
import Login from "../Login/Login"


export default function Links(props) {

  return (
    <Router>
      <Switch>
        <Route
            path="/"
            exact
            render={(props) => <Login/>}
        />
        <Route
          path="/home"
          render={(props) => <Home {...props} token={localStorage.getItem('token')} />}
        />
        <Route
          path="/history"
          render={(props) => <History {...props} token={localStorage.getItem('token')} />}
        />
        <Route
          path="/compose"
          exact
          render={(props) => <Compose {...props} token={localStorage.getItem('token')} />}
        />
        <Route
          path="/selectedmailhistory"
          render={(props) => <SelectedMailHistory {...props} token={localStorage.getItem('token')} />}
        />
        <Route
          path="/selectedmailhome"
          render={(props) => <SelectedMailHome {...props} token={localStorage.getItem('token')} />}
        />
        <Route
          path="/compose/alertsuccess"
          render={(props) => <AlertSuccess {...props} token={localStorage.getItem('token')} />}
        />
        <Route
          path="/compose/alertfailure"
          render={(props) => <AlertFailure {...props} token={localStorage.getItem('token')} />}
        />
      </Switch>
    </Router>
  );
}
