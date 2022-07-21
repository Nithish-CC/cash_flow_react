import { TransportTypes } from "../constants/action-types";
const intialState = {
    transportfees: [],
    transportfeeval: [],
    addtransportfeeval: [],
};

export const transportfeesReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case TransportTypes.FETCH_TRANSPORT_FEES:
            return { ...state, transportfees: payload };
        case TransportTypes.DELETE_TRANSPORT_FEES:
            return { ...state, years: payload };
        case TransportTypes.LIST_TRANSPORT_FEES:
            return { ...state, transportfeeval: payload };
        case TransportTypes.ADD_TRANSPORT_FEES:
            return { ...state, addtransportfeeval: payload };
        default:
            return state;
    }
};
