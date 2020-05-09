import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./screens/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { fetchUser } from "./actions/";

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchUser());
  }, [isAuthenticated]);

  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={Home}
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
