import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";
import { toast } from "react-toastify";
import {
  academicFeesDiscountType,
  academicFeesSchoolDetails,
  academicFeesSetAcademicYearDataAction,
  academicFeesSetFeeMasterId,
  academicFeesStudentDiscount,
  academicFeesStudentDiscount2,
  academicFeesStudentYearPost,
} from "../Constants/action-types";

export const academicFeesStudentDiscountData =
  (
    updateYearOfFee,
    updateDiscountFeeType,
    values,
    setEditingYearOfFee,
    getapi
  ) =>
  async (dispatch) => {
    try {
      getAccessToken();
      const response = await axios
        .put(`${baseUrl}studentdiscount/${values.student_payment_info_id}`, {
          discount_amount: updateYearOfFee,
          dis_feetype_id: updateDiscountFeeType,
        })
        .then((res) => {
          toast.success("Discount amount is saved successfully");
          setEditingYearOfFee({});
          getapi();
          dispatch({
            type: academicFeesStudentDiscount.ACADEMIC_FEES_STUD_DISCOUNT,
            payload: res,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

export const academicYearStudentYearData =
  (id, student_id) => async (dispatch) => {
    try {
      getAccessToken();
      const response = await axios.post(`${baseUrl}studentyear`, {
        student_admissions_id: Number(id),
        student_id: student_id,
      });
      dispatch({
        type: academicFeesStudentYearPost.ACADEMIC_YEAR_STUDENT_YEAR_POST,
        payload: response,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const academicFeesSetAcademicYearData =
  (id, student_id, setAcademic, setAcademicYear) => async (dispatch) => {
    try {
      getAccessToken();
      const response = axios
        .post(`${baseUrl}studentyear`, {
          student_admissions_id: Number(id),
          student_id: student_id,
        })
        .then((res) => {
          setAcademic(res.data.data);
          setAcademicYear(res.data.data[0].year_id);
          dispatch({
            type: academicFeesSetAcademicYearDataAction.ACADEMIC_FEES_SET_ACADEMIC_YEAR_DATA_ACTION,
            payload: res,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

export const academicFeesSetFeeMasterIdData =
  (setfeemasterid) => async (dispatch) => {
    try {
      getAccessToken();
      const {
        data: { data },
      } = await axios.get(`${baseUrl}feeMaster`);

      dispatch({
        type: academicFeesSetFeeMasterId.ACADEMIC_FEES_SET_FEE_MASTER_ID,
        payload: data,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

export const academicfeesStudentDiscountData2 =
  (id, academicYear, termsmaster) => async (dispatch) => {
    try {
      getAccessToken();
      const response = await axios.post(`${baseUrl}studentdiscount`, {
        student_admissions_id: Number(id),
        year_id: Number(academicYear),
        term_name: termsmaster,
      });
      console.log(response);
      dispatch({
        type: academicFeesStudentDiscount2.ACADEMIC_FEES_STUDENT_DISCOUNT_2,
        payload: response,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const academicFeesDiscountTypeData = () => async (dispatch) => {
  try {
    getAccessToken();
    const {
      data: { data },
    } = await axios.get(`${baseUrl}discountfee`);
    dispatch({
      type: academicFeesDiscountType.ACADEMIC_FEES_DISCOUNT_TYPE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const academicFeesSchoolDetailsData =
  (setGotSchoolDetails) => async (dispatch) => {
    try {
      getAccessToken();
      const {
        data: { data },
      } = await axios.get(`${baseUrl}school`);
      setGotSchoolDetails(data);
      dispatch({
        type: academicFeesSchoolDetails.ACADEMIC_FEES_SCHOOL_DETAILS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
