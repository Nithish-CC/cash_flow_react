import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";
import {
  feesDetailsAutosearch,
  feesDetailsLastFourRecord,
} from "../Constants/action-types";

export const feesDetailsAutosearchData =
  (status, setYearOfBalanceByYearOnly) => async (dispatch) => {
    try {
      getAccessToken();
      axios
        .post(`${baseUrl}autosearch`, {
          allbalance: status,
        })
        .then((res) => {
          setYearOfBalanceByYearOnly(res.data);
        })
        .dispatch({
          type: feesDetailsAutosearch.FEES_AUTOSEARCH,
        });
    } catch (error) {
      console.log(error);
    }
  };

export const feesDetailsLastFourRecordData =
  (status, year, setLastFourRecord) => async (dispatch) => {
    try {
      axios
        .post(`${baseUrl}studentAllPayBalance/four`, {
          student_id: status,
          year_id: year,
        })
        .then((res) => {
          setLastFourRecord(res.data.data);
        });
      dispatch({
        type: feesDetailsLastFourRecord.FEES_DETAILS_LAST_FOUR_RECORDS,
      });
    } catch (error) {
      console.log(error);
    }
  };
