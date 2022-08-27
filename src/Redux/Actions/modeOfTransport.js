import axios from "axios";
import {
  hostelFeeValues,
  hostelModeOfTransport,
  modeOfTransport,
  modeOfTransportTypes,
} from "../Constants/action-types";
import { toast } from "react-toastify";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";

export const modeOfTransports = (props, setShow) => async (dispatch) => {
  try {
    getAccessToken();
    const response = await axios.post(`${baseUrl}modeoftransport`, props);
    if (response.data.data.IsExsist === false) {
      toast.success(response.data.message);
      setShow(false);
    } else if (response.data.data.IsExsist === "year") {
      toast.warning(response.data.message);
    }
    dispatch({
      type: modeOfTransport.MODE_OF_TRANSPORT_DATA,
      payload: response,
    });
  } catch (error) {
    console.log(error);
  }
};

export const hostalFeeValueData = (setHostalFeeValue) => async (dispatch) => {
  try {
    getAccessToken();
    const {
      data: { data },
    } = await axios.get(`${baseUrl}modeoftransport/hostal`, {});
    dispatch({
      type: hostelFeeValues.HOSTAL_FEE_VALUES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const hostalModeOfTransportData = (setBusValue) => async (dispatch) => {
  try {
    getAccessToken();
    const {
      data: { data },
    } = await axios.get(`${baseUrl}modeoftransport`, {});
    setBusValue(data);
    dispatch({
      type: hostelModeOfTransport.HOSTAL_MODE_OF_TRANSPORT,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
