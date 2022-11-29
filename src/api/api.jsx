import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-44-212-35-10.compute-1.amazonaws.com",
  // baseURL: "http://127.0.0.1:8000",
});

export default api;
