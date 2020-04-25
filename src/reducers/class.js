import {
  FETCH_DEPARTMENT_REQUEST,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_FAILURE,
} from "../actions/";

export default (
  state = {
    isFetching: false,
    departments: [],
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case FETCH_DEPARTMENT_REQUEST:
      return {
        ...state,
        isFetching: true,
        loginError: false,
      };
    case FETCH_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: action.departments,
        isFetching: false,
        loginError: undefined,
      };
    case FETCH_DEPARTMENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};
