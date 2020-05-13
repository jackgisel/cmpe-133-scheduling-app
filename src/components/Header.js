import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  headerButton: {
    color: "white",
    "&:hover": {
      color: "yellow",
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { dispatch } = props;

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          All Schedule
        </Typography>
        <Button>
          <Link className={classes.headerButton} to="/my-calendar">
            Calendar
          </Link>
        </Button>
        <Button>
          <Link className={classes.headerButton} to="/my-courses">
            Courses
          </Link>
        </Button>
        <Button>
          <Link className={classes.headerButton} to="/my-events">
            Events
          </Link>
        </Button>
        <Button>
          <Link className={classes.headerButton} to="/my-friends">
            Friends
          </Link>
        </Button>
        <Button onClick={handleLogout} color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}
export default connect(mapStateToProps)(Header);
