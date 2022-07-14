import axios from "axios";
import { modeOfTransportTypes } from "../Constants/action-types";
import { ToastContainer, toast } from "react-toastify";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";
import { useState } from "react";

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
          console.log(response);
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
