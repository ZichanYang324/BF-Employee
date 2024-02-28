import { getUserFromLocalStorage } from "./localStorage";
import axios from "axios";
import Cookies from "js-cookie";

const formDataFetch = axios.create({
  baseURL: "http://localhost:3100",
  headers: {
    "Content-Type": "multipart/form-data"
  },
});

// auto config
formDataFetch.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage();
    if (user) {
      config.headers["Authorization"] = `Bearer ${Cookies.get("token")}`;
      // in the latest version "common" returns undefined
      // config.headers.common['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default formDataFetch;
