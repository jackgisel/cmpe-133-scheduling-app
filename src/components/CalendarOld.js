/*import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const styles = () => ({
  '@global': {
    body: {
      backgroundColor: '#fff',
    },
  },
  paper: {
    marginTop: 10,
    display: 'flex',
    padding: 20,
    flexDirection: 'column',
    alignItems: 'Center',
  },
  formControl: {
    margin: 1,
    minWidth: 120,
  },
  addcourse: {
    marginTop: 20,
  },
});

class Schedule extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Container component='coursepicker' maxWidth='sm'>
          <Paper className={classes.paper}>
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
              className={classes.submit}
              onClick={this.handleSubmit}
              className={classes.addcourse}
            >
              Add course to schedule
            </Button>
          </Paper>
        </Container>

        <Container component='schedule' maxWidth='xl'>
          <Paper className={classes.paper}>
            <FullCalendar
              defaultView='timeGridWeek'
              allDaySlot={false}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              editable={true}
              eventDrop={this.handleEventDrop}
              eventClick={this.handleEventClick}
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
            <button onClick={this.handleLogout}>Logout</button>
          </Paper>
        </Container>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}
export default withStyles(styles)(connect(mapStateToProps)(Schedule));
*/