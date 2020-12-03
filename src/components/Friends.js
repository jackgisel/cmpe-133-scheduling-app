import React, { useState } from "react";
import {
  makeStyles,
  FormControl,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import randomColor from "randomcolor";
import ChatIcon from "@material-ui/icons/Chat";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { addFriend, deleteFriend } from "../actions/";

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
  const [message, setMessage] = useState("");
  const [errors, setLocalErrors] = useState("");

  const [showChat, setShowChat] = useState(false);

  return (
    <Box display="flex" flexDirection="row">
      <Box flex={0.5}>
        <Typography variant="h2">My Friends</Typography>

        <List className={classes.root}>
          {friends.length === 0 && <p>Begin adding friends to show here</p>}
          {friends &&
            friends.map((e) => {
              return (
                <ListItem
                  key={e}
                  style={{
                    backgroundColor: randomColor({
                      luminosity: "light",
                    }),
                    borderRadius: 5,
                    margin: 10,
                  }}
                >
                  <ListItemText flex={1} primary={`${e}`} />
                  <Button onClick={() => dispatch(deleteFriend(e))}>
                    <DeleteForeverIcon />
                  </Button>
                  <Button onClick={() => setShowChat(e)}>
                    <ChatIcon />
                  </Button>
                </ListItem>
              );
            })}
        </List>
      </Box>
      <Box
        flex={0.5}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        {false && (
          <Box
            display="flex"
            flexDirection="column"
            borderRadius={15}
            height={300}
            width={300}
            padding={2}
            style={{ borderWidth: 1 }}
          >
            <Typography variant="h4">{showChat}</Typography>
            <Box flex={1}>
              {true && <Typography variant="h6">Send a message</Typography>}
            </Box>
            <Box bgcolor="white">
              <FormControl fullWidth className={classes.formControl}>
                <TextField
                  style={{ flexGrow: 1 }}
                  id="outlined-basic"
                  label="Message"
                  variant="outlined"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    console.log(message);
                  }}
                  className={classes.addcourse}
                >
                  Send
                </Button>
              </FormControl>
            </Box>
          </Box>
        )}
        <Typography variant="h2">Add Friends</Typography>
        {errors && <Typography variant="warning">{errors}</Typography>}
        <FormControl className={classes.formControl}>
          <TextField
            style={{ width: 400 }}
            id="outlined-basic"
            label="Add a friend by their SJSU email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            style={{ height: 55 }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => {
              if (email.split("@")[1] !== "sjsu.edu") {
                setLocalErrors("Must be an SJSU friend");
              } else {
                setEmail("");
                dispatch(addFriend(email));
              }
            }}
            className={classes.addcourse}
          >
            Add
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Friends;
