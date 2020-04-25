import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 30,
  },
}));

export default (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.container} component='schedule' maxWidth='md'>
      <Paper>
        <FullCalendar
          defaultView='timeGridWeek'
          allDaySlot={false}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          editable={true}
          minTime='7'
          // eventDrop={this.handleEventDrop}
          // eventClick={this.handleEventClick}
          events={[
            { title: 'event 1', date: '2020-04-14' },
            { title: 'event 2', date: '2020-04-12' },
          ]}
          header={[
            {
              left: 'prev,next today',
              center: 'title',
              right: 'month,agendaWeek,agendaDay,list',
            },
          ]}
        />
      </Paper>
    </Container>
  );
};
