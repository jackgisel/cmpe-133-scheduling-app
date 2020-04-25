import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container, Paper, makeStyles } from "@material-ui/core";


import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

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
}));

export default (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.container} component="schedule" maxWidth="md">
      <Paper>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel id='label'>Select Department</InputLabel>
          <Select labelId='label' id='select' value=''>
            <MenuItem value='10'>Ten</MenuItem>
            <MenuItem value='20'>Twenty</MenuItem>
          </Select>
        </FormControl>

        <br></br>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel id='label2'>Select Course</InputLabel>
          <Select labelId='label2' id='select' value=''>
            <MenuItem value='10'>Ten</MenuItem>
            <MenuItem value='20'>Twenty</MenuItem>
          </Select>
        </FormControl>

        <br></br>

        <FormControl fullWidth className={classes.formControl}>
          <InputLabel id='label3'>Select Section</InputLabel>
          <Select labelId='label3' id='select' value=''>
            <MenuItem value='10'>Ten</MenuItem>
            <MenuItem value='20'>Twenty</MenuItem>
          </Select>
        </FormControl>

        <Button
          type='button'
          fullWidth
          variant='contained'
          color='primary'
          //onClick={this.handleSubmit}
          className={classes.addcourse}
        >
          Add course to schedule
        </Button>


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
