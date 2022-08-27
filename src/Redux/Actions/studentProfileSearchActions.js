import axios from "axios";
import {
  ActionTypes,
  studentProfileSearchwithid,
  studentProfileSetAllSection,
} from "../Constants/action-types";
import { baseUrl } from "../../index";
import { getAccessToken } from "../../config/getAccessToken";
import { toast } from "react-toastify";

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
      dispatch({
        type: studentProfileSetAllSection.STUDENT_PROFILE_SET_ALL_SECTION,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const studentProfileSearchWithIdData =
  (id, studentProfileParameters) => async (dispatch) => {
    try {
      const response = await axios
        .put(`${baseUrl}studentProfile/${id}`, studentProfileParameters)
        .then((res) => {
          if (res.data.status === true) {
            toast.success("Student Details Updated");
            dispatch(studentDetailsPost(id));
          }
          dispatch({
            type: studentProfileSearchwithid.STUDENT_PROFILE_SEARCH_WITH_ID,
            payload: res,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
