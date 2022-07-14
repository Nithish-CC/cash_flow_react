import { Grademastertypes } from "../constants/Actiontypes";
import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";

export const settinggradesection = () => async (dispatch) => {
  getAccessToken();

  const grades = await axios.get(`${baseUrl}grademaster`);

  dispatch({
    type: Grademastertypes.SET_GRADE_TYPES,
    payload: grades.data.data,
  });
  console.log(grades);
};
