import React, { useState } from "react";
import { FormControl, TextField, Button, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { addClassByCode } from "../actions/";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 1,
    minWidth: 120,
    display: "flex",
    flexDirection: "row",
  },
}));

const QuickAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  let [courseCode, setCourseCode] = useState("");

  return (
    <FormControl fullWidth className={classes.formControl}>
      <TextField
        style={{ flexGrow: 1 }}
        id="outlined-basic"
        label="Quick add by Course Code"
        variant="outlined"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => {
          setCourseCode("");
          dispatch(addClassByCode(courseCode));
        }}
        className={classes.addcourse}
      >
        Add
      </Button>
    </FormControl>
  );
};
export default QuickAdd;
