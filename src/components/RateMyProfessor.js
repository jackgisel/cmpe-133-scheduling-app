import React, { useState, useEffect } from "react";
import {
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  makeStyles,
  Box,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfessor } from "../actions";

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

const RateMyProfessor = ({ showRMP, hideRMP, lastName }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const professors = useSelector((state) => state.classes.professors);
  const [selectedProfessor, setSelectedProfessor] = useState("");
  const [submit_bool_rmp, setsubmit_bool_rmp] = useState(false);
  const [RMPProf, setRMPProf] = useState({});

  useEffect(() => {
    dispatch(fetchProfessor(lastName));
  }, [dispatch, lastName]);

  return (
    <Dialog
      open={showRMP}
      onClose={hideRMP}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">RateMyProfessor Data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select the correct professor from the list below:
        </DialogContentText>

        <FormControl
          fullWidth
          className={classes.formControl}
          disabled={professors.length <= 0}
        >
          <InputLabel id="label">Select Professor</InputLabel>
          <Select
            labelId="label"
            id="select"
            value={selectedProfessor}
            onChange={(event) => {
              setSelectedProfessor(event.target.value);
              setsubmit_bool_rmp(false);
            }}
          >
            {professors &&
              professors.map((professor) => {
                return (
                  <MenuItem value={professor.id} key={professor.id}>
                    {professor.id}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </DialogContent>

      {submit_bool_rmp && (
        <div>
          <DialogTitle id="form-dialog-title">
            RateMyProfessor Data for {RMPProf["First Name"]}{" "}
            {RMPProf["Last Name"]}
          </DialogTitle>
          <DialogContent>
            <Box display="flex" p={0.5}>
              <Box mr={15}>
                <Box fontWeight="fontWeightBold" display="inline">
                  Department:{" "}
                </Box>{" "}
                {RMPProf["Department"]} <br></br>
                <Box fontWeight="fontWeightBold" display="inline">
                  Institution:{" "}
                </Box>{" "}
                {RMPProf["Institution"]} <br></br>
                <Box fontWeight="fontWeightBold" display="inline">
                  Average Rating:{" "}
                </Box>{" "}
                {RMPProf["Average Rating"]} / 5 <br></br>
                <Box fontWeight="fontWeightBold" display="inline">
                  Level of Difficulty:{" "}
                </Box>{" "}
                {RMPProf["Level of Difficulty"]} / 5 <br></br>
                <Box fontWeight="fontWeightBold" display="inline">
                  Would take again:{" "}
                </Box>{" "}
                {RMPProf["Would take again"]} <br></br>
                <Box fontWeight="fontWeightBold" display="inline">
                  Based on:{" "}
                </Box>{" "}
                {RMPProf["Number of Ratings"]} Ratings<br></br>
                <Box fontWeight="fontWeightBold" display="inline">
                  Most Helpful Rating:{" "}
                </Box>{" "}
                {RMPProf["Most Helpful Rating"]} <br></br>
              </Box>
            </Box>
          </DialogContent>
        </div>
      )}

      <DialogActions>
        <Button onClick={hideRMP} color="primary">
          Close
        </Button>
        <Button
          onClick={() => {
            setsubmit_bool_rmp(true);
            setRMPProf(
              professors.filter((prof) => prof.id === selectedProfessor)[0]
            );
          }}
          color="primary"
          disabled={submit_bool_rmp}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RateMyProfessor;
