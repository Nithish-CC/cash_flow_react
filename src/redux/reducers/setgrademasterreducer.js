import { Grademastertypes } from "../constants/Actiontypes";

const initialState = {
  gradetypes: [],
};
export const setgradeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Grademastertypes.SET_GRADE_TYPES:
      return { ...state, gradetypes: payload };
    default:
      return state;
  }
};