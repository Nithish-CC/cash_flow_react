import axios from "axios";
import { ActionTypes } from "../Constants/action-types";
import { baseUrl } from "../../index";
import { getAccessToken } from "../../config/getAccessToken";

export const studentDetailsGet = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseUrl}gradeSection`);
    console.log(data);
    dispatch({
      type: ActionTypes.STUDENT_DETAIL_GET,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentDetailsPost = (id) => async (dispatch) => {
  try {
    getAccessToken();
    const response = await axios.post(`${baseUrl}studentProfile`, {
      student_admissions_id: Number(id),
    });
    dispatch({
      type: ActionTypes.STUDENT_DETAIL_POST,
      payload: response.data.data,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
