import apiClient from "@/axiosInstance";

export default {
  getMe() {
    return apiClient.get("/api/v1/users/");
  },
  register(data){
    return apiClient.post("/api/v1/users/", data);
  },
  getTokens({email, password}) {
    return apiClient.post("/api/v1/users/auth", { email, password });
  },
  logout() {
    return apiClient.post("/api/v1/users/logout");
  },
};