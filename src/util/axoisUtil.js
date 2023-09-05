import axios from "axios"

const service = axios.create({
  baseURL: "http://localhost:5173/api",
  // baseURL: "http://6884k081i1.yicp.fun:10086/api",
  timeout: 10000,
});

export default service;