import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../index";
import { getAccessToken } from "../../config/getAccessToken";
import { ActionTypes, TransportTypes } from "../constants/action-types";

export const fecthTransportFees = () => async (dispatch) => {
    try {
        getAccessToken();
        const response = await axios.get(`${baseUrl}feeMaster/transport`);
        dispatch({ type: TransportTypes.FETCH_TRANSPORT_FEES, payload: response.data.data });
    } catch (err) {
        alert(err);
    }
};

export const listTransportFees = (year_id, grade_id) => async (dispatch) => {
    try {
        getAccessToken();
        const res = await axios.post(`${baseUrl}transportval`, {
            grade_id: grade_id,
            year_id: year_id,
        });
        res.data.data.map((map) => {
            map.optional_fee = map?.optional_fee === 1 ? true : false;
        });
        dispatch({
            type: TransportTypes.LIST_TRANSPORT_FEES,
            payload: res.data.data,
        });
    } catch (err) {
        alert("Error");
    }
};

export const addTransportFees = (values, fee_amount, fee_master_id, grade_id) => async (dispatch) => {
    try {
        const res = await axios
            .post(`${baseUrl}transportval/create_transport`, values, fee_amount, fee_master_id, grade_id)
            .then((res) => {
                if (res.data.message.includes("Year of Fee already present")) {
                    toast.warning(res.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else if (res.data.message.includes("Year of Fee inserted")) {
                    toast.success("Saved successfully", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch((res) => {
                toast.warning("Enter Correct data", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        dispatch({
            type: TransportTypes.ADD_TRANSPORT_FEES,
            payload: res.data.data,
        });
    } catch (err) {
        alert("Error");
    }
};

export const deleteTransportFees = (fee_master_id) => async (dispatch) => {
    try {
        getAccessToken();
        axios.delete(`${baseUrl}yearOffee/`, { data: { year_of_fees_id: fee_master_id } }).then((res) => {
            if (res.data.data.isDeletable == false) {
                toast.warning("Students exists On Year oF Fee", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.success("Year oF Fee Deleted Successsfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(fecthTransportFees());
            }
        });
    } catch (err) {
        alert("Error");
    }
    dispatch(fecthTransportFees());
};
