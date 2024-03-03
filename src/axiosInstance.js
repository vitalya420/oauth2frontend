import axios from "axios";
import { useTokensStore } from "@/stores/tokensStore";
import { useUserStore } from "@/stores/userStore";
import { API_BASE_URL } from "@/config";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  config => {
    const tokensStore = useTokensStore();
    const accessToken = tokensStore.access;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      const tokensStore = useTokensStore();
      const userStore = useUserStore();
      tokensStore.clear();
      userStore.clear();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
