<template>
  <div>
    <div v-if="user.isAuthorized">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title text-center mb-3">
            You are authorized as {{ user.formatted }}
          </h3>
          <div class="d-flex justify-content-center">
            <button class="btn btn-danger" @click="user.logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  <LoadingOverlay v-else :is-visible="isLoading">
      <div class="card">
        <form class="card-body p-3" @submit.prevent="submit">
          <h3 class="card-title mb-3">Sign In</h3>
          <div v-if="showSessionExpired" class="alert alert-danger" role="alert">
            Your session expired
          </div>
          <div class="form-group mb-3">
            <input type="email"
                   placeholder="Email"
                   class="form-control"
                   v-model="form.email"
                  :class="{'is-invalid': errors.email}">
            <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
          </div>
          <div class="form-group mb-1">
            <input type="password"
                   placeholder="Password"
                   class="form-control"
                   v-model="form.password"
                   autocomplete="on"
                   :class="{'is-invalid': errors.password}">
            <div class="invalid-feedback" v-if="errors.password">{{ errors.password }}</div>
          </div>
          <div class="form-group mb-2">
            <button type="button" class="btn btn-link btn-sm text-decoration-none p-0" @click="resetPassword">Forgot password?</button>
          </div>
          <div class="form-group mb-3">
            <button class="btn btn-primary btn-sm">Sign In</button>
          </div>
        </form>
      </div>
    </LoadingOverlay>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore.js";
import LoadingOverlay from "@/components/LoadingOverlay.vue";

export default {
  components: { LoadingOverlay },
  props: {
    showSessionExpired: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  setup(){
    const user = useUserStore();
    return {
      user
    }
  },
  data(){
    return {
      isLoading: false,
      form: {email: '', password: ''},
      errors: {email: '', password: ''}
    }
  },
  methods: {
    async submit(){
      this.isLoading = true;
      this.errors = {email: '', password: ''}

      const user = useUserStore();
      try{
        await user.login(this.form);
        this.$router.push('/account');
      }catch (error){
        this.addErrors(error.response.data.context.errors);
      }
      this.isLoading = false;
    },
    resetPassword(){
      this.errors = {email: '', password: ''}
      if (this.form.email === ''){
        this.addError('email', 'Please, enter your email');
      }
      alert("Email will be send");
    },
    addError(field, message){
      this.errors[field] = message;
    },
    addErrors(errors){
      this.errors = {...errors};
    },
  },
  name: "LoginForm"
}
</script>
