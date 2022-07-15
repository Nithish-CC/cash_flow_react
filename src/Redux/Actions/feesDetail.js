import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";

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
        .catch((err) => console.log(err));
    } catch (error) {}
  };

export const feesDetailsFeeMasterIdData =
  (setFeeMasterId) => async (dispatch) => {
    try {
      getAccessToken();
      axios
        .get(`${baseUrl}feeMaster`)
        .then((res) => {
          setFeeMasterId(res.data.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {}
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
        })
        .catch((err) => console.log(err));
    } catch (error) {}
  };
