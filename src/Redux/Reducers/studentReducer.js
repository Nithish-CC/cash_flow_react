import {
  ActionTypes,
  feesDetailsFeeMasterId,
  hostelFeeValues,
  hostelModeOfTransport,
} from "../Constants/action-types";

const initialState = {
  details: [],
  newUser: {},
  hostalFee: {},
  hostelTransport: {},
  feesDetails_FeeMasterId: {},
};

export const studentReducerGet = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.STUDENT_DETAIL_GET:
      return { ...state, details: payload };
    case ActionTypes.STUDENT_DETAIL_POST:
      console.log(payload);
      return { ...state, newUser: payload };
    case hostelFeeValues.HOSTAL_FEE_VALUES:
      return { ...state, hostalFee: payload };
    case hostelModeOfTransport.HOSTAL_MODE_OF_TRANSPORT:
      return { ...state, hostelTransport: payload };
    case feesDetailsFeeMasterId.FEES_DETAILS_FEE_MASTER_ID:
      return { ...state, feesDetails_FeeMasterId: payload };
    default:
      return state;
  }
};
