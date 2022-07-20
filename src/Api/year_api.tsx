import { getAccessToken } from "../config/getAccessToken"; 
import axios from "axios";
import { baseUrl } from ".."; 

export const getAllAcademicYear  = async() => {
        getAccessToken();
      return await axios.get(`${baseUrl}year`)  
};
