import { ActionTypes } from "../Constants/action-types";

const initialState = {
  details: [],
  newUser: {},
};

export const studentReducerGet = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.STUDENT_DETAIL_GET:
      return { ...state, details: payload };
    case ActionTypes.STUDENT_DETAIL_POST:
      console.log(payload);
      return { ...state, newUser: payload };
    default:
      return state;
  }
};
