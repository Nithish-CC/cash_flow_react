import axios from "axios";
import { ActionTypes } from "../Constants/action-types";
import { baseUrl } from "../../index";
import { getAccessToken } from "../../config/getAccessToken";

export const studentDetailsGet = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await axios.get(`${baseUrl}gradeSection`);
    dispatch({
      type: ActionTypes.STUDENT_DETAIL_GET,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentDetailsPost =
  (id, setStatusStudentDetails, setStatusStudentDetailsData) => async () => {
    try {
      getAccessToken();
      axios
        .post(`${baseUrl}studentProfile`, { student_admissions_id: Number(id) })
        .then((response) => {
          setStatusStudentDetails(response.data.data[0]);
          setStatusStudentDetailsData(response.data.data[0].grade_id);
        });
    } catch (error) {
      console.log(error);
    }
  };
