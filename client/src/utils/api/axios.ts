import axios from "axios";

export const myAxios = axios.create({
  baseURL: "http://localhost:9000/api/",
  timeout: 3000,
  timeoutErrorMessage: "Server could not be reached",
  signal: AbortSignal.timeout(3000),
  headers: {
    "Content-Type": "application/json",
  },
});
