import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import randomColor from "randomcolor";

import { getSections, addEvent } from "../actions/";
import { convertFrom24To12Format } from "../helpFunctions/helpers";

const Suggestions = () => {
  const dispatch = useDispatch();

  const userCourses = useSelector((state) => state.auth.user.courses);
  const sections = useSelector((state) => state.classes.sections);

  return (
    <Box>
      {userCourses.map((course) => (
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
          <Button onClick={() => dispatch(getSections(course.id))}>
            Find Sections
          </Button>
        </Box>
      ))}
      {sections.length > 1 && (
        <Box>
          <Typography variant="h6">Sections</Typography>
          {sections.map((section) => {
            return (
              <Box
                flex={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginY={2}
                paddingX={2}
                paddingY={1}
                borderRadius={5}
                style={{
                  backgroundColor: randomColor({ luminosity: "light" }),
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography>Section</Typography>
                  <Typography variant="body1">{section["Section"]}</Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography>Day & Time</Typography>
                  <Typography variant="body1">
                    {section["Days"]}{" "}
                    {convertFrom24To12Format(section["Start Time"])}-
                    {convertFrom24To12Format(section["End Time"])}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography>Instructor</Typography>
                  <Typography variant="body1">
                    {section["Instructor Fname"]}.{section["Instructor Lname"]}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography>Seats</Typography>
                  <Typography variant="body1">
                    {section["Total seats"] - section["Seats taken"]}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    onClick={() => {
                      dispatch(addEvent(section));
                    }}
                  >
                    Add Class
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Suggestions;
