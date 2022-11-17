<script>
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from 'pinia';
import d$todo from '@/stores/dashboard/todo';
import moment from "moment";

export default {
  name: "authors-table",
  components: {
    ArgonButton,
  },

  computed: {
    ...mapState(d$todo, ['g$list']),
  },

  methods: {
    ...mapActions(d$todo, ["a$list", "a$add", "a$del"]),
    async getList() {
      try {
        await this.a$list();
      } catch (e) {
        console.error('methods getList error', e);
      }
    },

    addData() {
      this.$router.replace({ name: 'ToDo' });
    },

    async delData(id) {
      try {
        if (confirm("are you sure to delete this data?") == true) {
          alert("data deleted successfully");
          await this.a$del(id);
          
          this.$router.go(this.$router.currentRoute);
        } 
      } catch (error) {
        console.error("methods delData error", error);
      }
    },

    dateTime(value) {
      return moment(value).format("DD/MM/YYYY");
    },
  },
  async created() {
    await this.getList();
  },
};
</script>

<template>
  <div class="card">
    <div class="card-header pb-0">
      <h5 class="table-name">All Data</h5>
    </div>
    <div class="card-body px-0 pt-0 pb-2 m-4">
      <div class="row">
        <div class="col-2 text-end">
          <argon-button @click="addData" color="success" variant="gradient">
            <i class="fas fa-plus me-2"></i>
            Add New Data
          </argon-button>
        </div>
      </div>
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-sm font-weight-bolder opacity-10">Name</th>
              <th class="text-uppercase text-secondary text-sm font-weight-bolder opacity-10 ps-2">Description</th>
              <th class="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">Status</th>
              <th class="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">Created</th>
              <th class="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in g$list" :key="index">
              <td v-if="item.status == 'done'">
                <div class="d-flex px-2 py-1">
                  <div>
                    <img src="../../assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ item.name }}</h6>
                  </div>
                </div>
              </td>
              <td v-if="item.status == 'done'">
                <p class="text-sm mb-0">{{ item.description }}</p>
              </td>
              <td class="align-middle text-center text-sm" v-if="item.status == 'done'">
                <span class="badge bg-gradient-success">{{ item.status }}</span>
              </td>
              <td class="align-middle text-center" v-if="item.status == 'done'">
                <span class="text-secondary text-sm font-weight-bold">{{ dateTime(item.createdAt) }}</span>
              </td>
              <td class="align-middle text-center" v-if="item.status == 'done'">
                <router-link :to="{name: 'ToDoEdit', params: {id: item.id}}">
                  <a><i class="bi bi-pencil-square"></i></a>
                </router-link> |
                <a @click.prevent="delData(item.id)"><i class="bi bi-trash3-fill"></i></a>
              </td>
              <td v-if="item.status == 'todo'">
                <div class="d-flex px-2 py-1">
                  <div>
                    <img src="../../assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ item.name }}</h6>
                  </div>
                </div>
              </td>
              <td v-if="item.status == 'todo'">
                <p class="text-sm mb-0">{{ item.description }}</p>
              </td>
              <td class="align-middle text-center text-sm" v-if="item.status == 'todo'">
                <span class="badge bg-gradient-danger">{{ item.status }}</span>
              </td>
              <td class="align-middle text-center" v-if="item.status == 'todo'">
                <span class="text-secondary text-sm font-weight-bold">{{ dateTime(item.createdAt) }}</span>
              </td>
              <td class="align-middle text-center" v-if="item.status == 'todo'">
                <router-link :to="{name: 'ToDoEdit', params: {id: item.id}}">
                  <a><i class="bi bi-pencil-square"></i></a>
                </router-link> | 
                <a @click.prevent="delData(item.id)"><i class="bi bi-trash3-fill"></i></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
.table-name {
  font-weight: bold;
}

.bi-pencil-square {
  color: #0d6efd;
}

.bi-trash3-fill {
  color: red;
}
</style>
