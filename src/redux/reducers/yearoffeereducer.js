import { ActionTypes } from "../constants/action-types";

const initialState = {
  yearoffees: [],
  postyearoffees: [],
};
export const yearoffeereducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_YEAR_OF_FEE:
      return { ...state, yearoffees: payload };
    default:
      return state;
  }
};
export const postyearoffee = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.POST_YEAR_OF_FEE:
      return { ...state, postyearoffees: payload };
    case ActionTypes.DELETE_YEAR_OF_FEE: {
      return {
        ...state,
        yearoffees: state.yearoffees.filter((datatoDelete) => datatoDelete.terms[0].year_of_fees_id !== payload),
      };
    }
    default:
      return state;
  }
};
