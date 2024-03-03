import { defineStore} from "pinia";
import applicationsService from "@/services/applicationsService.js";

export const useApplicationStore = defineStore('applications', {
  state: () => ({
    page: 1,
    page_size: 2,
    total: 0,
    applications: [],
  }),

  getters: {
    getApplications(state){
      return state.applications;
    },
    getById(state){
      return (appId) => state.applications.find((app) => app.id === appId);
    },
  },

  actions: {
    async createApplication({name, redirect_uri}){
      await applicationsService.createApplication({name, redirect_uri});
    },
    async updateIfNeeded(data){
      console.log('update', data);
    },
    async fetchApplications(page = this.page, page_size = this.page_size){
      const paginated_response = await applicationsService.getUserApplications(page, page_size);
      this.fromApiResponse(paginated_response.data);
    },
    fromApiResponse({page, page_size, total, applications}){
      this.page = page;
      this.page_size = page_size;
      this.total = total;
      this.applications = applications;
    },
    async deleteApplication(app_id){
      await applicationsService.deleteApplication(app_id);
    },
    async deleteAndUpdate(app_id){
      await this.deleteApplication(app_id);
      await this.fetchApplications(this.page);
    },
  }
});