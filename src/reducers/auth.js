import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  FOUND_USER,
  ADDED_EVENT,
  SET_ERRORS,
  BEGIN_REMOVE_EVENT,
  ADDED_FRIEND,
  ADDED_SCHEDULE,
  SET_SCHEDULE,
} from "../actions/";

export default (
  state = {
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: false,
    logoutError: false,
    isAuthenticated: false,
    errors: false,
    user: {
      email: "",
      events: [],
      friends: [],
      schedule: "",
      schedules: [],
    },
  },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
      };
    case FOUND_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user,
        },
      };
    case SET_ERRORS: {
      return {
        ...state,
        errors: action.errors,
      };
    }
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {},
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true,
      };
    case BEGIN_REMOVE_EVENT:
      return {
        ...state,
        user: {
          ...state.user,
          events: state.user.events.filter((e) => e.Code !== action.courseCode),
        },
      };
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false,
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false,
      };
    case ADDED_EVENT: {
      return {
        ...state,
        user: {
          ...state.user,
          events: [...state.user?.events, action.event],
        },
      };
    }
    case ADDED_FRIEND: {
      return {
        ...state,
        user: {
          ...state.user,
          friends: [...state.user.friends, action.friend],
        },
      };
    }
    case ADDED_SCHEDULE: {
      return {
        ...state,
        user: {
          ...state.user,
          schedules: [...state.user.schedules, action.scheduleName],
        },
      };
    }
    case SET_SCHEDULE: {
      return {
        ...state,
        user: {
          ...state.user,
          schedule: action.scheduleName,
        },
      };
    }
    default:
      return state;
  }
};
