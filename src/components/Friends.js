import React, { useState } from "react";
import {
  makeStyles,
  FormControl,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { addFriend } from "../actions/";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 1,
    minWidth: 120,
    display: "flex",
    flexDirection: "row",
  },
}));

const Friends = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.auth.user.friends);
  const [email, setEmail] = useState("");

  return (
    <div>
      <FormControl fullWidth className={classes.formControl}>
        <TextField
          style={{ flexGrow: 1 }}
          id="outlined-basic"
          label="Add a friend by their SJSU email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            setEmail("");
            dispatch(addFriend(email));
          }}
          className={classes.addcourse}
        >
          Add
        </Button>
      </FormControl>
      <List className={classes.root}>
        {friends.length === 0 && <p>Begin adding friends to show here</p>}
        {friends &&
          friends.map((e) => {
            return (
              <ListItem
                key={e}
                style={{
                  backgroundColor: "grey",
                  borderRadius: 5,
                  margin: 10,
                }}
              >
                <ListItemText primary={`${e}`} />
              </ListItem>
            );
          })}
      </List>
    </div>
  );
};

export default Friends;
