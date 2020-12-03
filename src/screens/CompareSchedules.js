import React, { useState } from "react";
import Page from "../components/Page";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Box,
} from "@material-ui/core";
import "../components/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  formControl: {
    width: 300,
    margin: 15,
  },
}));

const CompareSchedules = ({ handleThemeChange }) => {
  const classes = useStyles();
  let userSchedules = useSelector((state) => state.auth.user.schedules);
  let [sched1, setSched1] = useState(userSchedules[0]);
  const events1 = useSelector((state) => state.auth.user.events).filter(
    (event) => event.schedule === sched1
  );
  let [sched2, setSched2] = useState(userSchedules[userSchedules.length - 1]);
  const events2 = useSelector((state) => state.auth.user.events).filter(
    (event) => event.schedule === sched2
  );

  return (
    <Page {...{ handleThemeChange }}>
      <Box display="flex">
        <Box flex={0.5} paddingX={1}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Select your Schedule
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sched1}
              onChange={(e) => {
                setSched1(e.target.value);
              }}
            >
              {userSchedules &&
                userSchedules.map((sched) => (
                  <MenuItem key={sched} value={sched}>
                    {sched}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FullCalendar
            defaultView="timeGridWeek"
            allDaySlot={false}
            hiddenDays={[0, 6]}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              bootstrapPlugin,
            ]}
            themeSystem="bootstrap"
            minTime={"06:00:00"}
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            events={events1}
          />
        </Box>
        <Box flex={0.5} paddingX={1}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Select your Schedule
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sched2}
              onChange={(e) => {
                setSched2(e.target.value);
              }}
            >
              {userSchedules &&
                userSchedules.map((sched) => (
                  <MenuItem key={sched} value={sched}>
                    {sched}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FullCalendar
            defaultView="timeGridWeek"
            allDaySlot={false}
            hiddenDays={[0, 6]}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              bootstrapPlugin,
            ]}
            themeSystem="bootstrap"
            minTime={"06:00:00"}
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            events={events2}
          />
        </Box>
      </Box>
    </Page>
  );
};

export default CompareSchedules;
