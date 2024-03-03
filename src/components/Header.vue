<template>
  <header>
    <nav class="navbar navbar-light navbar-expand-md bg-light">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <b>MyBrand</b>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav m-auto">
            <li class="nav-item" ><router-link class="nav-link" exact-active-class="active" to="/">Home</router-link></li>
            <li class="nav-item" ><router-link class="nav-link" exact-active-class="active" to="/about">About</router-link></li>
          </ul>
          <div class="d-flex">
            <div v-if="user.isAuthorized"><router-link class="btn btn-outline btn-outline-dark" to="/account">Account</router-link></div>
            <div v-else><router-link class="btn btn-outline btn-outline-dark" to="/auth">Login</router-link></div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { useUserStore } from "@/stores/userStore.js";
import { useRoute } from "vue-router";

export default {
  name: "Header",
  setup(){
    const user = useUserStore();

    return {
      user
    }
  },
  data(){
    const route = useRoute();

    return {
      active: route.name,
    }
  }
}
</script>
