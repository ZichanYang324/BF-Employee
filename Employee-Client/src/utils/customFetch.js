import axios from "axios";
import Cookies from "js-cookie";

const customFetch = axios.create({
  baseURL: "http://localhost:3100",
  headers: {
    "Accept": "application/json",
    "Cache-Control": "no-cache",
  },
});

export const customFetch2 = axios.create({
  baseURL: "http://localhost:3100",
  headers: {
    "Cache-Control": "no-cache",
  },
});

export const customFetchForForm = axios.create({
  baseURL: "http://localhost:3100",
  headers: {
    "Accept":"multipart/form-data",
    "Cache-Control": "no-cache",
  },
});

// auto config
customFetch.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${Cookies.get("token")}`;
      // in the latest version "common" returns undefined
      // config.headers.common['Authorization'] = `Bearer ${user.token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
customFetch2.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${Cookies.get("token")}`;
      // in the latest version "common" returns undefined
      // config.headers.common['Authorization'] = `Bearer ${user.token}`;
      return config;
    },
  (error) => {
    return Promise.reject(error);
  },
);

customFetchForForm.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${Cookies.get("token")}`;
      // in the latest version "common" returns undefined
      // config.headers.common['Authorization'] = `Bearer ${user.token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default customFetch;
