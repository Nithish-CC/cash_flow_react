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
        case ActionTypes.ADD_YEAR:
            return {
                ...state,
                products: payload,
            };
        default:
            return state;
    }
};

export const selectedYearsReducer = (state = {}, { type, payload }) => {
    console.log(type);
    switch (type) {
        case ActionTypes.SELECTED_PRODUCT:
            return { ...state, ...payload };
        case ActionTypes.REMOVE_SELECTED_PRODUCT:
            return {};
        default:
            return state;
    }
};
