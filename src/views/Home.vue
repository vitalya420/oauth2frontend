<template>
  <div class="container">
    <div class="hero text-center pt-5">
      <h1>Hello. You are viewing home page!</h1>
      <h2 class="text-muted">Landing not landed yet</h2>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/forms/LoginForm.vue";
import RegisterForm from "@/components/forms/RegisterForm.vue";

export default {
  components: {
    LoginForm,
    RegisterForm
  },
  name: "HomePage"
}
</script>

<style scoped lang="scss">

</style>