import axios from "axios";
import {
  hostelFeeValues,
  hostelModeOfTransport,
  modeOfTransportTypes,
} from "../Constants/action-types";
import { toast } from "react-toastify";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";

export const modeOfTransports = (props, setShow) => async (dispatch) => {
  try {
    getAccessToken();
    const response = await axios
      .post(`${baseUrl}modeoftransport`, props)
      .then((res) => {
        console.log(res.data.message, "Hostel");
        if (res.data.data.IsExsist === false) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setShow(false);
        } else if (res.data.data.IsExsist === "year") {
          toast.warning(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    dispatch({
      type: modeOfTransportTypes.MODE_OF_TRANSPORT,
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
    dispatch({
      type: hostelModeOfTransport.HOSTAL_MODE_OF_TRANSPORT,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
