import axios from "axios";

const axiosDB = axios.create({
    baseURL: 'http://localhost:8081/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

export default axiosDB;