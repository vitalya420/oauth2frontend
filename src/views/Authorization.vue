<template>
  <div class="container d-flex justify-content-center">
    <div class="mt-5" :class="{ 'w-50': isWideScreen, 'w-100': !isWideScreen}">
      <section>
        <div class="switch">
          <input type="checkbox" id="form_switcher" @change="switchForm" :checked="!sign_in">
          <span class="selection"></span>
          <label style="user-select: none;" for="form_switcher">Sign In</label>
          <label style="user-select: none;" for="form_switcher">Sign Up</label>
        </div>
      </section>
      <LoginForm v-if="sign_in" :show-session-expired="showSessionExpired"></LoginForm>
      <RegisterForm v-else></RegisterForm>
    </div>
  </div>
</template>

<script>
import RegisterForm from "@/components/forms/RegisterForm.vue";
import LoginForm from "@/components/forms/LoginForm.vue";
import { useUserStore } from "@/stores/userStore.js";
import { useRoute } from "vue-router";

export default {
  name: "AuthorizationPage",
  components: {
    RegisterForm,
    LoginForm
  },
  setup(){
    const route = useRoute();

    return {
      showSessionExpired: route.query.err && route.query.err === 'session-expired',
    }
  },
  data(){
    return {
      isWideScreen: false,
      sign_in: true
    }
  },
  mounted() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth);
  },
 beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenWidth);
  },
  methods: {
    checkScreenWidth() {
      this.isWideScreen = window.innerWidth >= 992;
    },
    switchForm(){
      const user = useUserStore();
      if (user.isAuthorized && this.sign_in){
        return;
      }
      this.sign_in = !this.sign_in;
    }
  }
}
</script>



<style scoped lang="css">
section {
  margin: 20px auto;
  width: 300px;
  font-family: 'Montserrat', 'Lato', 'Open Sans', 'Helvetica Neue', Helvetica, Calibri, Arial, sans-serif;
}

.switch{
  position: relative;
  margin: 10px auto;
  height: 30px;
  width: 220px;
  background: #F2F2F2;
  border-radius: 20px;
  padding:3px;
}
.switch input{ display:none; }
.switch label{
  position: relative;
  float:left;
  font-size:14px;
  width:50%;
  height:26px;
  text-align:center;
  padding-top:3px;
  z-index: 2;
  cursor:pointer;
}
.selection{
  position:absolute;
  display: block;
  top:0px;
  left:0px;
  width:50%;
  background:#FFF;
  height:30px;
  border-radius:20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 1;
  -webkit-transition: 0.15s ease-out;
  -moz-transition: 0.15s ease-out;
  -o-transition: 0.15s ease-out;
  transition: 0.15s ease-out;
}

.switch input[type=checkbox]:checked + .selection{
  left:50%;
}
</style>