import { TransportTypes } from "../constants/action-types";
const intialState = {
    transportfees: [],
    transportfeeval: [],
    addtransportfeeval: [],
    datatoDelete: [],
};

export const transportfeesReducer = (state = intialState, { type, payload }) => {
    console.log(payload);
    console.log(type);

    switch (type) {
        case TransportTypes.FETCH_TRANSPORT_FEES:
            return { ...state, transportfees: payload };
        case TransportTypes.DELETE_TRANSPORT_FEES: {
            return {
                ...state,
                transportfeeval: state.transportfeeval.filter((datatoDelete) => datatoDelete.terms[0].year_of_fees_id !== payload),
            };
        }
        case TransportTypes.LIST_TRANSPORT_FEES:
            return { ...state, transportfeeval: payload };
        case TransportTypes.ADD_TRANSPORT_FEES:
            return { ...state, addtransportfeeval: payload };
        default:
            return state;
    }
};
