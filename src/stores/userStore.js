import { defineStore } from "pinia";
import userService from "@/services/userService.js";
import { useTokensStore } from "@/stores/tokensStore.js";

export const useUserStore = defineStore('user', {
  state: () => ({
    authorized: false,
    user: null,
    initialized: false,
  }),

  getters: {
    userData(state){
      return state.user;
    },
    isAuthorized(state){
      return state.authorized;
    },
    formatted(state){
      return `${state.user.first_name} ${state.user.last_name || ''}`;
    }
  },
  actions: {
    async initialize(){
      try{
        const tokensStore = useTokensStore();
        if (!tokensStore.access){
          this.initialized = true;
          return;
        }
        const userResponse = await userService.getMe();
        this.setUser(userResponse.data);
      }catch (e) {
        this.initialized = true;
        throw e;
      }
    },
    async login({ email, password }){
      const tokensStore = useTokensStore();
      const response = await userService.getTokens({ email, password});
      tokensStore.set(response.data);
      const userResponse = await userService.getMe();
      this.setUser(userResponse.data);
    },
    async logout(){
      const tokenStore = useTokensStore();
      tokenStore.clear();
      this.clear();
    },
    async register(data){
      await userService.register(data);
      await this.login({email: data.email, password: data.password});
    },
    setUser(user){
      this.user = user;
      this.authorized = true;
    },
    clear(){
      this.user = null;
      this.authorized = false;
    }
  }
});