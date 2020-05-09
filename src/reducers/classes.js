import {
  FETCH_DEPARTMENT_REQUEST,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_FAILURE,
  FETCH_COURSE_REQUEST,
  FETCH_COURSE_SUCCESS,
  FETCH_COURSE_FAILURE,
  FETCH_SECTION_REQUEST,
  FETCH_SECTION_SUCCESS,
  FETCH_SECTION_FAILURE,
  FETCHED_PROFESSOR,
} from "../actions";

export default (
  state = {
    isFetching: false,
    departments: [],
    courses: [],
    sections: [],
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case FETCH_DEPARTMENT_REQUEST:
    case FETCH_COURSE_REQUEST:
      return {
        ...state,
        courses: [],
        sections: [],
        isFetching: true,
        error: false,
      };
    case FETCH_SECTION_REQUEST:
      return {
        ...state,
        sections: [],
        isFetching: true,
        error: false,
      };
    case FETCH_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: action.departments,
        isFetching: false,
        error: undefined,
      };
    case FETCH_COURSE_SUCCESS:
      return {
        ...state,
        courses: action.courses,
        isFetching: false,
        error: undefined,
      };
    case FETCH_SECTION_SUCCESS:
      return {
        ...state,
        sections: action.sections,
        isFetching: false,
        error: undefined,
      };
    case FETCH_COURSE_FAILURE:
    case FETCH_DEPARTMENT_FAILURE:
    case FETCH_SECTION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case FETCHED_PROFESSOR:
      return {
        ...state,
        professors: [...state.professors, action.professors],
      };
    default:
      return state;
  }
};
