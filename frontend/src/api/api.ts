import axios from "axios";
import {
  Configuration,
  CheckInApi,
  CloseApi,
  ContactApi,
  AuthApi,
} from "./generated";
import { useCookies } from "react-cookie";

export const Api = () => {
  const [cookie] = useCookies(["jwt-token"]);
  const config = new Configuration({
    basePath: import.meta.env.VITE_BACKEND_URL,
  });

  const axiosInstance = axios.create({
    headers: {
      "ngrok-skip-browser-warning": true,
      Authorization: `Bearer ${cookie["jwt-token"]}`,
    },
  });

  return {
    checkInApi: new CheckInApi(config, "", axiosInstance),
    closeApi: new CloseApi(config, "", axiosInstance),
    contactApi: new ContactApi(config, "", axiosInstance),
    authApi: new AuthApi(config, "", axiosInstance),
  };
};
