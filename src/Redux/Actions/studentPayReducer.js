import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";
import { studentPayFeemaster } from "../Constants/action-types";

export const studentPayAutosearchData =
  (searchBy, academicYear, setMainSearch, setadmissionsid, termsChange) =>
  async () => {
    try {
      axios
        .post(`${baseUrl}autoSearch`, {
          searchby: searchBy,
          academic_year: academicYear,
        })
        .then((response) => {
          setMainSearch(response.data.data);
          setadmissionsid(response.data.data[0][0]);
          termsChange(response.data.data[0][1][1].studentData, "term1");
        });
    } catch (error) {
      console.log(error);
    }
  };

export const studentPayFeemasterData = (setfeemasterid) => async (dispatch) => {
  try {
    getAccessToken();
    const {
      data: { data },
    } = await axios.get(`${baseUrl}feeMaster`);
    console.log(data);
    dispatch({
      type: studentPayFeemaster.STUDENT_PAY_FEEMASTER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentPayTermsChangeData =
  (student, terms, setPayment) => async () => {
    try {
      axios
        .post(`${baseUrl}payment`, {
          student_id: student.student_id,
          year_id: student.year_id,
          term_name: terms,
        })
        .then((response) => {
          setPayment(response.data.data);
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
          toast.success("Payment Success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          windowReload();
        })
        .catch((err) => {
          setButtonDisable(false);
          toast.warning("something went wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
          toast.success("Payment Success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          windowReload();
        })
        .catch((err) => {
          setButtonDisable(false);
          toast.warning("something went wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
          toast.success("Refund  Success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          windowReload();
        })
        .catch((err) => {
          setButtonDisable(false);
          toast.warning("something went wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } catch (error) {}
  };
