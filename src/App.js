import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import MyCalendar from "./screens/MyCalendar";
import MyCourses from "./screens/MyCourses";
import MyEvents from "./screens/MyEvents";
import MyFriends from "./screens/MyFriends";
import MySchedules from "./screens/MySchedules";
import CompareSchedules from "./screens/CompareSchedules";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { fetchUser } from "./actions/";
import LandingPage from "./screens/LandingPage";
import MyProgress from "./screens/MyProgress";

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchUser());
  }, [isAuthenticated, dispatch]);

  return (
    <div>
      <Switch>
        <ProtectedRoute
          exact
          path="/dashboard"
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
        <ProtectedRoute
          exact
          path="/my-progress"
          component={MyProgress}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
        />
        <ProtectedRoute
          exact
          path="/compare"
          component={CompareSchedules}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/"
          component={isAuthenticated ? MyCalendar : LandingPage}
        />
      </Switch>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  };
}
export default connect(mapStateToProps)(App);
