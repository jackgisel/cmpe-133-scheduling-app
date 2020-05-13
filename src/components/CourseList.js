import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { removeEvent } from "../actions/";
import CourseModal from "./CourseModal";
import { convertFrom24To12Format } from "../helpFunctions/helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: theme.palette.background.paper,
  },
}));

const CourseList = () => {
  const classes = useStyles();
  let selectedSchedule = useSelector((state) => state.auth.user.schedule);
  let events = useSelector((state) => state.auth.user.events)
    .filter((e) => !e.isManual)
    .filter((event) => event.schedule === selectedSchedule);
  const dispatch = useDispatch();
  const [showCourseModal, setShowCourseModal] = useState(false);

  return (
    <List className={classes.root}>
      {events.length === 0 && <p>Begin adding classes to show here</p>}
      {events &&
        events.map((e) => {
          return (
            <ListItem
              key={e.title}
              style={{
                backgroundColor: e.backgroundColor,
                borderRadius: 5,
                margin: 10,
              }}
            >
              <ListItemText
                onClick={() => setShowCourseModal(e)}
                primary={`${e.title} - ${e.Title}`}
                secondary={`${e.Days} ${convertFrom24To12Format(
                  e["Start Time"]
                )}-${convertFrom24To12Format(e["End Time"])} w/ Professor: ${
                  e["Instructor Fname"]
                }. ${e["Instructor Lname"]}`}
              />
              <Button onClick={() => dispatch(removeEvent(e.Code))}>
                Remove Class
              </Button>
            </ListItem>
          );
        })}
      {showCourseModal && (
        <CourseModal
          isOpen={!!showCourseModal}
          setIsOpen={(val) => setShowCourseModal(val)}
          section={showCourseModal}
        />
      )}
    </List>
  );
};

export default CourseList;
