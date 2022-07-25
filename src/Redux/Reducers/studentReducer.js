import {
  academicFeesDiscountType,
  academicFeesSchoolDetails,
  academicFeesSetAcademicYearDataAction,
  academicFeesSetFeeMasterId,
  academicFeesStudentDiscount,
  academicFeesStudentDiscount2,
  academicFeesStudentYearPost,
  ActionTypes,
  feesDetailsAutosearch,
  feesDetailsLastFourRecord,
  hostelFeeValues,
  hostelModeOfTransport,
  listOfPaymentstudentAllPayBalance,
  listOfPaymentStudentYearPost,
  studentPayAutoSearchDataAction,
  studentPayFeemaster,
  studentPayTermsChangeDataAction,
  studentProfileSearchwithid,
  studentProfileSetAllSection,
} from "../Constants/action-types";

const initialState = {
  newUser: {},
  hostalFee: {},
  hostelTransport: {},
  feesDetails_SetFeeMasterId: {},
  academicFeesDiscountTypeRed: {},
  studentPayfeeMasterRed: {},
  academicFeesSchoolDetailsRed: {},
  studentProfileAllSection: {},
  academicFeesStuYearPostRed: {},
  academicFeesSetAcademicYearRed: {},
  academicFeesStudentDiscount2Red: {},
  feesDetailsautoSearch: {},
  feesDetailsLastFourRecordsReducer: {},
  listOfPaymentStudentYearPostReducer: {},
  listOfPaymentstudentAllPayBalanceReducer: {},
  studentProfileSearchWithIdReducer: {},
  academicFeesStudentDiscountReducer: {},
  studentPayAutoSearchDataReducer: {},
  studentPayTermsChangeDataActionReducer: {},
};

export const studentReducerGet = (state = initialState, { type, payload }) => {
  switch (type) {
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
    case studentProfileSetAllSection.STUDENT_PROFILE_SET_ALL_SECTION:
      return { ...state, studentProfileAllSection: payload };
    case academicFeesStudentYearPost.ACADEMIC_YEAR_STUDENT_YEAR_POST:
      return { ...state, academicFeesStuYearPostRed: payload };
    case academicFeesSetAcademicYearDataAction.ACADEMIC_FEES_SET_ACADEMIC_YEAR_DATA_ACTION:
      return { ...state, academicFeesSetAcademicYearRed: payload };
    case academicFeesStudentDiscount2.ACADEMIC_FEES_STUDENT_DISCOUNT_2:
      return { ...state, academicFeesStudentDiscount2Red: payload };
    case feesDetailsAutosearch.FEES_AUTOSEARCH:
      return { ...state, feesDetailsautoSearch: payload };
    case feesDetailsLastFourRecord.FEES_DETAILS_LAST_FOUR_RECORDS:
      return { ...state, feesDetailsLastFourRecordsReducer: payload };
    case listOfPaymentStudentYearPost.LIST_OF_PAYMENT_STUDENT_YEAR_POST:
      return { ...state, listOfPaymentStudentYearPostReducer: payload };
    case listOfPaymentstudentAllPayBalance.LIST_OF_PAYMENT_STUDENT_ALL_PAY_BALANCE:
      return { ...state, listOfPaymentstudentAllPayBalanceReducer: payload };
    case studentProfileSearchwithid.STUDENT_PROFILE_SEARCH_WITH_ID: {
      console.log(payload);
      return { ...state, studentProfileSearchWithIdReducer: payload };
    }
    case academicFeesStudentDiscount.ACADEMIC_FEES_STUD_DISCOUNT:
      return { ...state, academicFeesStudentDiscountReducer: payload };
    case studentPayAutoSearchDataAction.STUDENT_PAY_AUTO_SEARCH_DATA_ACTION:
      return { ...state, studentPayAutoSearchDataReducer: payload };
    case studentPayTermsChangeDataAction.STUDENT_PAY_TERMS_CHANGE_DATA:
      return { ...state, studentPayTermsChangeDataActionReducer: payload };
    default:
      return state;
  }
};
