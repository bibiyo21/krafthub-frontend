import axios from "axios";
import requestInterceptor from "./interceptor.request";
import responseInterceptor from "./interceptor.response";

// replace bearer here
// for testing only
export const axiosInstance = axios.create({
  baseURL: `https://krafthub.herokuapp.com/`,
});

// insert JWT token
axiosInstance.interceptors.request.use(requestInterceptor, (error) => {
  return Promise.reject(error);
}); 

// catch other errors (expired API) then resend API request
axiosInstance.interceptors.response.use(responseInterceptor, (error) => {
  return Promise.reject(error);
});
