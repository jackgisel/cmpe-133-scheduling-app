import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import {
  Container,
  Paper,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Box,
  Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
//import randomHexColor from "random-hex-color";
import randomColor from "randomcolor";

import { useDispatch, useSelector } from "react-redux";
import { getDepartments, getCourses, getSections, searchbyID } from "../actions/";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
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
  fab: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
}));

export default (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.classes.departments);
  const courses = useSelector((state) => state.classes.courses);
  const sections = useSelector((state) => state.classes.sections);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [currency, setCurrency] = useState("");
  const [amtDisabled, setamtDisabled] = useState(true);
  const [submit_bool, setsubmit_bool] = useState(true);
  const [yesSelected, setyesSelected] = useState("outlined");
  const [noSelected, setnoSelected] = useState("outlined");

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [section, setSection] = useState("");
  const [events, setEvents] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleButton = (e) => {
    setamtDisabled(false);
    setsubmit_bool(false);

    setyesSelected("contained");
    setnoSelected("outlined");
  };

  const handleButton2 = (e) => {
    setamtDisabled(true);
    setsubmit_bool(false);

    setnoSelected("contained");
    setyesSelected("outlined");
  };

  const handleEventClick = (e) => {
    setSelectedEvent(e.event.title);
    setSection(sections[0]);
    setOpen2(true);
    console.log(section["Title"] + ", " + section["Department"]);
  };

  const handleSubmit = (e) => {
    console.log(section["Title"] + ", " + section["Department"]);
    console.log("Cost: " + currency);
    //dispatch to database
    setOpen(false);
  }

  function convertFrom24To12Format(time24) {
    let startString = "" + time24;
    try{
      startString = startString.split("");
      let start =
      startString.length === 3
        ? "0" + startString[0] + ":" + startString[1] + startString[2]
        : startString[0] +
          startString[1] +
          ":" +
          startString[2] +
          startString[3];

      const [sHours, minutes] = start.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
      const period = +sHours < 12 ? 'AM' : 'PM';
      const hours = +sHours % 12 || 12;
    
      return `${hours}:${minutes} ${period}`;
    }
    catch{
      startString = "";
      return null;
    }
  }

  function handleCustomEvent() {
    setOpen3(true);
  }

  function handleOnAddEvent() {
    let section = sections.filter((sec) => sec.id === selectedSection)[0];
    let startString = section["Start Time"].toString().split("");
    let start =
      startString.length === 3
        ? "0" + startString[0] + ":" + startString[1] + startString[2]
        : startString[0] +
          startString[1] +
          ":" +
          startString[2] +
          startString[3];

    let endString = section["End Time"].toString().split("");
    let end =
      endString.length === 3
        ? "0" + endString[0] + ":" + endString[1] + endString[2]
        : endString[0] + endString[1] + ":" + endString[2] + endString[3];

    let startRecurString = section["Start Date"].toString().split("/");
    let startRecS = "20" + startRecurString[2] + "-" + startRecurString[0] + "-" + startRecurString[1];

    let endRecurString = section["End Date"].toString().split("/");
    let endRecS = "20" + endRecurString[2] + "-" + endRecurString[0] + "-" + endRecurString[1];

    let newEvent = {
      ...section,
      title: section.id,
      daysOfWeek: JSON.parse(section["Daysofweek"]),
      startTime: start,
      endTime: end,
      startRecur: startRecS,
      endRecur: endRecS,
      id: section.Code,
      backgroundColor: randomColor({
        luminosity: 'light',
      }),
    };

    setEvents([...events, newEvent]);
    setSelectedDepartment("");
    setSelectedCourse("");
    setSelectedSection("");
  }

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

  useEffect(() => {
    if (selectedEvent) {
       dispatch(searchbyID(selectedEvent));
    }
  }, [selectedEvent]);

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <div>
    <Fab color="primary" aria-label="add" className={classes.fab} variant="extended" onClick={handleCustomEvent}>
    <AddIcon /> Add a custom event
    </Fab>
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
                  <MenuItem value={department.id} key={department.id}>
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
                  <MenuItem key={course.id} value={course.id}>
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
                onChange={(event) => {setSelectedSection(event.target.value); console.log(event.target.value);}}
              >
                {sections?.map((section) => {
                  return (
                    <MenuItem key={section.id} value={section.id}>
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
              onClick={handleOnAddEvent}
              className={classes.addcourse}
            >
              Add course to schedule
            </Button>
          
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
        </div>
        

        <FullCalendar
          defaultView="timeGridWeek"
          allDaySlot={false}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            bootstrapPlugin,
          ]}
          eventClick={handleEventClick}
          themeSystem="bootstrap"
          minTime={"06:00:00"}
          header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          events={events}
        />
        
        <Dialog
          open={open2}
          onClose={handleClose2}
          aria-labelledby="form-dialog-title"
          fullscreen
          maxWidth="lg"
        >
          <DialogTitle id="form-dialog-title">Course Details</DialogTitle>
          <DialogContent>
            <Box display="flex" p={0.5}>
              <Box>
                <Box fontWeight="fontWeightBold" display="inline">Title: </Box> {section["Title"]} <br></br>
                <Box fontWeight="fontWeightBold" display="inline">Course Code: </Box> {section["Code"]} <br></br>
                <Box fontWeight="fontWeightBold" display="inline">Section: </Box> {section["Section"]} <br></br>
                <Box fontWeight="fontWeightBold" display="inline">Department: </Box> {section["Department"]} <br></br>
                <Box fontWeight="fontWeightBold" display="inline">Seats Available: </Box> {section["Total seats"] - section["Seats taken"]} <br></br>
                <Box fontWeight="fontWeightBold" display="inline">Type: </Box> {section["Type"]} <br></br>
                <Box fontWeight="fontWeightBold" display="inline">Instructor: </Box> {section["Instructor Fname"]}. {section["Instructor Lname"]} <br></br>
                <Box fontWeight="fontWeightBold" display="inline">Institution: </Box> {section["Institution"]} <br></br>
                <Box fontWeight="fontWeightBold" display="inline">Credits: </Box> {section["Units"]} <br></br>
              </Box>
              <Box p={0.5}>
                <Box fontWeight="fontWeightBold">Days, Time, Location: </Box> {section["Days"]} {convertFrom24To12Format(section["Start Time"])} - 
                {convertFrom24To12Format(section["End Time"])} - {section["Location"]} <br></br>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
          <Button size="small" color="primary" onClick={handleOpen}>
            Taken this course? Fill out a quick survey for us!
          </Button>
          <Button size="small" onClick={handleClose2} color="primary">
            Close
          </Button>
        </DialogActions>
        </Dialog>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Course Survey</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did this course require addition textbook/material costs?
            </DialogContentText>
            <ButtonGroup>
              <Button
                classname={classes.button}
                value="true"
                variant={yesSelected}
                color="primary"
                onClick={handleButton}
              >
                Yes
              </Button>
              <Button
                classname={classes.button}
                value="false"
                variant={noSelected}
                color="primary"
                onClick={handleButton2}
              >
                No
              </Button>
            </ButtonGroup>
            <DialogContentText>
              Provide an estimated cost of materials below:
            </DialogContentText>
            <CurrencyTextField
              label="Amount"
              variant="standard"
              value={currency}
              currencySymbol="$"
              outputFormat="number"
              disabled={amtDisabled}
              onChange={(e, currency) => setCurrency(currency)}
              defaultValue="0.00"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={submit_bool}
              value={currency}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>


        <Dialog
          open={open3}
          onClose={handleClose3}
          aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Create Calendar Event</DialogTitle>
          <DialogContent>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose3} color="primary">
            Cancel
          </Button>
          <Button
            //onClick={handleSubmit}
            color="primary"
            //disabled={submit_bool}
            //value={currency}
          >
            Submit
          </Button>
        </DialogActions>
        </Dialog>
      </Paper>
    </Container>
    </div>
  );
};
