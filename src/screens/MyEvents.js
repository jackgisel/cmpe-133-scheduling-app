import React from "react";
import Page from "../components/Page";
import CustomEvents from "../components/CustomEvents";

const MyEvents = ({ handleThemeChange }) => {
  return (
    <Page {...{ handleThemeChange }}>
      <CustomEvents />
    </Page>
  );
};

export default MyEvents;
