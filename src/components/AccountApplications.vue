<template>
  <div class="d-flex justify-content-end">
  <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Create Application</button>
  </div>

  <LoadingOverlay :is-visible="isApplicationsLoading">
    <div style="min-height: 240px">
      <table class="table" >
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Client ID</th>
            <th scope="col">Redirect URL</th>
            <th scope="col">Secret</th>
            <th scope="col">Actions</th>
            <th scope="col">Enabled?</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="application in applications" :key="application.id">
            <td>{{ application.name }}</td>
            <td>{{ application.id }}</td>
            <td @click="editRedirectURI(application.id, $event)">
                <div v-if="editingAppId !== application.id">
                  {{ application.redirect_uri }}
                </div>
                <input v-else
                       type="text"
                       class="form-control"
                       v-model="application.redirect_uri"
                       @blur="stopEditing"
                       @keyup.enter="stopEditing"
                       ref="editInput">
              </td>
            <td>
              <button type="button" class="btn btn-sm btn-outline-success" @click="copyToClipboard(application.secret, $event)" ref="copyBtn">
                Click to copy
              </button>
<!--              <button type="button" class="mx-1 btn btn-sm btn-outline-danger">Reset</button>-->
            </td>
            <td><button type="button" class="btn btn-sm btn-outline-danger" @click="deleteApp(application.id)">Delete</button></td>
            <td><Switch size="0.7" :checked="true"></Switch></td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center m-5" v-if="!applications.length">
        <img src="../assets/no_applications.jpg" alt="No applications?" width="180px"/>
      </div>
    </div>
  </LoadingOverlay>



  <nav aria-label="Page navigation example" class="d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="goToPreviousPage" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
        <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
      </li>

      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="goToNextPage" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>


  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

    <div class="modal-dialog">
      <LoadingOverlay :is-visible="isModalLoading">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Create Application</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Create Application Form -->
            <form id="createApplicationForm">
              <div class="mb-3">
                <label for="applicationName" class="form-label">Name</label>
                <input type="text" class="form-control" id="applicationName" v-model="form.name" required>
              </div>
              <div class="mb-3">
                <label for="redirectUri" class="form-label">Redirect URI</label>
                <input type="url" class="form-control" id="redirectUri" v-model="form.redirect_uri" required>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="Close">Close</button>
            <button type="button" class="btn btn-success" @click="submitNewApplication">Create</button>
          </div>
        </div>
      </LoadingOverlay>
    </div>

  </div>
</template>

<script>
import { ref, computed } from 'vue';
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import {useApplicationStore} from "@/stores/useApplicationsStore.js";
import Switch from "@/components/Switch.vue";

export default {
  name: "AccountApplications",
  components: {Switch, LoadingOverlay },
  setup() {
    const applicationsStore = useApplicationStore();
    const isApplicationsLoading = ref(true); // Use ref for reactive loading state

    applicationsStore.fetchApplications().then(() => {
      isApplicationsLoading.value = false; // Correctly update loading state
    });

    const applications = computed(() => applicationsStore.getApplications);

    return {
      applications,
      isApplicationsLoading, // Return the reactive state
    };
  },
  data() {
    return {
      form: {
        name: '',
        redirect_uri: '',
      },
      currentPage: 1,
      isModalLoading: false,
      editingAppId: null,
    };
  },
  computed: {
    applicationsStore() {
      return useApplicationStore();
    },
    applications() {
      return this.applicationsStore.applications;
    },
    totalPages() {
      return Math.ceil(this.applicationsStore.total / this.applicationsStore.page_size);
    },
  },
  methods: {
    editRedirectURI(appId, event) {
      this.editingAppId = appId;
    },
    async fetchApplications() {
      await this.applicationsStore.fetchApplications(this.currentPage);
    },
    goToPage(page) {
      this.currentPage = page;
      this.fetchApplications();
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.goToPage(this.currentPage + 1);
      }
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1);
      }
    },
    stopEditing() {
      const applicationsStore = useApplicationStore();
      const updated = applicationsStore.getById(this.editingAppId);

      this.editingAppId = null;
      this.isApplicationsLoading = true;

      applicationsStore.updateIfNeeded(updated).then(function (){
        this.isApplicationsLoading = false;
      }).catch(error => {
        this.isApplicationsLoading = false;
      });
    },
    copyToClipboard(text, event) {
      navigator.clipboard.writeText(text).then(() => {
        console.log("Copied to clipboard successfully!");
        const originalText = event.target.innerText;
        event.target.innerText = 'Copied!';

        setTimeout(() => {
          event.target.innerText = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    },
    async deleteApp(id){
      this.isApplicationsLoading = true;
      try {
        const applicationStore = useApplicationStore();
        await applicationStore.deleteAndUpdate(id);
        if(this.currentPage > 1 && !this.applicationsStore.applications.length){
          this.goToPage(1);
        }
      } catch (e){
        console.log(e);
      }
      this.isApplicationsLoading = false;
    },
    async submitNewApplication() {
      this.isModalLoading = true;
      try {
        const applicationStore = useApplicationStore();
        await applicationStore.createApplication(this.form);
        await applicationStore.fetchApplications();
        this.$refs.Close.click();
        this.form = {name: '', redirect_uri: ''};
      } catch (e) {
        console.error(e);
      }
      this.isModalLoading = false;
    }
  }
};
</script>
