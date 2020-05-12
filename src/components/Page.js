import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import { Container } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { setErrors } from "../actions/";

const Page = (props) => {
  let errors = useSelector((state) => state.auth.errors);
  const dispatch = useDispatch();
  return (
    <div>
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
      <Container maxWidth="md">{props.children}</Container>
    </div>
  );
};

export default Page;
