import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Athentication } from ".";
import { LoginPage } from "../Pages/Login";
import { StartPage } from "../Pages/Start";

export const AppRouter: FC = () => {
  return (
    <Router>
      <Switch>
        <Athentication exact path="/">
          <StartPage />
        </Athentication>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
