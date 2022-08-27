import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";
import {
  studentPayAutoSearchDataAction,
  studentPayFeemaster,
  studentPayTermsChangeDataAction,
} from "../Constants/action-types";

export const studentPayAutosearchData =
  (searchBy, academicYear, setMainSearch, setadmissionsid, termsChange) =>
  async (dispatch) => {
    try {
      const response = await axios
        .post(`${baseUrl}autoSearch`, {
          searchby: searchBy,
          academic_year: academicYear,
        })
        .then((response) => {
          setMainSearch(response.data.data);
          setadmissionsid(response.data.data[0][0]);
          termsChange(response.data.data[0][1][1].studentData, "term1");
        });
      dispatch({
        type: studentPayAutoSearchDataAction.STUDENT_PAY_AUTO_SEARCH_DATA_ACTION,
        payload: response,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const studentPayFeemasterData = () => async (dispatch) => {
  try {
    getAccessToken();
    const {
      data: { data },
    } = await axios.get(`${baseUrl}feeMaster`);
    dispatch({
      type: studentPayFeemaster.STUDENT_PAY_FEEMASTER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentPayTermsChangeData =
  (student, terms) => async (dispatch) => {
    try {
      const response = await axios.post(`${baseUrl}payment`, {
        student_id: student.student_id,
        year_id: student.year_id,
        term_name: terms,
      });
      dispatch({
        type: studentPayTermsChangeDataAction.STUDENT_PAY_TERMS_CHANGE_DATA,
        payload: response,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const studentPayHandleBalanceData =
  (FeetempArr, toast, windowReload, setButtonDisable) => async () => {
    try {
      getAccessToken();
      axios
        .put(`${baseUrl}updateStudentBalance`, {
          data: FeetempArr,
        })
        .then((response) => {
          toast.success("Payment Success");
          windowReload();
        })
        .catch((err) => {
          setButtonDisable(false);
          toast.warning("something went wrong");
        });
    } catch (error) {
      console.log(error);
    }
  };

export const studentPayUpdateStudentBalanceData =
  (FeetempArr, toast, windowReload, setButtonDisable) => async () => {
    try {
      getAccessToken();
      axios
        .put(`${baseUrl}updateStudentBalance`, {
          data: FeetempArr,
        })
        .then((response) => {
          toast.success("Payment Success");
          windowReload();
        })
        .catch((err) => {
          setButtonDisable(false);
          toast.warning("something went wrong");
        });
    } catch (error) {
      console.log(error);
    }
  };

export const studentPayUpdateStudentBalanceData2 =
  (FeetempArr, toast, windowReload, setButtonDisable) => async () => {
    try {
      getAccessToken();
      axios
        .put(`${baseUrl}updateStudentBalance`, {
          data: FeetempArr,
        })
        .then((response) => {
          toast.success("Refund  Success");
          windowReload();
        })
        .catch((err) => {
          setButtonDisable(false);
          toast.warning("something went wrong");
        });
    } catch (error) {
      console.log(error);
    }
  };
