<template>
  <div class="d-flex gap-3" v-if="data">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title text-center">Profile Picture</h5>
        <ImagePicker></ImagePicker>
      </div>
    </div>
    <div class="flex-fill">
      <form>
        <div class="form-group row">
          <div class="col-12 col-sm-6 col-md-6 form-group">
            <input placeholder="First name" class="form-control" :value="data.first_name" disabled/>
          </div>
          <div class="col-12 col-sm-6 col-md-6 form-group">
            <input placeholder="Last name" class="form-control" :value="data.last_name" disabled/>
          </div>
        </div>
        <div class="form-group my-2">
          <input type="email" placeholder="Email" class="form-control" :value="data.email" disabled/>
        </div>
        <div>
          <button type="button" class="btn btn-success" @click="startEditing">Edit</button>
          <button type="button" class="mx-2 btn btn-danger" @click="logout">Logout</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
import ImagePicker from "@/components/ImagePicker.vue";
import { useUserStore } from "@/stores/userStore.js";
import { useRouter } from "vue-router";

export default {
  name: "AccountHome",
  setup(){
    const user = useUserStore();
    const router = useRouter()

    if (!user.isAuthorized){
      router.push({path: '/auth', query: {err: 'session-expired'}});
    }

    return {
      data: user.userData,
    }
  },
  components: {
    ImagePicker,
  },
  methods: {
    async logout() {
      const user = useUserStore();

      await user.logout();
      this.$router.push('/auth');
    },

    startEditing(){
      alert('Not implemented');
    }
  }
}
</script>


<style scoped lang="scss">

</style>