import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";
import { ActionTypes } from "../constants/action-types";

export const feemasteractions = () => async (dispatch) => {
  try {
    getAccessToken();
    const feemaster = await axios.get(`${baseUrl}feeMaster`);

    dispatch({ type: ActionTypes.SET_FEEMASTER_TYPES, payload: feemaster.data.data });
  } catch (err) {
    alert(err);
  }
};
