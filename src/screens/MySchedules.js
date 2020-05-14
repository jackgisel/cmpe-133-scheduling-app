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
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import randomColor from "randomcolor";

import { addSchedule } from "../actions/";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 1,
    minWidth: 120,
    display: "flex",
    flexDirection: "row",
  },
}));

const MySchedules = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const schedules = useSelector((state) => state.auth.user.schedules);

  const [scheduleName, setScheduleName] = useState("");
  return (
    <Page>
      <div>
        <FormControl fullWidth className={classes.formControl}>
          <TextField
            style={{ flexGrow: 1 }}
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
                </ListItem>
              );
            })}
        </List>
      </div>
    </Page>
  );
};

export default MySchedules;
