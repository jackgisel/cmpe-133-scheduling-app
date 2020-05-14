import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch, useSelector } from "react-redux";
import { logoutUser, setSchedule } from "../actions";
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
  formControl: {
    flexGrow: 2,
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userSchedule = useSelector((state) => state.auth.user.schedule);
  const userSchedules = useSelector((state) => state.auth.user.schedules);
  const [selectedSchedule, setSelectedSchedule] = useState("");

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (userSchedule) setSelectedSchedule(userSchedule);
  }, [userSchedule]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          All Schedule
        </Typography>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          style={{ color: "white" }}
        >
          <InputLabel id="demo-simple-select-label">
            Select your Schedule
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedSchedule}
            onChange={(e) => {
              dispatch(setSchedule(e.target.value));
              setSelectedSchedule(e.target.value);
            }}
            style={{ color: "white" }}
          >
            {userSchedules &&
              userSchedules.map((sched) => (
                <MenuItem key={sched} value={sched}>
                  {sched}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

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
        <Button>
          <Link className={classes.headerButton} to="/my-schedules">
            Schedules
          </Link>
        </Button>
        <Button>
          <Link className={classes.headerButton} to="/compare">
            Compare
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
