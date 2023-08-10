import axios from "axios";

export const myAxios = axios.create({
  baseURL: "http://localhost:9000/api/",
  signal: AbortSignal.timeout(3000),
  headers: {
    "Content-Type": "application/json",
  },
});
