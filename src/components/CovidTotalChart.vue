<template>
  <div class="container">
    <v-card>
      <div class="row mt-5">
        <div class="col">
          <h4 class="text-center">{{graphTitle1}}</h4>
          <line-chart width="200vw" :height="100" :labels="dates" :datasets="displayDataset1"></line-chart>
        </div>
      </div>
    </v-card>
    <v-card>
      <div class="row mt-5">
        <div class="col">
          <h4 class="text-center">{{graphTitle2}}</h4>
          <line-chart width="200vw" :height="100" :labels="dates" :datasets="displayDataset2"></line-chart>
        </div>
      </div>
    </v-card>
    <v-card>
      <div class="row mt-5">
        <div class="col">
          <h4 class="text-center">{{graphTitle3}}</h4>
          <line-chart width="200vw" :height="100" :labels="dates" :datasets="displayDataset3"></line-chart>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import LineChart from "./LChart";

export default {
  name: "CovidTotalChart",
  components: {
    LineChart
  },
  props: {
    dates: Array,
    displayDataset1: Array,
    displayDataset2: Array,
    displayDataset3: Array,
    graphTitle1: String,
    graphTitle2: String,
    graphTitle3: String
  }
};
</script>
<style scoped>
</style>