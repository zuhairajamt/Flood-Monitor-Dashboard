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
    console: () => console,
  },

  methods: {
    ...mapActions(d$todo, ["a$list", "a$add", "a$del"]),
    async getList() {
    //   try {
    //     await console.log(g$list);
    //   } catch (e) {
    //     console.log(g$list);
    //   }
     },
  },
  async created() {
    await this.getList();
    //console.log(g$list);
  },
};
</script>

<template>
  <div class="card">
    <div class="card-header pb-0">
      <h5 class="table-name">{{g$list}}</h5>
    </div>
    <div class="card-body px-0 pt-0 pb-2 m-4">
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
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img src="../../assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ item.channel['name'] }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-sm mb-0">{{ item.description }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge bg-gradient-success">{{ item.status }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-sm font-weight-bold">{{ dateTime(item.createdAt) }}</span>
              </td>
              <td class="align-middle text-center">
                <router-link :to="{name: 'ToDoEdit', params: {id: item.id}}">
                  <a><i class="bi bi-pencil-square"></i></a>
                </router-link> |
                <a @click.prevent="delData(item.id)"><i class="bi bi-trash3-fill"></i></a>
              </td>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img src="../../assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ item.name }}</h6>
                  </div>
                </div>
              </td>
              <td>
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
            <!-- <iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/channels/480636/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=5760&title=Temperature&type=line&yaxismin=15"></iframe> -->
            <!-- <iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/channels/1940387/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"></iframe> -->
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
