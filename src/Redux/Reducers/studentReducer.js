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
  modeOfTransport,
  studentPayAutoSearchDataAction,
  studentPayFeemaster,
  studentPayTermsChangeDataAction,
  studentProfileSearchwithid,
  studentProfileSetAllSection,
} from "../Constants/action-types";

const initialState = {
  studentProfile: {},
  hostalFee: {},
  studentFacilities_hostel: {},
  modeOfTransportData: {},
  feesDetails_SetFeeMasterId: {},
  academicFees_DiscountType: {},
  studentPay_feeMaster: {},
  academicFees_SchoolDetails: {},
  studentProfile_gradeSection: {},
  academicFees_studentYear: {},
  academicFeesSetAcademicYearRed: {},
  academicFees_studentDiscount: {},
  feesDetails_autoSearch: {},
  feesDetails_lastFourRecords: {},
  listOfPayment_StudentYearPost: {},
  listOfPayment_studentAllPayBalance: {},
  studentProfileSearch_edit: {},
  academicFees_studentDiscount_edit: {},
  studentPay_AutosearchData: {},
  studentPay_paymentapi: {},
};

export const studentReducerGet = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.STUDENT_DETAIL_POST:
      return { ...state, studentProfile: payload };
    case hostelFeeValues.HOSTAL_FEE_VALUES:
      return { ...state, hostalFee: payload };
    case hostelModeOfTransport.HOSTAL_MODE_OF_TRANSPORT:
      return { ...state, studentFacilities_hostel: payload };
    case modeOfTransport.MODE_OF_TRANSPORT_DATA:
      return { ...state, modeOfTransportData: payload };
    case academicFeesSetFeeMasterId.ACADEMIC_FEES_SET_FEE_MASTER_ID:
      return { ...state, feesDetails_SetFeeMasterId: payload };
    case academicFeesDiscountType.ACADEMIC_FEES_DISCOUNT_TYPE:
      return { ...state, academicFees_DiscountType: payload };
    case studentPayFeemaster.STUDENT_PAY_FEEMASTER:
      return { ...state, studentPay_feeMaster: payload };
    case academicFeesSchoolDetails.ACADEMIC_FEES_SCHOOL_DETAILS:
      return { ...state, academicFees_SchoolDetails: payload };
    case studentProfileSetAllSection.STUDENT_PROFILE_SET_ALL_SECTION:
      return { ...state, studentProfile_gradeSection: payload };
    case academicFeesStudentYearPost.ACADEMIC_YEAR_STUDENT_YEAR_POST:
      return { ...state, academicFees_studentYear: payload };
    case academicFeesSetAcademicYearDataAction.ACADEMIC_FEES_SET_ACADEMIC_YEAR_DATA_ACTION:
      return { ...state, academicFeesSetAcademicYearRed: payload };
    case academicFeesStudentDiscount2.ACADEMIC_FEES_STUDENT_DISCOUNT_2:
      return { ...state, academicFees_studentDiscount: payload };
    case feesDetailsAutosearch.FEES_AUTOSEARCH:
      return { ...state, feesDetails_autoSearch: payload };
    case feesDetailsLastFourRecord.FEES_DETAILS_LAST_FOUR_RECORDS:
      return { ...state, feesDetails_lastFourRecords: payload };
    case listOfPaymentStudentYearPost.LIST_OF_PAYMENT_STUDENT_YEAR_POST:
      return { ...state, listOfPayment_StudentYearPost: payload };
    case listOfPaymentstudentAllPayBalance.LIST_OF_PAYMENT_STUDENT_ALL_PAY_BALANCE:
      return { ...state, listOfPayment_studentAllPayBalance: payload };
    case studentProfileSearchwithid.STUDENT_PROFILE_SEARCH_WITH_ID:
      return { ...state, studentProfileSearch_edit: payload };
    case academicFeesStudentDiscount.ACADEMIC_FEES_STUD_DISCOUNT:
      return { ...state, academicFees_studentDiscount_edit: payload };
    case studentPayAutoSearchDataAction.STUDENT_PAY_AUTO_SEARCH_DATA_ACTION:
      return { ...state, studentPay_AutosearchData: payload };
    case studentPayTermsChangeDataAction.STUDENT_PAY_TERMS_CHANGE_DATA:
      return { ...state, studentPay_paymentapi: payload };
    default:
      return state;
  }
};
