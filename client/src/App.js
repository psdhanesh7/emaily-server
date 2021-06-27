import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import SelectedMailHome from "./components/Home/SelectedMailHome/SelectedMailHome";
import Navigationbar from "./components/Navigationbar/Navigationbar";
import SelectedMailHistory from "./components/History/SelectedMailHistory/SelectedMailHistory";
import History from "./components/History/History";
import Home from "./components/Home/Home";
import Compose from "./components/Compose/Compose";
import Profile from "./components/Profile/Profile"
import { useState } from "react";
import Links from './components/Links/Links'

function App(props) {
  
  return (
    <div className="App">
        <Links/>
      {/* <Router>
        <Route 
          path='/'
          exact
          render={(props) => (
            <Login />
          )}
        />
        <Route 
          path='/home'
          render={(props) => (
            <Home {...props} token={localStorage.getItem('token')} />
          )}
        />
        <Route
          path='/history'
          render={(props)=>{
            <History {...props} token={localStorage.getItem('token')} />
          }}
        />
        <Route
          path='/compose'
          render={(props)=>{
            <Compose {...props} token={localStorage.getItem('token')} />
          }}
        />
      </Router> */}
    </div>
  );
}

export default App;
