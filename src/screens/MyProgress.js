import React from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import randomColor from "randomcolor";

import Page from "../components/Page";
import {
  addCourses,
  getCourses,
  getDepartments,
  removeCourse,
  updateCourse,
} from "../actions/";

const MyProgress = () => {
  const dispatch = useDispatch();

  const [addCourseModal, setCourseModal] = React.useState(false);
  const [selectedDepartment, setSelectedDepartment] = React.useState("");
  const [selectedCourse, setSelectedCourse] = React.useState("");

  const [coursesToAdd, setCoursesToAdd] = React.useState([]);

  const departments = useSelector((state) => state.classes.departments);
  const courses = useSelector((state) => state.classes.courses);
  const studentsCourse = useSelector((state) => state.auth.user.courses);

  React.useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  React.useEffect(() => {
    if (selectedDepartment) {
      dispatch(getCourses(selectedDepartment));
    }
  }, [selectedDepartment, dispatch]);

  const handleSubmit = () => {
    dispatch(addCourses(coursesToAdd));
    setCoursesToAdd([]);
    setCourseModal(false);
    setSelectedCourse("");
    setSelectedDepartment("");
  };

  return (
    <Page>
      <Dialog
        open={addCourseModal}
        onClose={() => setCourseModal(false)}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        <Box
          width={800}
          height={600}
          display="flex"
          flexDirection="column"
          padding={3}
        >
          <Typography variant="h5">
            Add courses from your roadmap or req chart
          </Typography>
          <Box>
            <FormControl fullWidth disabled={departments.length <= 0}>
              <InputLabel id="label">Select Department</InputLabel>
              <Select
                labelId="label"
                id="select"
                value={selectedDepartment}
                onChange={(event) => {
                  setSelectedDepartment(event.target.value);
                  setSelectedCourse("");
                }}
              >
                {departments?.map((department) => (
                  <MenuItem value={department.id} key={department.id}>
                    {department["Department Name"]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth disabled={courses.length <= 0}>
              <InputLabel id="label2">Select Course</InputLabel>
              <Select
                labelId="label2"
                id="select"
                value={selectedCourse}
                onChange={(event) => {
                  setSelectedCourse(event.target.value);
                }}
              >
                {courses?.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course["Course"]} -- {course["Title"]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box flex={1} marginY={4}>
            <Typography variant="h6">Courses to add</Typography>
            {coursesToAdd.map(({ id, Title }) => {
              return (
                <Box
                  key={id}
                  bgcolor="primary.main"
                  borderRadius={3}
                  paddingX={2}
                  paddingY={1}
                  display="inline-block"
                  marginX={1}
                >
                  <Typography variant="body2" style={{ color: "white" }}>
                    {Title}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              disabled={!selectedCourse}
              onClick={() => {
                if (selectedCourse) {
                  setCoursesToAdd([
                    ...coursesToAdd,
                    {
                      ...courses.find((course) => course.id === selectedCourse),
                      haveTaken: false,
                      backgroundColor: randomColor({ luminosity: "light" }),
                    },
                  ]);
                  setSelectedCourse("");
                  setSelectedDepartment("");
                }
              }}
            >
              Add
            </Button>{" "}
            <Box padding={1} />
            <Button onClick={handleSubmit} variant="outlined">
              Done adding
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h2">My Progress</Typography>
          <Button variant="outlined" onClick={() => setCourseModal(true)}>
            Add more courses
          </Button>
        </Box>
        <Box display="flex">
          <Box marginY={2} flex={0.5} paddingX={2}>
            <Typography variant="h4">Upcoming courses</Typography>
            {studentsCourse
              .filter((course) => !course.haveTaken)
              .map((course) => (
                <Box
                  key={course.id}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginY={2}
                  paddingX={2}
                  paddingY={1}
                  borderRadius={5}
                  style={{
                    backgroundColor: course.backgroundColor,
                  }}
                >
                  <Box flex={1}>
                    <Typography>{course.id}</Typography>
                  </Box>
                  <Button onClick={() => dispatch(removeCourse(course.id))}>
                    <DeleteForeverIcon />
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => dispatch(updateCourse(course.id, true))}
                  >
                    Mark as complete
                  </Button>
                </Box>
              ))}
          </Box>
          <Box marginY={2} flex={0.5} paddingX={2}>
            <Typography variant="h4">Completed Courses</Typography>
            {studentsCourse
              .filter((course) => course.haveTaken)
              .map((course) => (
                <Box
                  key={course.id}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginY={2}
                  paddingX={2}
                  paddingY={1}
                  borderRadius={5}
                  style={{
                    backgroundColor: course.backgroundColor,
                  }}
                >
                  <Box flex={1}>
                    <Typography>{course.id}</Typography>
                  </Box>
                  <Button onClick={() => dispatch(removeCourse(course.id))}>
                    <DeleteForeverIcon />
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => dispatch(updateCourse(course.id, false))}
                  >
                    Mark as incomplete
                  </Button>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default MyProgress;
