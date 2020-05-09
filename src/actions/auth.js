import { myFirebase, db } from "../firebase/firebase";
import firebase from "firebase/app";

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

const addedEvent = (event) => {
  return {
    type: ADDED_EVENT,
    event,
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

export const addEvent = (event) => async (dispatch) => {
  const email = myFirebase.auth().currentUser.email;
  db.collection("users")
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
