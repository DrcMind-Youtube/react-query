import axios from "axios";

const axiosGlobal = axios.create({
  baseURL: "http://localhost:3000",
});

export default axiosGlobal;
