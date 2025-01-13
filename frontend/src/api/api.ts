import axios from "axios";
import { Configuration, CheckInApi, CloseApi } from "./generated";

const config = new Configuration({
  basePath: import.meta.env.VITE_BACKEND_URL,
});

const axiosInstance = axios.create({
  headers: {
    'ngrok-skip-browser-warning': true
  }
});

export const checkInApi = new CheckInApi(config, '', axiosInstance);

export const closeApi = new CloseApi(config, '', axiosInstance)
