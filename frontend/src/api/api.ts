import axios from "axios";
/* 
export class API {
  static createInstance() {
    const instance = axios.create({
      baseURL: "http://localhost:10102",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 2000,
    });
    return instance;
  }

  static async get(path: string) {
    const instance = this.createInstance();
    return await instance.get(path)
    .then((res) => {return res.data})
    .catch((err) => {return Promise.reject(err)});
  }
  
  static async post(path: string, data?: object) {
    const instance = this.createInstance();
    return await instance.post(path, data)
    .then((res) => {return res.data})
    .catch((err) => {return Promise.reject(err)});
  }
}
 */

import { Configuration, CheckInApi } from "./generated";

const config = new Configuration({
  basePath: import.meta.env.VITE_BACKEND_URL,
});

export const checkInApi = new CheckInApi(config);
