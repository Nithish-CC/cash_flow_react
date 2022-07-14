import { ActionTypes } from "../constants/action-types";
const intialState = {
    products: [],
};

export const yearsReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.FETCH_YEARS:
            return { ...state, products: payload };
        case ActionTypes.DELETE_YEAR:
            return { ...state, products: payload };
        default:
            return state;
    }
};
