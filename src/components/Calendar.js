import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container, Paper, makeStyles } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { getDepartments } from "../actions/";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 30,
  },
}));

export default (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartments());
  }, []);

  return (
    <Container className={classes.container} component="schedule" maxWidth="md">
      <Paper>
        <FullCalendar
          defaultView="timeGridWeek"
          allDaySlot={false}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          editable={true}
          // eventDrop={this.handleEventDrop}
          // eventClick={this.handleEventClick}
          events={[
            { title: "event 1", date: "2020-04-14" },
            { title: "event 2", date: "2020-04-12" },
          ]}
          header={[
            {
              left: "prev,next today",
              center: "title",
              right: "month,agendaWeek,agendaDay,list",
            },
          ]}
        />
      </Paper>
    </Container>
  );
};
