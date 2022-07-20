import { ActionTypes } from "../constants/action-types";
const intialState = {
  years: [],
};

export const yearsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_YEARS:
      return { ...state, years: payload };
    case ActionTypes.DELETE_YEAR:
      return { ...state, years: payload };
    default:
      return state;
  }
};
