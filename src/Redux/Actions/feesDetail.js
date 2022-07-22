import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";
import {
  feesDetailsAutosearch,
  feesDetailsLastFourRecord,
} from "../Constants/action-types";

export const feesDetailsAutosearchData = (status) => async (dispatch) => {
  try {
    getAccessToken();
    const response = await axios.post(`${baseUrl}autosearch`, {
      allbalance: status,
    });
    dispatch({
      type: feesDetailsAutosearch.FEES_AUTOSEARCH,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const feesDetailsLastFourRecordData =
  (status, year) => async (dispatch) => {
    try {
      const response = await axios.post(`${baseUrl}studentAllPayBalance/four`, {
        student_id: status,
        year_id: year,
      });
      dispatch({
        type: feesDetailsLastFourRecord.FEES_DETAILS_LAST_FOUR_RECORDS,
        payload: response.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
