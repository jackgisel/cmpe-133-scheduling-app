import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Select,
  FormControl,
  MenuItem,
  Box,
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

const Header = ({ handleThemeChange }) => {
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
          AllScheduler
        </Typography>
        <Box>
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedSchedule}
              onChange={(e) => {
                dispatch(setSchedule(e.target.value));
                setSelectedSchedule(e.target.value);
              }}
            >
              {userSchedules &&
                userSchedules.map((sched) => (
                  <MenuItem key={sched} value={sched} color="white">
                    {sched}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>

        <Button>
          <Link className={classes.headerButton} to="/my-calendar">
            Calendar
          </Link>
        </Button>
        <Button>
          <Link className={classes.headerButton} to="/my-progress">
            Progress
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
        {/* <Button onClick={handleThemeChange}>
          <Brightness2Icon color="action" />
        </Button> */}
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
