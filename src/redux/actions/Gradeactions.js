import { Actiontypes } from "../constants/Actiontypes";
import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";

export const gettinggradesection = () => async (dispatch) => {
  getAccessToken();

  const response = await axios.get(`${baseUrl}gradeSection`);
  response.data.data.map((data, index) => {
    data.index = index + 1;
  }, dispatch({ type: Actiontypes.SET_GRADE, payload: response.data.data }));
};
