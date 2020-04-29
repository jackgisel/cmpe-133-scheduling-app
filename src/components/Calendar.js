import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from '@fullcalendar/bootstrap';
import {
  Container,
  Paper,
  makeStyles,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { getDepartments, getCourses, getSections } from "../actions/";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import "./bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

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
}));

export default (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.classes.departments);
  const courses = useSelector((state) => state.classes.courses);
  const sections = useSelector((state) => state.classes.sections);

  const [open, setOpen] = React.useState(false);
  const [amtDisabled, setamtDisabled] = React.useState(true);
  const [submit_bool, setsubmit_bool] = React.useState(true);
  const [yesSelected, setyesSelected] = React.useState("outlined");
  const [noSelected, setnoSelected] = React.useState("outlined");

  const [selectedDepartment, setSelectedDepartment] = useState(undefined);
  const [selectedCourse, setSelectedCourse] = useState(undefined);
  const [selectedSection, setSelectedSection] = useState(undefined);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleButton = e => {
    setamtDisabled(false);
    setsubmit_bool(false);
    console.log(noSelected);
      setyesSelected("contained");
      setnoSelected("outlined");
  };

  const handleButton2 = e => {
    setamtDisabled(true);
    setsubmit_bool(false);
    console.log(yesSelected);
      setnoSelected("contained");
      setyesSelected("outlined");
  };

  useEffect(() => {
    dispatch(getDepartments());
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      dispatch(getCourses(selectedDepartment));
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedCourse) {
      dispatch(getSections(selectedCourse));
    }
  }, [selectedCourse]);

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <Container className={classes.container} component="schedule" maxWidth="md">
      <Paper>
        <div>
          <div className={classes.padded}>
            <FormControl
              fullWidth
              className={classes.formControl}
              disabled={departments.length <= 0}
            >
              <InputLabel id="label">Select Department</InputLabel>
              <Select
                labelId="label"
                id="select"
                value={selectedDepartment}
                onChange={(event) => {
                  setSelectedDepartment(event.target.value);
                  setSelectedCourse(undefined);
                  setSelectedSection(undefined);
                }}
              >
                {departments?.map((department) => (
                  <MenuItem value={department.id}>
                    {department["Department Name"]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <br></br>
            <FormControl
              fullWidth
              className={classes.formControl}
              disabled={courses.length <= 0}
            >
              <InputLabel id="label2">Select Course</InputLabel>
              <Select
                labelId="label2"
                id="select"
                value={selectedCourse}
                onChange={(event) => {
                  setSelectedCourse(event.target.value);
                  setSelectedSection(undefined);
                }}
              >
                {courses?.map((course) => (
                  <MenuItem value={course.id}>
                    {course["Course"]} {course["Title"]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <br></br>

            <FormControl
              fullWidth
              className={classes.formControl}
              disabled={sections.length <= 0}
            >
              <InputLabel id="label3">Select Section</InputLabel>
              <Select
                labelId="label3"
                id="select"
                value={selectedSection}
                onChange={(event) => setSelectedSection(event.target.value)}
              >
                {sections?.map((section) => {
                  console.log(section);
                  return (
                    <MenuItem value={section.id}>
                      Section {section["Section"]}, {section["Type"]}, Day & Time: {section["Days"]} {section["Start Time"]}-{section["End Time"]}, Instructor: {section["Instructor Fname"]}.
                      {section["Instructor Lname"]}, Seats Available: {section["Total seats"] - section["Seats taken"]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              //onClick={this.handleSubmit}
              className={classes.addcourse}
            >
              Add course to schedule
            </Button>
          </div>
          <div>
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem button>
                <ListItemText primary="Trash" />
              </ListItem>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
            </List>
          </div>
        </div>

        <FullCalendar
          defaultView="timeGridWeek"
          allDaySlot={false}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin]}
          editable={true}
          minTime={"06:00:00"}
          themeSystem="bootstrap"
          // eventDrop={this.handleEventDrop}
          // eventClick={this.handleEventClick}
          header={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }}
          events={[
            { title: "event 1", start: '2020-04-28T10:30:00', end: '2020-04-28T11:30:00', backgroundColor: '#cc99ff' },
            { title: "event 2", start: '2020-04-29T19:30:00', end: '2020-04-29T20:30:00', backgroundColor: '#cc99ff' },
          ]}
        />


        
        
        <Button variant="outlined" color="primary" onClick={handleOpen}>
          Taken this course? Fill out a quick survey for us!
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Course Survey</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did this course require addition textbook/material costs?
            </DialogContentText>
            <ButtonGroup>
            <Button classname={classes.button} value = 'true' variant={yesSelected} color="primary" onClick={handleButton} >
              Yes
            </Button>
            <Button classname={classes.button} value = 'false' variant={noSelected} color="primary" onClick={handleButton2} >
              No
            </Button>
            </ButtonGroup>
            <DialogContentText>
              Provide an estimated cost of materials below:
            </DialogContentText>
            <CurrencyTextField
              label="Amount"
              variant="standard"
              currencySymbol="$"
              outputFormat="number"
              disabled={amtDisabled}
              defaultValue='0.00'
              fullWidth
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary" disabled = {submit_bool}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};
