import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";
import { toast } from "react-toastify";
import {
  academicFeesDiscountType,
  academicFeesSchoolDetails,
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
  async () => {
    try {
      getAccessToken();
      axios
        .put(`${baseUrl}studentdiscount/${values.student_payment_info_id}`, {
          discount_amount: updateYearOfFee,
          dis_feetype_id: updateDiscountFeeType,
        })
        .then((res) => {
          toast.success("Discount amount is saved successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setEditingYearOfFee({});
          getapi();
        })
        .dispatch({
          type: academicFeesStudentDiscount.ACADEMIC_FEES_STUD_DISCOUNT,
        });
    } catch (error) {}
  };

export const academicYearStudentYearData =
  (id, setAcademic, setAcademicYear, student_id) => async () => {
    getAccessToken();
    axios
      .post(`${baseUrl}studentyear`, {
        student_admissions_id: Number(id),
        student_id: student_id,
      })
      .then((res) => {
        setAcademic(res.data.data);
        setAcademicYear(res.data.data[0].year_id);
      })
      .dispatch({
        type: academicFeesStudentYearPost.ACADEMIC_YEAR_STUDENT_YEAR_POST,
      });
  };

export const academicFeesSetAcademicYearData =
  (id, student_id, setAcademic, setAcademicYear) => async () => {
    getAccessToken();
    axios
      .post(`${baseUrl}studentyear`, {
        student_admissions_id: Number(id),
        student_id: student_id,
      })
      .then((res) => {
        setAcademic(res.data.data);
        setAcademicYear(res.data.data[0].year_id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

export const academicFeesSetFeeMasterIdData = () => async (dispatch) => {
  try {
    getAccessToken();
    const {
      data: { data },
    } = await axios.get(`${baseUrl}feeMaster`);
    dispatch({
      type: academicFeesSetFeeMasterId.ACADEMIC_FEES_SET_FEE_MASTER_ID,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const academicfeesStudentDiscountData2 =
  (id, academicYear, termsmaster, setstudentdiscount, setSpinnerLoad) =>
  async () => {
    getAccessToken();
    axios
      .post(`${baseUrl}studentdiscount`, {
        student_admissions_id: Number(id),
        year_id: Number(academicYear),
        term_name: termsmaster,
      })
      .then((res) => {
        setstudentdiscount(res.data.data);
        setSpinnerLoad(false);
      })
      .dispatch({
        type: academicFeesStudentDiscount2.ACADEMIC_FEES_STUDENT_DISCOUNT_2,
      });
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

export const academicFeesSchoolDetailsData = () => async (dispatch) => {
  try {
    getAccessToken();
    const {
      data: { data },
    } = await axios.get(`${baseUrl}school`);
    dispatch({
      type: academicFeesSchoolDetails.ACADEMIC_FEES_SCHOOL_DETAILS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
