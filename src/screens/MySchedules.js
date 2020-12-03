import React, { useState } from "react";
import Page from "../components/Page";
import {
  makeStyles,
  FormControl,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useSelector, useDispatch } from "react-redux";
import randomColor from "randomcolor";

import { addSchedule, removeSchedule } from "../actions/";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 1,
    minWidth: 120,
    display: "flex",
    flexDirection: "row",
  },
}));

const MySchedules = ({ handleThemeChange }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const schedules = useSelector((state) => state.auth.user.schedules);

  const [scheduleName, setScheduleName] = useState("");
  return (
    <Page {...{ handleThemeChange }}>
      <Box display="flex" flexDirection="row">
        <Box flex={0.5}>
          <Typography variant="h2">My Schedules</Typography>
          <List className={classes.root}>
            {(!schedules || schedules.length === 0) && (
              <p>Begin adding schedules to show here</p>
            )}
            {schedules &&
              schedules.map((e) => {
                return (
                  <ListItem
                    key={e}
                    style={{
                      backgroundColor: randomColor({
                        luminosity: "light",
                      }),
                      borderRadius: 5,
                      margin: 10,
                    }}
                  >
                    <ListItemText primary={`${e}`} />
                    {e !== "Default" && e !== "Finals" && (
                      <ListItemIcon>
                        <DeleteForeverIcon
                          onClick={() => dispatch(removeSchedule(e))}
                        />
                      </ListItemIcon>
                    )}
                  </ListItem>
                );
              })}
          </List>
        </Box>
        <Box
          flex={0.5}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h2">Create new schedule</Typography>
          <Box>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                style={{ width: 300 }}
                id="outlined-basic"
                label="Add a new schedule"
                variant="outlined"
                value={scheduleName}
                onChange={(e) => setScheduleName(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => {
                  setScheduleName("");
                  dispatch(addSchedule(scheduleName));
                }}
                className={classes.addcourse}
              >
                Add
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default MySchedules;
