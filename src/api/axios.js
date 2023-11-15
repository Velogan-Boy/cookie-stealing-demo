import axios from 'axios';

const url = "https://cookie-stealing-demo-api.onrender.com/api/v1"

const api = axios.create({
   baseURL: url,
});

export default api;
