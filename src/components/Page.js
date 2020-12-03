import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { setErrors } from "../actions/";
import Header from "./Header";

const Page = (props) => {
  let errors = useSelector((state) => state.auth.errors);
  const dispatch = useDispatch();
  return (
    <Box color="text.primary">
      <Header />
      <br></br>
      {errors && (
        <Alert
          severity="error"
          onClose={() => {
            dispatch(setErrors(false));
          }}
        >
          {errors}
        </Alert>
      )}
      <br></br>
      <Container maxWidth="lg">{props.children}</Container>
    </Box>
  );
};

export default Page;
