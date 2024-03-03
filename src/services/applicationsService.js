import apiClient from "@/axiosInstance";


export default {
  createApplication(data) {
    return apiClient.post("/api/v1/applications/", data);
  },
  getUserApplications(page, page_size) {
    return apiClient.get(`/api/v1/applications/?page=${page}&page_size=${page_size}`);
  },
  deleteApplication(id) {
    return apiClient.delete(`/api/v1/applications/${id}`);
  },
};