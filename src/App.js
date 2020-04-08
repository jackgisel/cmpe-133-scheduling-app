import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Schedule from './components/Calendar';

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <ProtectedRoute
        exact
        path='/'
        //component={Home}
        component={Schedule}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
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
