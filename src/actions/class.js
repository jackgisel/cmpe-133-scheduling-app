import { db } from "../firebase/firebase";

export const FETCH_DEPARTMENT_REQUEST = "FETCH_DEPARTMENT_REQUEST";
export const FETCH_DEPARTMENT_SUCCESS = "FETCH_DEPARTMENT_SUCCESS";
export const FETCH_DEPARTMENT_FAILURE = "FETCH_DEPARTMENT_FAILURE";

const fetchDepartments = () => {
  return {
    type: FETCH_DEPARTMENT_REQUEST,
  };
};

const fetchDepartmentsSuccess = (departments) => {
  return {
    type: FETCH_DEPARTMENT_SUCCESS,
    departments,
  };
};

const fetchDepartmentsError = (error) => {
  return {
    type: FETCH_DEPARTMENT_FAILURE,
    error,
  };
};

export const getDepartments = () => async (dispatch) => {
  dispatch(fetchDepartments());
  await db
    .collection("SJSU - Departments")
    .get()
    .then(function (querySnapshot) {
      dispatch(
        fetchDepartmentsSuccess(
          querySnapshot.forEach((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      );
    })
    .catch((err) => {
      console.log(err);
      dispatch(fetchDepartmentsError(err));
    });
};
