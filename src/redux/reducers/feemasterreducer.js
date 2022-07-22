import { ActionTypes } from "../constants/action-types";

const initialState = {
  feemaster: [],
};
export const feemasterreducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_FEEMASTER_TYPES:
      return { ...state, feemaster: payload };
    default:
      return state;
  }
};
