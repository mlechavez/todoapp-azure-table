import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import TasksScreen from "./TasksScreen";
import MydayScreen from "./MydayScreen";
import ImportantScreen from "./ImportantScreen";
import HomeScreen from "./HomeScreen";
import ProtectedRoute from "./ProtectedRoute";

const RootScreen = () => {
  return (
    <Switch>
      <ProtectedRoute exact path="/my-day" component={MydayScreen} />
      <ProtectedRoute exact path="/important" component={ImportantScreen} />
      <ProtectedRoute exact path="/tasks" component={TasksScreen} />
      <Route exact path="/" component={HomeScreen} />
      <Redirect to="/" />
    </Switch>
  );
};

export default RootScreen;
