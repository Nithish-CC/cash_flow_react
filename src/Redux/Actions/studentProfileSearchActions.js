import axios from "axios";
import {
  ActionTypes,
  studentProfileSetAllSection,
} from "../Constants/action-types";
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

export const studentDetailsPost = (id) => async (dispatch) => {
  try {
    getAccessToken();
    const response = await axios.post(`${baseUrl}studentProfile`, {
      student_admissions_id: Number(id),
    });
    dispatch({
      type: ActionTypes.STUDENT_DETAIL_POST,
      payload: response,
    });
  } catch (error) {
    console.log(error);
  }
};

export const stuProfileSearchSetAllSection =
  (setAllSection) => async (dispatch) => {
    try {
      const {
        data: { data },
      } = await axios.get(`${baseUrl}gradeSection`);
      setAllSection(data);
      dispatch({
        type: studentProfileSetAllSection.STUDENT_PROFILE_SET_ALL_SECTION,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
