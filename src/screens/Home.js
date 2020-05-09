import React, { Component } from "react";
import Page from "../components/Page";
import Calendar from "../components/Calendar";
import CourseDropdown from "../components/CourseDropdown";

class Home extends Component {
  render() {
    return (
      <Page>
        <CourseDropdown />
        <Calendar />
      </Page>
    );
  }
}

export default Home;
