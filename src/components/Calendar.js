import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
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

import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

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

  const [selectedDepartment, setSelectedDepartment] = useState(undefined);
  const [selectedCourse, setSelectedCourse] = useState(undefined);
  const [selectedSection, setSelectedSection] = useState(undefined);

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
                      {section["Section"]} {section["Instructor Fname"]}.
                      {section["Instructor Lname"]}
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
