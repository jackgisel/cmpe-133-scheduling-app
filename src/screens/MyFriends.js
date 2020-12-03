import React from "react";
import Page from "../components/Page";
import Friends from "../components/Friends";

const MyFriends = ({ handleThemeChange }) => {
  return (
    <Page {...{ handleThemeChange }}>
      <Friends />
    </Page>
  );
};

export default MyFriends;
