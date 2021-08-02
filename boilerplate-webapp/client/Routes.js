import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from "./components/Home.js";
import Login from './components/Login.js';
import Signup from "./components/Signup.js";

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/home" >
        <Redirect to="/" />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route eact path="/signup">
        <Signup />
      </Route>
    </Switch>
  )
}

export default Routes;
