import { ActionTypes } from "../constants/action-types";

const initialState = {
  yearoffees: [],
};
export const yearoffeereducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_YEAR_OF_FEE:
      return { ...state, yearoffees: payload };
    case ActionTypes.DELETE_YEAR_OF_FEE: {
      return {
        ...state,
        yearoffees: state.yearoffees.slice(0, payload).concat(state.yearoffees.slice(payload + 1, state.yearoffees.length)),
      };
    }
    default:
      return state;
  }
};
