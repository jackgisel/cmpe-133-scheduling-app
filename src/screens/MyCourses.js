import React from "react";
import Page from "../components/Page";
import CourseDropdown from "../components/CourseDropdown";
import CourseList from "../components/CourseList";
import QuickAdd from "../components/QuickAdd";

const MyCourses = () => (
  <Page>
    <QuickAdd />
    <CourseDropdown />
    <CourseList />
  </Page>
);

export default MyCourses;
