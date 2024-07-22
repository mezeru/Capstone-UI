import axios from "axios";

const axiosDB = axios.create({
    baseURL: 'http://localhost:8081/api',
    timeout: 1000
  });

export default axiosDB;