import { TransportTypes } from "../constants/action-types";
const intialState = {
    transportfees: [],
};

export const transportfeesReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case TransportTypes.FETCH_TRANSPORT_FEES:
            return { ...state, transportfees: payload };
        case TransportTypes.DELETE_TRANSPORT_FEES:
            return { ...state, years: payload };
        default:
            return state;
    }
};
