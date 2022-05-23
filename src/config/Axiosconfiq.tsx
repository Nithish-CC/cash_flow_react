import axios from "axios";

axios.defaults.baseURL = "http://3.110.131.173:4000/api/v1/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.common["x-mothership-key"] = "AUTH TOKEN";


axios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
