<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.money.title" :value="posts.field1" :percentage="posts.entry_id + ' data'" :iconClass="stats.money.iconClass"
              :iconBackground="stats.money.iconBackground" :detail="stats.money.detail" directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.users.title" :value="postsAverage.field1 + ' data'" :percentage="postsAverage.entry_id + ' data'"
              :iconClass="stats.users.iconClass" :iconBackground="stats.users.iconBackground"
              :detail="stats.users.detail" directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.clients.title" :value="stats.clients.value" :percentage="stats.clients.percentage"
              :iconClass="stats.clients.iconClass" :iconBackground="stats.clients.iconBackground"
              :percentageColor="stats.clients.percentageColor" :detail="stats.clients.detail" directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.sales.title" :value="stsFlood" :percentage="stsMsg"
              :iconClass="stats.sales.iconClass" :iconBackground="stats.sales.iconBackground"
              :detail="stats.sales.detail" directionReverse></card>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-7 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <gradient-line-chart />
            </div>
          </div>
          <div class="col-lg-5">
            <carousel />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-7 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr v-for="(sale, index) in sales" :key="index">
                      <td class="w-30">
                        <div class="px-2 py-1 d-flex align-items-center">
                          <div>
                            <img :src="sale.flag" alt="Country flag" />
                          </div>
                          <div class="ms-4">
                            <p class="mb-0 text-xs font-weight-bold">Country:</p>
                            <h6 class="mb-0 text-sm">{{ sale.country }}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Sales:</p>
                          <h6 class="mb-0 text-sm">{{ sale.sales }}</h6>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Value:</p>
                          <h6 class="mb-0 text-sm">{{ sale.value }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">Bounce:</p>
                          <h6 class="mb-0 text-sm">{{ sale.bounce }}</h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <categories-card />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "@/components/examples/Carousel.vue";
import CategoriesCard from "@/components/examples/CategoriesCard.vue";

import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";



export default {
  name: "dashboard-default",
  methods: {
    async getData() {
      try {
        let response = await fetch(import.meta.env.VITE_BASE_API_URL);
        let responseAverage = await fetch(import.meta.env.VITE_BASE_API_AVERAGE);
        this.posts = await response.json();
        this.postsAverage = await responseAverage.json();
      } catch (error) {
        console.log(error);
      }
    },
    async statusFlood() {
      try {
        if(this.posts.field1 <= 10) {
          //let sts = 'Awas';
          this.stsFlood = 'Awas';
          this.stsMsg = 'Segera evakuasi';
          // return sts; 
        } else if (this.posts.field1 <= 20) {
          this.stsFlood = 'Siaga';
          this.stsMsg = 'Pintu dibuka';
        } else {
          this.stsFlood = 'Aman';
          this.stsMsg = 'Terdeteksi aman';
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getData();
    this.statusFlood();
  },
  data() {
    return {
      posts: [],
      postsAverage: [],
      stsFlood: 'Aman',
      stsMsg: 'Terdeteksi aman',
      stats: {
        money: {
          title: "Ketinggian Terakhir",
          value: "$53,000",
          percentage: "",
          iconClass: "ni ni-world",
          detail: " dari terkahir",
          iconBackground: "bg-gradient-primary",
        },
        users: {
          title: "Rata-rata Ketinggian Air",
          value: "2,300",
          percentage: "",
          iconClass: "ni ni-world",
          iconBackground: "bg-gradient-danger",
          detail: " dari terkahir",
        },
        clients: {
          title: "Flow Meter",
          value: "-",
          percentage: "",
          iconClass: "ni ni-paper-diploma",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-success",
          detail: "-",
        },
        sales: {
          title: "Status",
          value: 'statusFlood',
          percentage: "+5%",
          iconClass: "ni ni-cart",
          iconBackground: "bg-gradient-warning",
          detail: "",
        },
      },
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
        },
      },
    };
  },
  components: {
    Card,
    GradientLineChart,
    Carousel,
    CategoriesCard,
  },
};
</script>
