<template>
  <LoadingOverlay :is-visible="loading" v-if="loading">
    <div class="min-vh-100"></div>
  </LoadingOverlay>
  <div v-else>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useUserStore } from "@/stores/userStore.js";
import Header from "@/components/Header.vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";

export default {
  name: 'App',
  components: { LoadingOverlay, Header },
  setup() {
    const loading = ref(true);

    onMounted(async () => {
      const user = useUserStore();
      try{
        await user.initialize();
      }catch (e) {}
      loading.value = false;
    });

    return {
      loading,
    };
  },
};
</script>
