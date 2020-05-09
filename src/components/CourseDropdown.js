import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  makeStyles,
} from "@material-ui/core";
import randomHexColor from "random-hex-color";

import { getDepartments, getCourses, getSections, addEvent } from "../actions/";

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

const CourseDropdown = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const departments = useSelector((state) => state.classes.departments);
  const courses = useSelector((state) => state.classes.courses);
  const sections = useSelector((state) => state.classes.sections);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

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

    let newEvent = {
      ...section,
      title: section.id,
      daysOfWeek: JSON.parse(section["Daysofweek"]),
      startTime: start,
      endTime: end,
      backgroundColor: randomHexColor(),
    };

    dispatch(addEvent(newEvent));
    setSelectedDepartment("");
    setSelectedCourse("");
    setSelectedSection("");
  }

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (selectedDepartment) {
      dispatch(getCourses(selectedDepartment));
    }
  }, [selectedDepartment, dispatch]);

  useEffect(() => {
    if (selectedCourse) {
      dispatch(getSections(selectedCourse));
    }
  }, [selectedCourse, dispatch]);

  return (
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
            setSelectedCourse("");
            setSelectedSection("");
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
            setSelectedSection("");
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
          onChange={(event) => setSelectedSection(event.target.value)}
        >
          {sections?.map((section) => {
            return (
              <MenuItem key={section.id} value={section.id}>
                {section["Section"]} {section["Instructor Fname"]}.
                {section["Instructor Lname"]} {section["Start Time"]}-
                {section["End Time"]}
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
    </div>
  );
};

export default CourseDropdown;
