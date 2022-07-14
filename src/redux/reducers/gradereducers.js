import { Actiontypes } from "../constants/Actiontypes";

const initialState = {
  grades: [],
};
export const gradeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Actiontypes.SET_GRADE:
      return { ...state, grades: payload };
    default:
      return state;
  }
};
