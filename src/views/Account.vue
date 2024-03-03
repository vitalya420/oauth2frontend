<template>
  <div class="container pt-3">
    <div class="d-flex align-items-start">
      <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button class="nav-link" :class="{ active: activeTab === 'home' }" @click="setActiveTab('home')" type="button">Home</button>
        <button class="nav-link" :class="{ active: activeTab === 'applications' }" @click="setActiveTab('applications')" type="button">Applications</button>
      </div>
      <div class="tab-content w-100" id="v-pills-tabContent">
        <div class="tab-pane fade" :class="{ 'show active': activeTab === 'home' }" role="tabpanel">
          <AccountHome></AccountHome>
        </div>
        <div class="tab-pane fade" :class="{ 'show active': activeTab === 'applications' }" role="tabpanel">
          <AccountApplications></AccountApplications>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from "vue-router";
import AccountApplications from "@/components/AccountApplications.vue";
import AccountHome from "@/components/AccountHome.vue";

export default {
  name: "AccountPage",
  components: {
    AccountApplications,
    AccountHome
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const activeTab = ref(route.query.tab || 'home');

    const setActiveTab = (tabName) => {
      activeTab.value = tabName;
      router.push({query: {...route.query, tab: tabName}});
    };

    watch(() => route.query.tab, (newTab) => {
      if (newTab) {
        activeTab.value = newTab;
      }
    });

    return {
      activeTab,
      setActiveTab,
    };
  },
}
</script>
