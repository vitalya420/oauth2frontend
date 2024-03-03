import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Account from "@/views/Account.vue";
import Authorization from "@/views/Authorization.vue";
import OAuth from "@/views/OAuth.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
      path: "/account",
      name: "Account",
      component: Account,
  },
  {
      path: "/auth",
      name: "Authorization",
      component: Authorization,
  },
  {
    path: "/oauth",
    name: "OAuth",
    component: OAuth,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
