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

export const addTransportFees = (values) => async (dispatch) => {
    try {
        const res = await axios.post(`${baseUrl}transportval/create_transport`, values);

        if (res.data.message.includes("Transport fee already present")) {
            toast.warning(res.data.message);
        } else if (res.data.message.includes("Transport fee inserted")) {
            toast.success("Saved successfully");
        }
        dispatch({
            type: TransportTypes.ADD_TRANSPORT_FEES,
            payload: res.data.data,
        });
    } catch (err) {
        toast.warning("Enter Correct datassss");
    }
};

export const deleteTransportFees = (fee_master_id, frontSearchYear, frontSearchGrade) => async (dispatch) => {
    try {
        getAccessToken();
        console.log(fee_master_id);
        axios.delete(`${baseUrl}yearOffee/`, { data: { year_of_fees_id: fee_master_id.term.year_of_fees_id } }).then((res) => {
            if (res.data.data.isDeletable === false) {
                toast.warning("Students exists On Year oF Fee");
            } else {
                toast.success("Year oF Fee Deleted Successsfully");
                dispatch({ type: TransportTypes.DELETE_TRANSPORT_FEES, payload: fee_master_id.index });
            }
        });
    } catch (err) {
        alert(err);
    }
};
export const setactiontransportfees = (grade, year, master) => async (dispatch) => {
    try {
        master &&
            master?.length &&
            master.map((value) => {
                //index
                year &&
                    year?.length &&
                    year.map((years) => {
                        if (years.year_id === value.academic_year_id) value.academic_year = years.academic_year;
                    });
                grade &&
                    grade?.length &&
                    grade.map((grades) => {
                        if (grades.grade_section_id === value.grade_master_id) value.grade_master_id = grades.grade_master_id;
                    });
            });
        dispatch({ type: TransportTypes.SET_ACTION_TRANSPORT_FEES, payload: master });
    } catch (err) {
        alert(err);
    }
};
