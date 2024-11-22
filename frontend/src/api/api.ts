import { Configuration, CheckInApi, CloseApi } from "./generated";

const config = new Configuration({
  basePath: import.meta.env.VITE_BACKEND_URL,
});

export const checkInApi = new CheckInApi(config);

export const closeApi = new CloseApi(config)
