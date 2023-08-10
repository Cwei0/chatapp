import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const API_URL = BASE_URL;

export const useAxiosWithInterceptor = (): AxiosInstance => {
  const navigate = useNavigate();
  const jwtAxios = axios.create({
    baseURL: API_URL,
    signal: AbortSignal.timeout(3000),
    headers: {
      "Content-Type": "application/json",
    },
  });

  jwtAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      // const originalRequest = error.config;
      if (error.response?.status === 403) {
        const goRoot = () => navigate("/test");
        goRoot();
      }
      throw error;
    }
  );
  return jwtAxios;
};
