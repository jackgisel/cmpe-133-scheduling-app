import React, { Component } from "react";
import Page from "../components/Page";
import Calendar from "../components/Calendar";

class Home extends Component {
  render() {
    return (
      <Page>
        <Calendar />
      </Page>
    );
  }
}

export default Home;
