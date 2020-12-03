import React from "react";
import { Box, Typography } from "@material-ui/core";

import Page from "../components/Page";
import CourseDropdown from "../components/CourseDropdown";
import CourseList from "../components/CourseList";
import QuickAdd from "../components/QuickAdd";
import Suggestions from "../components/Suggestions";

const MyCourses = ({ handleThemeChange }) => (
  <Page {...{ handleThemeChange }}>
    <Box display="flex" flexDirection="row">
      <Box flex={0.5}>
        <Typography variant="h2">Course List</Typography>
        <CourseList />
      </Box>
      <Box flex={0.5}>
        <Typography variant="h2">Add Courses</Typography>
        <Box marginY={3}>
          <Typography variant="h4">Suggestions</Typography>
          <Suggestions />
        </Box>

        <Box marginY={3}>
          <Typography variant="h4">Quick add</Typography>
          <QuickAdd />
        </Box>
        <Box marginY={3}>
          <Typography variant="h4">Manual</Typography>
          <CourseDropdown />
        </Box>
      </Box>
    </Box>
  </Page>
);

export default MyCourses;
