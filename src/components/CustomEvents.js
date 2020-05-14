import React, { useState } from "react";
import {
  Button,
  makeStyles,
  Box,
  TextField,
  ButtonGroup,
  FormGroup,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import randomHexColor from "random-hex-color";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, removeEvent } from "../actions/";
import { format } from "date-fns";

import { convertFrom24To12Format } from "../helpFunctions/helpers";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 30,
  },
  formControl: {
    margin: 1,
    minWidth: 120,
  },
  addcourse: {
    marginTop: 20,
  },
  padded: {
    padding: 20,
  },
  fab: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
  content: {
    marginBottom: -50,
  },
}));

const CustomEvents = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let selectedSchedule = useSelector((state) => state.auth.user.schedule);
  let events = useSelector((state) => state.auth.user.events)
    .filter((e) => e.isManual)
    .filter((event) => event.schedule === selectedSchedule);
  const [selectedSDate, setSelectedSDate] = useState(new Date());
  const [selectedEDate, setSelectedEDate] = useState(new Date());
  const [IsRecurring, setIsRecurring] = useState(true);
  const [yesSelected, setyesSelected] = useState("contained");
  const [noSelected, setnoSelected] = useState("outlined");
  const [title, setTitle] = useState("");
  const [DOW, setDOW] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
  });
  const { Monday, Tuesday, Wednesday, Thursday, Friday } = DOW;

  const clear = () => {
    setDOW({
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
    });
    setSelectedSDate(new Date());
    setSelectedEDate(new Date());
  };

  const handleDateChange = (date) => {
    setSelectedSDate(date);
    setSelectedEDate(date);
  };

  const handleDateChange2 = (date) => {
    setSelectedEDate(date);
  };

  const handleButton3 = (e) => {
    setIsRecurring(true);

    setyesSelected("contained");
    setnoSelected("outlined");
  };

  const handleSubmit2 = (e) => {
    let daysArray = [];

    for (let i = 1; i < 7; i++) {
      if (DOW[Object.keys(DOW)[i]]) daysArray.push(i);
    }

    let newEvent = {
      isManual: true,
      startTime: format(selectedSDate, "kk:mm"),
      endTime: format(selectedEDate, "kk:mm"),
      "Start time": Number(format(selectedSDate, "kkmm")),
      "End time": Number(format(selectedEDate, "kkmm")),
      daysOfWeek: JSON.stringify(daysArray),
      IsRecurring,
      title,
      Title: title,
      backgroundColor: randomHexColor(),
      courseCode: Math.round(Math.random() * 100),
      Code: Math.round(Math.random() * 100),
    };
    dispatch(addEvent(newEvent));
    clear();
  };

  const handleButton4 = (e) => {
    setIsRecurring(false);

    setnoSelected("contained");
    setyesSelected("outlined");
  };

  const handleChecked = (event) => {
    setDOW({ ...DOW, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <List className={classes.root}>
        {events.length === 0 && <p>Begin adding custom events to show here</p>}
        {events &&
          events.map((e) => {
            return (
              <ListItem
                key={e.title}
                style={{
                  backgroundColor: e.backgroundColor,
                  borderRadius: 5,
                  margin: 10,
                }}
              >
                <ListItemText
                  primary={`${e.title}`}
                  secondary={`${e["Start time"]}-${e["End time"]}`}
                />
                <Button onClick={() => dispatch(removeEvent(e.Code))}>
                  Remove Class
                </Button>
              </ListItem>
            );
          })}
      </List>
      <h2 style={{ padding: 25 }} className={classes.content}>
        Create Calendar Event
      </h2>
      <form className={classes.container} noValidate>
        <TextField
          id="standard-basic"
          label="Enter the title of the event"
          helperText="Maximum Character Length: 20"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ minWidth: 600 }}
        />
        <Box flexDirection="column" mt={2}>
          Is this event recurring?
          <br></br>
        </Box>
        <Box flexDirection="column" mt={2}>
          <ButtonGroup>
            <Button
              className={classes.button}
              value="true"
              variant={yesSelected}
              color="primary"
              onClick={handleButton3}
            >
              Yes
            </Button>
            <Button
              className={classes.button}
              value="false"
              variant={noSelected}
              color="primary"
              onClick={handleButton4}
            >
              No
            </Button>
          </ButtonGroup>
        </Box>
        <br></br>

        <FormGroup aria-label="position" row>
          <FormControlLabel
            control={
              <Checkbox
                checked={Monday}
                name="Monday"
                onChange={handleChecked}
                disabled={!IsRecurring}
              />
            }
            label="Monday"
            labelPlacement="top"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Tuesday}
                name="Tuesday"
                onChange={handleChecked}
                disabled={!IsRecurring}
              />
            }
            label="Tuesday"
            labelPlacement="top"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Wednesday}
                name="Wednesday"
                onChange={handleChecked}
                disabled={!IsRecurring}
              />
            }
            label="Wednesday"
            labelPlacement="top"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Thursday}
                name="Thursday"
                onChange={handleChecked}
                disabled={!IsRecurring}
              />
            }
            label="Thursday"
            labelPlacement="top"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Friday}
                name="Friday"
                onChange={handleChecked}
                disabled={!IsRecurring}
              />
            }
            label="Friday"
            labelPlacement="top"
          />
        </FormGroup>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Pick a date below: "
            format="MM/dd/yyyy"
            value={selectedSDate}
            disabled={IsRecurring}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <br></br>

          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Pick a start time: "
            value={selectedSDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
          <br></br>

          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Pick an end time: "
            value={selectedEDate}
            onChange={handleDateChange2}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </MuiPickersUtilsProvider>
      </form>
      <Button onClick={handleSubmit2} color="primary">
        Submit
      </Button>
    </div>
  );
};

export default CustomEvents;
