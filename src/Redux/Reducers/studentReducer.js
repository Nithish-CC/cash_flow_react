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
  studentProfileData: {},
  hostalFee: {},
  modeofTransport: {},
  academicfees_Feemaster: {},
  academicfees_Discountfee: {},
  studentPay_Feemaster: {},
  schoolDetails: {},
  gradeSections: {},
  academicFees_Studentyear: {},
  academicFeesSetAcademicYearRed: {},
  academicFees_StudentDiscount: {},
  feesDetails_AutoSearch: {},
  feesDetails_four_api: {},
  listOfPayment_StudentYear: {},
  student_pay_balance: {},
  studentProfile_WithId: {},
  StudentDiscount_WithId: {},
  studentPay_AutoSearch: {},
  studentPay_TermsChange: {},
};

export const studentReducerGet = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.STUDENT_DETAIL_POST:
      return { ...state, studentProfileData: payload };
    case hostelFeeValues.HOSTAL_FEE_VALUES:
      return { ...state, hostalFee: payload };
    case hostelModeOfTransport.HOSTAL_MODE_OF_TRANSPORT:
      return { ...state, modeofTransport: payload };
    case academicFeesSetFeeMasterId.ACADEMIC_FEES_SET_FEE_MASTER_ID:
      return { ...state, academicfees_Feemaster: payload };
    case academicFeesDiscountType.ACADEMIC_FEES_DISCOUNT_TYPE:
      return { ...state, academicfees_Discountfee: payload };
    case studentPayFeemaster.STUDENT_PAY_FEEMASTER:
      return { ...state, studentPay_Feemaster: payload };
    case academicFeesSchoolDetails.ACADEMIC_FEES_SCHOOL_DETAILS:
      return { ...state, schoolDetails: payload };
    case studentProfileSetAllSection.STUDENT_PROFILE_SET_ALL_SECTION:
      return { ...state, gradeSections: payload };
    case academicFeesStudentYearPost.ACADEMIC_YEAR_STUDENT_YEAR_POST:
      return { ...state, academicFees_Studentyear: payload };
    case academicFeesSetAcademicYearDataAction.ACADEMIC_FEES_SET_ACADEMIC_YEAR_DATA_ACTION:
      return { ...state, academicFeesSetAcademicYearRed: payload };
    case academicFeesStudentDiscount2.ACADEMIC_FEES_STUDENT_DISCOUNT_2:
      return { ...state, academicFees_StudentDiscount: payload };
    case feesDetailsAutosearch.FEES_AUTOSEARCH:
      return { ...state, feesDetails_AutoSearch: payload };
    case feesDetailsLastFourRecord.FEES_DETAILS_LAST_FOUR_RECORDS:
      return { ...state, feesDetails_four_api: payload };
    case listOfPaymentStudentYearPost.LIST_OF_PAYMENT_STUDENT_YEAR_POST:
      return { ...state, listOfPayment_StudentYear: payload };
    case listOfPaymentstudentAllPayBalance.LIST_OF_PAYMENT_STUDENT_ALL_PAY_BALANCE:
      return { ...state, student_pay_balance: payload };
    case studentProfileSearchwithid.STUDENT_PROFILE_SEARCH_WITH_ID:
      return { ...state, studentProfile_WithId: payload };
    case academicFeesStudentDiscount.ACADEMIC_FEES_STUD_DISCOUNT:
      return { ...state, StudentDiscount_WithId: payload };
    case studentPayAutoSearchDataAction.STUDENT_PAY_AUTO_SEARCH_DATA_ACTION:
      return { ...state, studentPay_AutoSearch: payload };
    case studentPayTermsChangeDataAction.STUDENT_PAY_TERMS_CHANGE_DATA:
      return { ...state, studentPay_TermsChange: payload };
    default:
      return state;
  }
};
