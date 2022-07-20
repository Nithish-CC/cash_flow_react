import { Actiontypes } from "../constants/Actiontypes";

const initialState = {
  grades: [],
  post_grades: [],
  year_grade_section: [],
};
export const gradeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Actiontypes.SET_GRADE:
      return { ...state, grades: payload };
    case Actiontypes.CREATE_GRADE_SECTION:
      return { ...state, post_grades: payload };
    case Actiontypes.SET_GRADE_YEAR:
      return { ...state, year_grade_section: payload };
    default:
      return state;
  }
};
