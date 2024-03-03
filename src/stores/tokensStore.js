import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useTokensStore = defineStore('tokens',{
  state: () => ({
      accessToken: useStorage('token.access', null),
      refreshToken: useStorage('token.refresh', null),
  }),

  getters: {
    access(state){
      return state.accessToken;
    },
  },

  actions: {
    setAccess(token){
      this.accessToken = token;
    },
    set({access, refresh}){
      this.accessToken = access;
      this.refreshToken = refresh;
    },
    clear(){
        this.accessToken = null;
        this.refreshToken = null;
    },
  }
});