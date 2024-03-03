<template>
  <LoadingOverlay :is-visible="isLoading">
    <div class="card">
      <form class="card-body p-3" @submit.prevent="submitForm">
        <h3 class="card-title mb-3">Sign Up</h3>
        <div class="form-group mb-3">
          <input type="text"
                 placeholder="First name"
                 class="form-control"
                 :class="{'is-invalid': errors.first_name}"
                 v-model="form.first_name" >
          <div class="invalid-feedback" v-if="errors.first_name">{{ errors.first_name }}</div>
        </div>
        <div class="form-group mb-3">
          <input type="text"
                 placeholder="Last name"
                 class="form-control"
                 :class="{'is-invalid': errors.last_name}"
                 v-model="form.last_name">
          <div class="invalid-feedback" v-if="errors.last_name">{{ errors.last_name }}</div>
        </div>
        <div class="form-group mb-3">
          <input type="email"
                 placeholder="Email"
                 class="form-control"
                 :class="{'is-invalid': errors.email}"
                 v-model="form.email">
          <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
        </div>
        <div class="form-group mb-3">
          <input type="password"
                 placeholder="Password"
                 class="form-control"
                 :class="{'is-invalid': errors.password}"
                 v-model="form.password">
          <div class="invalid-feedback" v-if="errors.password">{{ errors.password }}</div>
        </div>
        <div class="form-group mb-3">
          <input type="password"
                 placeholder="Repeat password"
                 class="form-control"
                 :class="{'is-invalid': errors.password_repeat}"
                 v-model="form.password_repeat" >
          <div class="invalid-feedback" v-if="errors.password_repeat">{{ errors.password_repeat }}</div>
        </div>
        <div>
          <button type="submit" class="btn btn-sm btn-primary">Sign Up</button>
        </div>
      </form>
    </div>
  </LoadingOverlay>
</template>

<script>
import { useUserStore } from "@/stores/userStore.js";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import {useRouter} from "vue-router";

const emptyFields = {first_name: '', last_name: '', email: '', password: '', password_repeat: ''};
export default {
  name: "RegisterForm",
  components: {LoadingOverlay},
  data(){
    return {
      errors:     {...emptyFields},
      form:       {...emptyFields},
      isLoading:  false,
    }
  },
  methods: {
    async submitForm(e){
      this.errors = {...emptyFields};

      if (this.form.password !== this.form.password_repeat){
        const errMessage = "Passwords don't match";
        const errors = {password: errMessage, password_repeat: errMessage};
        this.addErrors(errors);
        return null;
      }
      const userStore = useUserStore();
      this.isLoading = true;
      try{
        await userStore.register(this.form);
        this.$router.push('/account');
      }catch (e) {
        this.addErrors(e.response.data.context.errors);
      }
      this.isLoading = false;
    },
    addErrors(errors){
      this.errors = {...errors};
    }
  }
}
</script>

<style scoped lang="scss">

</style>