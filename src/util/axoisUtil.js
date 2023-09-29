import axios from "axios"
import configJson from "../config/config.json"
const service = axios.create({
  baseURL: configJson.baseURL+"/api",
  // baseURL: "http://6884k081i1.yicp.fun:10086/api",
  timeout: 10000,
});

export default service;