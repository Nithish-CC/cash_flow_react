import {
  academicFeesDiscountType,
  academicFeesSchoolDetails,
  academicFeesSetFeeMasterId,
  ActionTypes,
  hostelFeeValues,
  hostelModeOfTransport,
  studentPayFeemaster,
} from "../Constants/action-types";

const initialState = {
  details: [],
  newUser: {},
  hostalFee: {},
  hostelTransport: {},
  feesDetails_SetFeeMasterId: {},
  academicFeesDiscountTypeRed: {},
  studentPayfeeMasterRed: {},
  academicFeesSchoolDetailsRed: {},
};

export const studentReducerGet = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.STUDENT_DETAIL_GET:
      return { ...state, details: payload };
    case ActionTypes.STUDENT_DETAIL_POST:
      return { ...state, newUser: payload };
    case hostelFeeValues.HOSTAL_FEE_VALUES:
      return { ...state, hostalFee: payload };
    case hostelModeOfTransport.HOSTAL_MODE_OF_TRANSPORT:
      return { ...state, hostelTransport: payload };
    case academicFeesSetFeeMasterId.ACADEMIC_FEES_SET_FEE_MASTER_ID:
      return { ...state, feesDetails_SetFeeMasterId: payload };
    case academicFeesDiscountType.ACADEMIC_FEES_DISCOUNT_TYPE:
      return { ...state, academicFeesDiscountTypeRed: payload };
    case studentPayFeemaster.STUDENT_PAY_FEEMASTER:
      return { ...state, studentPayfeeMasterRed: payload };
    case academicFeesSchoolDetails.ACADEMIC_FEES_SCHOOL_DETAILS:
      return { ...state, academicFeesSchoolDetailsRed: payload };
    default:
      return state;
  }
};
