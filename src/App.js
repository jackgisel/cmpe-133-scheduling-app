import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./screens/Home";
import MyCalendar from "./screens/MyCalendar";
import MyCourses from "./screens/MyCourses";
import MyEvents from "./screens/MyEvents";
import MyFriends from "./screens/MyFriends";
import MySchedules from "./screens/MySchedules";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { fetchUser } from "./actions/";

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchUser());
  }, [isAuthenticated, dispatch]);

  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={MyCalendar}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/my-calendar"
        component={MyCalendar}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/my-courses"
        component={MyCourses}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/my-events"
        component={MyEvents}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/my-friends"
        component={MyFriends}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/my-schedules"
        component={MySchedules}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  };
}
export default connect(mapStateToProps)(App);
