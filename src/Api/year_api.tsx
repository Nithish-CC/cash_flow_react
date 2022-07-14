import { getAccessToken } from "../config/getAccessToken";
import axios from "axios";
import {baseUrl} from "../index"

export const getAllAcademicYear  = async() => {
        getAccessToken();
      return await axios.get(`${baseUrl}year`)  
};
