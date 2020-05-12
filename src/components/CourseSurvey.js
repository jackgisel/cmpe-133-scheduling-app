import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
  ButtonGroup,
  makeStyles,
} from "@material-ui/core";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { useDispatch } from "react-redux";

import { updateAverageCost } from "../actions/";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 30,
  },
  formControl: {
    margin: 1,
    minWidth: 120,
  },
  addcourse: {
    marginTop: 20,
  },
  padded: {
    padding: 20,
  },
  fab: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
  content: {
    marginBottom: -50,
  },
}));

const CourseSurvey = ({ isOpen, setIsOpen, code }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState("");
  const [yesSelected, setyesSelected] = useState("contained");
  const [noSelected, setnoSelected] = useState("outlined");
  const [amtDisabled, setamtDisabled] = useState(false);
  const [submit_bool, setsubmit_bool] = useState(true);

  const handleSubmit = (e) => {
    let value = Number(currency);
    dispatch(updateAverageCost(code, value));
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleButton = (e) => {
    setamtDisabled(false);
    setsubmit_bool(false);

    setyesSelected("contained");
    setnoSelected("outlined");
  };

  const handleButton2 = (e) => {
    setamtDisabled(true);
    setsubmit_bool(false);

    setnoSelected("contained");
    setyesSelected("outlined");
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Course Survey</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Did this course require addition textbook/material costs?
        </DialogContentText>
        <ButtonGroup>
          <Button
            className={classes.button}
            value="true"
            variant={yesSelected}
            color="primary"
            onClick={handleButton}
          >
            Yes
          </Button>
          <Button
            className={classes.button}
            value="false"
            variant={noSelected}
            color="primary"
            onClick={handleButton2}
          >
            No
          </Button>
        </ButtonGroup>
        <DialogContentText>
          Provide an estimated cost of materials below:
        </DialogContentText>
        <CurrencyTextField
          label="Amount"
          variant="standard"
          value={currency}
          currencySymbol="$"
          outputFormat="number"
          disabled={amtDisabled}
          onChange={(e, currency) => {
            setCurrency(currency);
            setsubmit_bool(false);
          }}
          defaultValue="0.00"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={submit_bool}
          value={currency}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseSurvey;
