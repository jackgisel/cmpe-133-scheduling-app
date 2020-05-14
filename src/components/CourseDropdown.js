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

import {
  getDepartments,
  getCourses,
  getSections,
  addEvent,
  setErrors,
} from "../actions/";

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
  const events = useSelector((state) => state.auth.user.events);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedLab, setSelectedLab] = useState("");
  const [hasLab, setHasLab] = useState(false);

  function checkConflict(section) {
    let startString = section["Start Time"].toString().split("");
    let start =
      startString.length === 3
        ? "0" + startString[0] + ":" + startString[1] + startString[2]
        : startString[0] +
          startString[1] +
          ":" +
          startString[2] +
          startString[3];
    let time = start.split(":");
    let hours = parseInt(time[0]);
    let minutes = parseInt(time[1]);
    let total = hours * 60 + minutes;
    let err = true;
    events.forEach((event) => {
      let time_s = event["startTime"].split(":");
      let hours_s = parseInt(time_s[0]);
      let minutes_s = parseInt(time_s[1]);
      let total_s = hours_s * 60 + minutes_s;

      let time_e = event["endTime"].split(":");
      let hours_e = parseInt(time_e[0]);
      let minutes_e = parseInt(time_e[1]);
      let total_e = hours_e * 60 + minutes_e;

      if (total >= total_s && total <= total_e) {
        dispatch(setErrors("Can not add class, there is a time conflict"));
        err = false;
      }
    });
    return err;
  }

  function handleOnAddEvent() {
    let section = sections.filter((sec) => sec.id === selectedSection)[0];
    if (checkConflict(section)) dispatch(addEvent(section));
    if (selectedLab) {
      let lab = sections.filter((sec) => sec.id === selectedLab)[0];
      if (checkConflict(lab)) dispatch(addEvent(lab));
      setHasLab(false);
    }
    setSelectedDepartment("");
    setSelectedCourse("");
    setSelectedSection("");
    setSelectedLab("");
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
      let course = courses.filter(
        (course) => course.Course === selectedCourse
      )[0];
      if (course["hasLab"]) setHasLab(true);
      dispatch(getSections(selectedCourse));
    }
  }, [courses, selectedCourse, dispatch]);

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
          onChange={(event) => {
            setSelectedSection(event.target.value);
          }}
        >
          {sections?.map((section) => {
            if (section["Type"] !== "LAB" && section["Type"] !== "SEM") {
              return (
                <MenuItem key={section.id} value={section.id}>
                  Section {section["Section"]}, {section["Type"]}, Day & Time:{" "}
                  {section["Days"]} {section["Start Time"]}-
                  {section["End Time"]}, Instructor:{" "}
                  {section["Instructor Fname"]}.{section["Instructor Lname"]},
                  Seats Available:{" "}
                  {section["Total seats"] - section["Seats taken"]}
                </MenuItem>
              );
            }
          })}
        </Select>
      </FormControl>

      {hasLab && (
        <FormControl
          fullWidth
          className={classes.formControl}
          disabled={!hasLab}
        >
          <InputLabel id="label3">Select Lab Section</InputLabel>
          <Select
            labelId="label4"
            id="select"
            value={selectedLab}
            onChange={(event) => {
              setSelectedLab(event.target.value);
            }}
          >
            {sections?.map((section) => {
              if (section["Type"] === "LAB" || section["Type"] === "SEM") {
                return (
                  <MenuItem key={section.id} value={section.id}>
                    Section {section["Section"]}, {section["Type"]}, Day & Time:{" "}
                    {section["Days"]} {section["Start Time"]}-
                    {section["End Time"]}, Instructor:{" "}
                    {section["Instructor Fname"]}.{section["Instructor Lname"]},
                    Seats Available:{" "}
                    {section["Total seats"] - section["Seats taken"]}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </FormControl>
      )}

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
