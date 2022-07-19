import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";

export const listOfPaymentStudentYearPostData =
  (id, setAcademicyear, setAcademicYearId) => async () => {
    try {
      getAccessToken();
      axios
        .post(`${baseUrl}studentyear`, { student_id: id })
        .then((response) => {
          setAcademicyear(response.data.data);
          setAcademicYearId(response.data.data[0].year_id);
        });
    } catch (error) {
      console.log(error);
    }
  };

export const listOfPaymentstudentAllPayBalanceData =
  (id, academicYearId, setPayments) => async () => {
    try {
      getAccessToken();
      axios
        .post(`${baseUrl}studentAllPayBalance`, {
          student_id: id,
          year_id: academicYearId,
        })
        .then((res) => {
          setPayments(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
