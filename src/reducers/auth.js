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
  REMOVED_SCHEDULE,
  ADDED_COURSES,
  UPDATED_COURSES,
  REMOVED_COURSE,
  REMOVED_FRIEND,
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
      schedule: "Default",
      schedules: ["Default", "Finals"],
      courses: [],
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
          schedules: [
            ...state.user.schedules,
            ...(action.user.schedules || []),
          ],
          events: [...state.user.events, ...(action.user.events || [])],
          friends: [...state.user.friends, ...(action.user.friends || [])],
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
    case REMOVED_FRIEND: {
      return {
        ...state,
        user: {
          ...state.user,
          friends: state.user.friends.filter((f) => f !== action.friend),
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
    case REMOVED_SCHEDULE: {
      return {
        ...state,
        user: {
          ...state.user,
          schedules: state.user.schedules.filter(
            (e) => e !== action.scheduleName
          ),
        },
      };
    }
    case REMOVED_COURSE: {
      return {
        ...state,
        user: {
          ...state.user,
          courses: state.user.courses.filter((e) => e.id !== action.courseId),
        },
      };
    }
    case ADDED_COURSES: {
      return {
        ...state,
        user: {
          ...state.user,
          courses: [...state.user.courses, ...action.courseList],
        },
      };
    }
    case UPDATED_COURSES: {
      return {
        ...state,
        user: {
          ...state.user,
          courses: action.courseList,
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
