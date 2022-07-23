import { TransportTypes } from "../constants/action-types";
const intialState = {
    transportfees: [],
    transportfeeval: [],
    addtransportfeeval: [],
    datatoDelete: [],
    year_grade_section: [],
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
        case TransportTypes.SET_ACTION_TRANSPORT_FEES:
            return { ...state, year_grade_section: payload };
        default:
            return state;
    }
};
