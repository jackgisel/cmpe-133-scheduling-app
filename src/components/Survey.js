import React from 'react';

const Survey = () => {
  return (<Button variant="outlined" color="primary" onClick={handleOpen}>
  Taken this course? Fill out a quick survey for us!
</Button>
<Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="form-dialog-title"
>
  <DialogTitle id="form-dialog-title">Course Survey</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Did this course require addition textbook/material costs?
    </DialogContentText>
    <ButtonGroup>
      <Button
        classname={classes.button}
        value="true"
        variant={yesSelected}
        color="primary"
        onClick={handleButton}
      >
        Yes
      </Button>
      <Button
        classname={classes.button}
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
      currencySymbol="$"
      outputFormat="number"
      disabled={amtDisabled}
      defaultValue="0.00"
      fullWidth
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">
      Cancel
    </Button>
    <Button
      onClick={handleClose}
      color="primary"
      disabled={submit_bool}
    >
      Submit
    </Button>
  </DialogActions>
</Dialog>);
}
export default Survey;