import { myFirebase, db } from "../firebase/firebase";
import firebase from "firebase/app";
import randomHexColor from "random-hex-color";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

export const FOUND_USER = "FOUND_USER";
export const ADDED_EVENT = "ADDED_EVENT";
export const ADDED_FRIEND = "ADDED_FRIEND";

export const SET_ERRORS = "SET_ERRORS";
export const BEGIN_REMOVE_EVENT = "BEGIN_REMOVE_EVENT";

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const receiveLogin = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

const foundUser = (user) => {
  return {
    type: FOUND_USER,
    user,
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE,
  };
};

const signupError = () => {
  return {
    type: SIGNUP_FAILURE,
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE,
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST,
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS,
  };
};

const addedEvent = (event) => {
  return {
    type: ADDED_EVENT,
    event,
  };
};

const addedFriend = (friend) => {
  return {
    type: ADDED_FRIEND,
    friend,
  };
};

const beginRemoveEvent = (courseCode) => {
  return {
    type: BEGIN_REMOVE_EVENT,
    courseCode,
  };
};

export const setErrors = (errors) => {
  return {
    type: SET_ERRORS,
    errors,
  };
};

export const signupUser = (email, password) => (dispatch) => {
  myFirebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((id) => {
      db.collection("users")
        .add({
          email: email,
        })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      dispatch(signupError());
    });
};

export const fetchUser = () => async (dispatch) => {
  const email = myFirebase.auth().currentUser.email;
  await db
    .collection("users")
    .where("email", "==", email)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        dispatch(
          foundUser({
            id: doc.id,
            ...doc.data(),
          })
        );
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
};

export const loginUser = (email, password) => (dispatch) => {
  dispatch(requestLogin());
  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(receiveLogin());
      dispatch(fetchUser());
    })
    .catch((error) => {
      //Do something with the error if you want!
      dispatch(loginError());
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch((error) => {
      //Do something with the error if you want!
      dispatch(logoutError());
    });
};

export const verifyAuth = () => (dispatch) => {
  dispatch(verifyRequest());
  myFirebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      dispatch(receiveLogin(user));
    }
    dispatch(verifySuccess());
  });
};

function prepareEvent(section) {
  let startString = section["Start Time"].toString().split("");
  let start =
    startString.length === 3
      ? "0" + startString[0] + ":" + startString[1] + startString[2]
      : startString[0] + startString[1] + ":" + startString[2] + startString[3];

  let endString = section["End Time"].toString().split("");
  let end =
    endString.length === 3
      ? "0" + endString[0] + ":" + endString[1] + endString[2]
      : endString[0] + endString[1] + ":" + endString[2] + endString[3];

  return {
    ...section,
    title: `${section.Course} - ${section.Section}`,
    daysOfWeek: JSON.parse(section["Daysofweek"]),
    startTime: start,
    endTime: end,
    backgroundColor: randomHexColor(),
  };
}

export const addEvent = (section) => async (dispatch) => {
  const email = myFirebase.auth().currentUser.email;

  let event = section.isManual ? section : prepareEvent(section);

  console.log(section);
  db.collection("SJSU - Sections")
    .where("Code", "==", section.Code)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        db.collection("SJSU - Sections")
          .doc(doc.id)
          .update({
            students: firebase.firestore.FieldValue.arrayUnion(email),
          });
      });
    });

  await db
    .collection("users")
    .where("email", "==", email)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        db.collection("users")
          .doc(doc.id)
          .update({ events: firebase.firestore.FieldValue.arrayUnion(event) })
          .then(() => dispatch(addedEvent(event)));
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
};

export const removeEvent = (courseCode) => async (dispatch) => {
  const email = myFirebase.auth().currentUser.email;
  dispatch(beginRemoveEvent(courseCode));
  db.collection("users")
    .where("email", "==", email)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        db.collection("users")
          .doc(doc.id)
          .update({
            events: doc
              .data()
              .events.filter((event) => event.Code !== courseCode),
          });
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
};

export const addFriend = (email) => async (dispatch) => {
  const user = myFirebase.auth().currentUser.email;
  await db
    .collection("users")
    .where("email", "==", user)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        db.collection("users")
          .doc(doc.id)
          .update({
            friends: firebase.firestore.FieldValue.arrayUnion(email),
          });
        dispatch(addedFriend(email));
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
};
