import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";
import {
  listOfPaymentstudentAllPayBalance,
  listOfPaymentStudentYearPost,
} from "../Constants/action-types";

export const listOfPaymentStudentYearPostData = (id) => async (dispatch) => {
  try {
    getAccessToken();
    const response = await axios.post(`${baseUrl}studentyear`, {
      student_id: id,
    });
    dispatch({
      type: listOfPaymentStudentYearPost.LIST_OF_PAYMENT_STUDENT_YEAR_POST,
      payload: response,
    });
  } catch (error) {
    console.log(error);
  }
};

export const listOfPaymentstudentAllPayBalanceData =
  (id, academicYearId) => async (dispatch) => {
    try {
      getAccessToken();
      const response = await axios.post(`${baseUrl}studentAllPayBalance`, {
        student_id: id,
        year_id: academicYearId,
      });
      dispatch({
        type: listOfPaymentstudentAllPayBalance.LIST_OF_PAYMENT_STUDENT_ALL_PAY_BALANCE,
        payload: response,
      });
    } catch (error) {
      console.log(error);
    }
  };
