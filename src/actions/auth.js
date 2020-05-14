import { myFirebase, db } from "../firebase/firebase";
import firebase from "firebase/app";
import randomColor from "randomcolor";

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
export const ADDED_SCHEDULE = "ADDED_SCHEDULE";
export const SET_SCHEDULE = "SET_SCHEDULE";

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

export const addedSchedule = (scheduleName) => {
  return {
    type: ADDED_SCHEDULE,
    scheduleName,
  };
};

export const setSchedule = (scheduleName) => {
  return {
    type: SET_SCHEDULE,
    scheduleName,
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

  let startRecurString = section["Start Date"].toString().split("/");
  let startRecS =
    "20" +
    startRecurString[2] +
    "-" +
    startRecurString[0] +
    "-" +
    startRecurString[1];

  let endRecurString = section["End Date"].toString().split("/");
  let endRecS =
    "20" +
    endRecurString[2] +
    "-" +
    endRecurString[0] +
    "-" +
    endRecurString[1];

  return {
    ...section,
    title: `${section.Course} - ${section.Section}`,
    daysOfWeek: JSON.parse(section["Daysofweek"]),
    startTime: start,
    endTime: end,
    startRecur: startRecS,
    endRecur: endRecS,
    id: section.Code,
    backgroundColor: randomColor({
      luminosity: "light",
    }),
  };
}

export const checkFinal = (section) => (dispatch) => {
  let startString = section["Start Time"].toString().split("");
  let start =
    startString.length === 3
      ? "0" + startString[0] + ":" + startString[1] + startString[2]
      : startString[0] + startString[1] + ":" + startString[2] + startString[3];
  let time = start.split(":");
  let hours = parseInt(time[0]);
  let minutes = parseInt(time[1]);
  let total = hours * 60 + minutes;

  //Group I Section
  var DoW = JSON.parse(section["Daysofweek"]).toString();
  var M = [1].toString();
  var W = [3].toString();
  var F = [5].toString();
  var MTW = [1, 2, 3].toString();
  var MTWF = [1, 2, 3, 5].toString();
  var MWRF = [1, 3, 4, 5].toString();
  var MTWRF = [1, 2, 3, 4, 5].toString();
  var MW = [1, 3].toString();
  var WF = [3, 5].toString();
  var MWF = [1, 3, 5].toString();
  var MF = [1, 5].toString();
  var WR = [3, 4].toString();
  var MT = [1, 2].toString();

  //Group II Section
  var TR = [2, 4].toString();
  var T = [1].toString();
  var R = [4].toString();
  var TWR = [2, 3, 4].toString();
  var MTR = [1, 2, 4].toString();
  var TRF = [2, 4, 5].toString();
  var MTRF = [1, 2, 4, 5].toString();
  var MTWR = [1, 2, 3, 4].toString();
  var TWRF = [2, 3, 4, 5].toString();
  var RF = [4, 5].toString();
  var TF = [2, 5].toString();

  let startingTime = "";
  let endingTime = "";
  let date = "";

  //17:30 == 1050 minutes, 18:00 == 1080 minutes
  if (
    (DoW === M ||
      DoW === W ||
      DoW === F ||
      DoW === MTW ||
      DoW === MTWF ||
      DoW === MWRF ||
      DoW === MTWRF ||
      DoW === MW ||
      DoW === WF ||
      DoW === MWF ||
      DoW === MF ||
      DoW === WR ||
      DoW === MT) &&
    total < 1050
  ) {
    if (total === 450 && total === 480) {
      endingTime = "07:15";
      startingTime = "09:30";
      date = "2020-05-14";
    } else if (total === 510 || total === 540) {
      endingTime = "07:15";
      startingTime = "09:30";
      date = "2020-05-14";
    } else if (total === 570 || total === 600) {
      endingTime = "07:15";
      startingTime = "09:30";
      date = "2020-05-14";
    } else if (total === 630 || total === 660) {
      endingTime = "09:45";
      startingTime = "12:00";
      date = "2020-05-14";
    } else if (total === 690 || total === 720) {
      endingTime = "09:45";
      startingTime = "12:00";
      date = "2020-05-14";
    } else if (total === 750 || total === 780) {
      endingTime = "12:15";
      startingTime = "14:30";
      date = "2020-05-14";
    } else if (total === 810 || total === 840) {
      endingTime = "12:15";
      startingTime = "14:30";
      date = "2020-05-14";
    } else if (total === 870 || total === 900) {
      endingTime = "12:15";
      startingTime = "14:30";
      date = "2020-05-14";
    } else if (total === 930 || total === 960) {
      endingTime = "14:45";
      startingTime = "17:00";
      date = "2020-05-14";
    } else if (total === 990 || total === 1020) {
      endingTime = "14:45";
      startingTime = "17:00";
      date = "2020-05-14";
    } else {
      //Error
    }
  } else if (
    (DoW === TR ||
      DoW === T ||
      DoW === R ||
      DoW === TWR ||
      DoW === MTR ||
      DoW === TRF ||
      DoW === MTRF ||
      DoW === MTWR ||
      DoW === TWRF ||
      DoW === RF ||
      DoW === TF) &&
    total < 1050
  ) {
    if (total === 450 && total === 480) {
      //7:30 - 8:00

      endingTime = "09:30";
      startingTime = "07:15";
      date = "2020-05-15";
    } else if (total === 510 || total === 540) {
      //8:30 - 9:00

      endingTime = "09:30";
      startingTime = "07:15";
      date = "2020-05-19";
    } else if (total === 570 || total === 600) {
      //9:30 - 10:00...

      endingTime = "12:00";
      startingTime = "09:45";
      date = "2020-05-14";
    } else if (total === 630 || total === 660) {
      endingTime = "12:00";
      startingTime = "09:45";
      date = "2020-05-18";
    } else if (total === 690 || total === 720) {
      endingTime = "12:00";
      startingTime = "09:45";
      date = "2020-05-13";
    } else if (total === 750 || total === 780) {
      endingTime = "14:30";
      startingTime = "12:15";
      date = "2020-05-15";
    } else if (total === 810 || total === 840) {
      endingTime = "14:30";
      startingTime = "12:15";
      date = "2020-05-19";
    } else if (total === 870 || total === 900) {
      endingTime = "17:00";
      startingTime = "14:45";
      date = "2020-05-14";
    } else if (total === 930 || total === 960) {
      endingTime = "17:00";
      startingTime = "14:45";
      date = "2020-05-18";
    } else if (total === 990 || total === 1020) {
      endingTime = "17:00";
      startingTime = "14:45";
      date = "2020-05-13";
    } else {
      //Error
    }
  } else if (total >= 1050 && total < 1080) {
    if (DoW === M) {
      //17:30 - 18:00

      endingTime = "19:30";
      startingTime = "17:15";
      date = "2020-05-18";
    } else if (DoW === T) {
      endingTime = "19:30";
      startingTime = "17:15";
      date = "2020-05-19";
    } else if (DoW === W) {
      endingTime = "19:30";
      startingTime = "17:15";
      date = "2020-05-13";
    } else if (DoW === R) {
      endingTime = "09:30";
      startingTime = "17:15";
      date = "2020-05-14";
    } else if (DoW === F) {
      endingTime = "19:30";
      startingTime = "17:15";
      date = "2020-05-15";
    } else {
      //Error
    }
  } else if (total >= 1080) {
    if (DoW === M) {
      //18:30 or later

      endingTime = "19:45";
      startingTime = "22:00";
      date = "2020-05-18";
    } else if (DoW === T) {
      endingTime = "19:45";
      startingTime = "22:00";
      date = "2020-05-19";
    } else if (DoW === W) {
      endingTime = "19:45";
      startingTime = "22:00";
      date = "2020-05-13";
    } else if (DoW === R) {
      endingTime = "19:45";
      startingTime = "22:00";
      date = "2020-05-14";
    } else if (DoW === F) {
      endingTime = "19:45";
      startingTime = "22:00";
      date = "2020-05-15";
    } else {
      //Error
    }
  } else if (DoW === [6].toString()) {
    // dont care about thrse edge cases
  } else if (DoW === "TBA") {
    // dont care about thrse edge cases
  } else {
    // dont care about thrse edge cases
  }

  console.log("Date: ", date, " Time: ", startingTime);
  if (date.length > 1) {
    const email = myFirebase.auth().currentUser.email;

    let newEvent = {
      isManual: true,
      id: `final:${section.Code}`,
      title: `Final for ${section.Course}`,

      ["Start time"]: startingTime,
      ["End time"]: endingTime,
      start: date + "T" + startingTime,
      end: date + "T" + endingTime,
      isRecurring: false,
      schedule: "Finals",
      type: "final",
      backgroundColor: randomColor({
        luminosity: "light",
      }),
    };

    console.log(newEvent);
    // dispatch addEvent for final
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          db.collection("users")
            .doc(doc.id)
            .update({
              events: firebase.firestore.FieldValue.arrayUnion(newEvent),
            })
            .then(() => dispatch(addedEvent(newEvent)));
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    console.log("this finished");
  }
};

export const addEvent = (section) => async (dispatch, getState) => {
  const email = myFirebase.auth().currentUser.email;

  let schedule = getState().auth.user.schedule;

  let events = getState().auth.user.events;

  if (events.some((event) => event.Code === section.Code)) {
    dispatch(setErrors("You already have this course added!"));
  } else {
    if (!section.isManual) {
      console.log("This is called");
      dispatch(checkFinal(section));
    }

    let event = section.isManual ? section : prepareEvent(section);

    event = { ...event, schedule };

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
  }
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

export const addSchedule = (scheduleName) => async (dispatch) => {
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
            schedules: firebase.firestore.FieldValue.arrayUnion(scheduleName),
          });
        dispatch(addedSchedule(scheduleName));
        dispatch(setSchedule(scheduleName));
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
};
