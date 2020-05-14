import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { convertFrom24To12Format } from "../helpFunctions/helpers";
import { getCourseDetails, getSectionDetails } from "../actions";
import CourseSurvey from "./CourseSurvey";
import RateMyProfessor from "./RateMyProfessor";

const CourseModal = ({ isOpen, setIsOpen, section }) => {
  const dispatch = useDispatch();
  const courseDetails = useSelector((state) => state.classes.courseDetails);
  const sectionDetails = useSelector((state) => state.classes.sectionDetails);

  const coReqs = useSelector((state) => state.classes.courses);
  const friends = useSelector((state) => state.auth.user.friends);

  const [showSurvey, setShowSurvey] = useState(false);
  const [showRMP, setShowRMP] = useState(false);

  useEffect(() => {
    dispatch(getCourseDetails(section.Course));
    dispatch(getSectionDetails(section.Code));
  }, [dispatch, section.Code]);

  useEffect(() => {
    console.log(courseDetails);
    console.log(sectionDetails);
  }, [courseDetails, sectionDetails]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="form-dialog-title"
      maxWidth="lg"
    >
      <DialogTitle id="form-dialog-title">Course Details</DialogTitle>
      <DialogContent>
        <Box display="flex" p={0.5}>
          <Box mr={15}>
            <Box fontWeight="fontWeightBold" display="inline">
              Title:{" "}
            </Box>{" "}
            {section["Title"]} <br></br>
            <Box fontWeight="fontWeightBold" display="inline">
              Course Code:{" "}
            </Box>{" "}
            {section["Code"]} <br></br>
            <Box fontWeight="fontWeightBold" display="inline">
              Section:{" "}
            </Box>{" "}
            {section["Section"]} <br></br>
            <Box fontWeight="fontWeightBold" display="inline">
              Department:{" "}
            </Box>{" "}
            {section["Department"]} <br></br>
            <Box fontWeight="fontWeightBold" display="inline">
              Seats Available:{" "}
            </Box>{" "}
            {section["Total seats"] - section["Seats taken"]} <br></br>
            <Box fontWeight="fontWeightBold" display="inline">
              Type:{" "}
            </Box>{" "}
            {section["Type"]} <br></br>
            <Box fontWeight="fontWeightBold" display="inline">
              Instructor:{" "}
            </Box>{" "}
            {section["Instructor Fname"]}. {section["Instructor Lname"]}{" "}
            <br></br>
            <Box fontWeight="fontWeightBold" display="inline">
              Institution:{" "}
            </Box>{" "}
            {section["Institution"]} <br></br>
            <Box fontWeight="fontWeightBold" display="inline">
              Credits:{" "}
            </Box>{" "}
            {section["Units"]} <br></br>
            <Box fontWeight="fontWeightBold" display="inline">
              Average Cost:{" "}
            </Box>{" "}
            {courseDetails.averageCost
              ? `$${courseDetails.averageCost}`
              : "Not available right now"}{" "}
            <br></br>
          </Box>
          <Box p={0.5}>
            <Box fontWeight="fontWeightBold">Days, Time, Location: </Box>{" "}
            {section["Days"]}
            {convertFrom24To12Format(section["Start Time"])} -{" "}
            {convertFrom24To12Format(section["End Time"])} -{" "}
            {section["Location"]} <br></br>
            <Box display="inline">Dates: </Box> {section["Start Date"]} -{" "}
            {section["End Date"]} <br></br>
            <Box fontWeight="fontWeightBold" display="inline">
              Prerequisites:{" "}
            </Box>{" "}
            {courseDetails["Prerequisites"]
              ? courseDetails["Prerequisites"]
              : "No data/prerequisites required for this course"}{" "}
            <br></br>
            <Box fontWeight="fontWeightBold" display="inline">
              Corequisites:{" "}
            </Box>{" "}
            {console.log(coReqs)}
            {courseDetails["Corequisites"]
              ? courseDetails["Corequisites"]
              : "No data/Corequisites required for this course"}{" "}
            <br></br>
            <Box fontWeight="fontWeightBold" display="inline">
              Friends:{" "}
            </Box>{" "}
            {sectionDetails &&
              sectionDetails.students &&
              sectionDetails.students
                .filter((student) => friends.includes(student))
                .map((student) => student)}
            <br></br>
            <Box ml={-0.5}>
              <Button
                size="small"
                color="primary"
                onClick={() => setShowRMP(true)}
              >
                View RateMyProfessor Info
              </Button>
              <br></br>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          color="primary"
          onClick={() => setShowSurvey(true)}
        >
          Taken this course? Fill out a quick survey for us!
        </Button>
        <Button size="small" onClick={() => setIsOpen(false)} color="primary">
          Close
        </Button>
      </DialogActions>

      {showSurvey && (
        <CourseSurvey
          code={section.Code}
          isOpen={showSurvey}
          setIsOpen={() => setShowSurvey(false)}
        />
      )}
      {showRMP && (
        <RateMyProfessor
          lastName={section["Instructor Lname"]}
          showRMP
          hideRMP={() => setShowRMP(false)}
        />
      )}
    </Dialog>
  );
};

export default CourseModal;
