import { combineReducers } from "redux";

import auth from "./auth";
import classes from "./classes";

export default combineReducers({ auth, classes });
