import { db } from "../firebase/firebase";

export const FETCH_DEPARTMENT_REQUEST = "FETCH_DEPARTMENT_REQUEST";
export const FETCH_DEPARTMENT_SUCCESS = "FETCH_DEPARTMENT_SUCCESS";
export const FETCH_DEPARTMENT_FAILURE = "FETCH_DEPARTMENT_FAILURE";

export const FETCH_COURSE_REQUEST = "FETCH_COURSE_REQUEST";
export const FETCH_COURSE_SUCCESS = "FETCH_COURSE_SUCCESS";
export const FETCH_COURSE_FAILURE = "FETCH_COURSE_FAILURE";

export const FETCH_SECTION_REQUEST = "FETCH_SECTION_REQUEST";
export const FETCH_SECTION_SUCCESS = "FETCH_SECTION_SUCCESS";
export const FETCH_SECTION_FAILURE = "FETCH_SECTION_FAILURE";

export const FETCHED_PROFESSOR = "FETCHED_PROFESSOR";

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

const fetchCourses = () => {
  return {
    type: FETCH_COURSE_REQUEST,
  };
};

const fetchCoursesSuccess = (courses) => {
  return {
    type: FETCH_COURSE_SUCCESS,
    courses,
  };
};

const fetchCoursesError = (error) => {
  return {
    type: FETCH_COURSE_FAILURE,
    error,
  };
};

const fetchSections = () => {
  return {
    type: FETCH_SECTION_REQUEST,
  };
};

const fetchSectionsSuccess = (sections) => {
  return {
    type: FETCH_SECTION_SUCCESS,
    sections,
  };
};

const fetchSectionsError = (error) => {
  return {
    type: FETCH_SECTION_FAILURE,
    error,
  };
};

const fetchedProfessor = (professors) => {
  return {
    type: FETCHED_PROFESSOR,
    professors,
  };
};

export const getDepartments = () => async (dispatch) => {
  dispatch(fetchDepartments());
  await db
    .collection("SJSU - Departments")
    .get()
    .then(function (querySnapshot) {
      let departments = [];
      querySnapshot.forEach((doc) =>
        departments.push({
          id: doc.id,
          ...doc.data(),
        })
      );
      dispatch(fetchDepartmentsSuccess(departments));
    })
    .catch((err) => {
      dispatch(fetchDepartmentsError(err));
    });
};

export const getCourses = (departmentId) => async (dispatch) => {
  dispatch(fetchCourses());
  await db
    .collection("SJSU - Courses")
    .where("Department", "==", departmentId)
    .get()
    .then(function (querySnapshot) {
      let courses = [];
      querySnapshot.forEach((doc) =>
        courses.push({
          id: doc.id,
          ...doc.data(),
        })
      );
      dispatch(fetchCoursesSuccess(courses));
    })
    .catch((err) => {
      dispatch(fetchCoursesError(err));
    });
};

export const getSections = (courseId) => async (dispatch) => {
  dispatch(fetchSections());
  await db
    .collection("SJSU - Sections")
    .where("Course", "==", courseId)
    .get()
    .then(function (querySnapshot) {
      let sections = [];
      querySnapshot.forEach((doc) =>
        sections.push({
          id: doc.id,
          ...doc.data(),
        })
      );
      dispatch(fetchSectionsSuccess(sections));
    })
    .catch((err) => {
      dispatch(fetchSectionsError(err));
    });
};

export const fetchProfessor = (professorName) => async (dispatch) => {
  await db
    .collection("SJSU - Professors")
    .where("Last Name", "==", professorName)
    .get()
    .then(function (querySnapshot) {
      let professors = [];
      querySnapshot.forEach((doc) =>
        professors.push({
          id: doc.id,
          ...doc.data(),
        })
      );
      dispatch(fetchedProfessor(professors));
    })
    .catch((err) => {
      console.log(err);
    });
};
