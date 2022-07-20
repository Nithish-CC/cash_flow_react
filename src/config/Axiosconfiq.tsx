import axios from 'axios'


axios.defaults.baseURL = 'http://3.7.52.189:4000/api/v1/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.common['x-mothership-key'] = 'AUTH TOKEN';


// "http://13.235.9.208:4000/api/v1/"
axios.interceptors.request.use(request => {
    return request;
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
})
