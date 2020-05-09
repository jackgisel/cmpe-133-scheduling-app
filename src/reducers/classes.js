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
  FETCH_PROFESSOR_REQUEST,
  FETCH_PROFESSOR_SUCCESS,
  FETCH_PROFESSOR_FAILURE,
} from "../actions";

export default (
  state = {
    isFetching: false,
    departments: [],
    courses: [],
    sections: [],
    professors: [],
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
    case FETCH_PROFESSOR_REQUEST:
      return {
        ...state,
        professors: [],
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
    case FETCH_PROFESSOR_SUCCESS:
      return {
        ...state,
        professors: [...state.professors, action.professors],
        isFetching: false,
        error: undefined,
      };
    case FETCH_COURSE_FAILURE:
    case FETCH_DEPARTMENT_FAILURE:
    case FETCH_SECTION_FAILURE:
    case FETCH_PROFESSOR_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};
