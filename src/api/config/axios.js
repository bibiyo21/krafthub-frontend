import axios from "axios";
import requestInterceptor from "./interceptor.request";
import responseInterceptor from "./interceptor.response";

let baseURL = `https://krafthub-api.herokuapp.com/`
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  baseURL = `http://localhost:8888/`;
}

// replace bearer here
// for testing only
export const axiosInstance = axios.create({
  baseURL: baseURL
});

// insert JWT token
axiosInstance.interceptors.request.use(requestInterceptor, (error) => {
  return Promise.reject(error);
}); 

// catch other errors (expired API) then resend API request
axiosInstance.interceptors.response.use(responseInterceptor, (error) => {
  return Promise.reject(error);
});
