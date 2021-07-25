import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from "./Index.js";

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/">
        <Index />
      </Route>
    </Switch>
  )
}

export default Routes;
