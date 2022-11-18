<template>


  <!-- <div class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
              <i class="ni ni-camera-compact text-dark opacity-10"></i>
            </div> -->
  <!-- <div class="card">
            <div class="pb-0 card-header mb-0">
              <h6 class="text-black mb-1">Ketinggian air</h6>
              <iframe width="450" height="260" style="border: 1px solid #cccccc; "
                src="https://thingspeak.com/channels/1697274/widgets/552089"></iframe>
            </div>
          </div> -->
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6> Data monitor </h6>
      <p class="text-sm">
        <!-- <i class="fa fa-arrow-up text-success"></i> -->
        <!-- <span class="font-weight-bold">{{detail1}}</span> -->
        <!-- <iframe width="450" height="260" style="border: 1px solid #cccccc;"
          src="https://thingspeak.com/channels/1697274/widgets/552089"></iframe> -->
        <iframe width="450" height="260" style="border: 1px solid #cccccc;"
          src="https://thingspeak.com/channels/1697274/widgets/553103"></iframe>
      </p>
    </div>
    <div class="p-3 card-body">
      <!-- <div class="chart">
        <canvas id="chart-line" class="chart-canvas" height="300"></canvas>
      </div> -->
    </div>
  </div>

</template>

<script>
import carousel1 from '@/assets/img/carousel-1.jpg';
import carousel2 from '@/assets/img/carousel-2.jpg';
import carousel3 from '@/assets/img/carousel-3.jpg';

export default {
  name: "carousel",
  data: () => ({
    carousel1,
    carousel2,
    carousel3,
  }),
};
</script>
