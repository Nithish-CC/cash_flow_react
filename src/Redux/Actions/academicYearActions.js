import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";
import { toast } from "react-toastify";
import {
  academicFeesStudentDiscount,
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
  (id, setAcademic, setAcademicYear, student_id) => async (dispatch) => {
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
