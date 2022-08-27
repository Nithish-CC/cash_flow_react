import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../../index";
import { Grademastertypes } from "../constants/action-types";

export const settinggradesection = () => async (dispatch) => {
    getAccessToken();

    const grades = await axios.get(`${baseUrl}grademaster`);

    dispatch({
        type: Grademastertypes.SET_GRADE_TYPES,
        payload: grades.data.data,
    });
};
