<template>
  <div>
    <div class="container">
      <v-card>
        <div class="row mt-5">
          <div class="col">
            <h2 class="text-center">Recovered vs Deaths Totals</h2>
            <v-row>
              <v-col cols="4" sm="2" md="2">
                <v-checkbox
                  v-model="selectedRDTotalGraph"
                  label="Recovered"
                  value="recovered"
                  color="blue lighten-1"
                ></v-checkbox>
              </v-col>
              <v-col cols="4" sm="2" md="2">
                <v-checkbox
                  v-model="selectedRDTotalGraph"
                  label="Deaths"
                  value="deaths"
                  color="red lighten-2"
                ></v-checkbox>
              </v-col>
              <v-col cols="8" sm="8" md="8">
                <div>This shows that the number of those who Recover is greater than those who Die starting mid-April</div>
              </v-col>
            </v-row>
            <line-chart
              :width="500"
              :height="100"
              :labels="getDates"
              :datasets="displayedRDTotalDatasets"
            ></line-chart>
          </div>
        </div>
      </v-card>
      <v-card>
        <div class="row mt-5">
          <div class="col">
            <h2 class="text-center">Confirmed vs Active Totals</h2>
            <v-row>
              <v-col cols="4" sm="2" md="2">
                <v-checkbox
                  v-model="selectedCATotalGraph"
                  label="Confirmed"
                  value="confirmed"
                  color="blue lighten-1"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="2" md="2">
                <v-checkbox
                  v-model="selectedCATotalGraph"
                  label="Active"
                  value="active"
                  color="red lighten-2"
                ></v-checkbox>
              </v-col>
            </v-row>
            <line-chart
              :width="500"
              :height="100"
              :labels="getDates"
              :datasets="displayedCATotalDatasets"
            ></line-chart>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import LineChart from "./LChart";
import covidData from "../assets/covid";
import moment from "moment";

// const options = {
//   scales: {
//     yAxes: [
//       {
//         ticks: {
//           beginAtZero: true,
//           callback: value => numeral(value).format("$0,0")
//         }
//       }
//     ]
//   },
//   tooltips: {
//     mode: "index",
//     callbacks: {
//       label(tooltipItem, data) {
//         const label = data.datasets[tooltipItem.datasetIndex].label;
//         const value = numeral(tooltipItem.yLabel).format("$0,0");
//         return `${label}: ${value}`;
//       }
//     }
//   }
// };
export default {
  name: "CovidChart",
  components: {
    LineChart
  },
  data() {
    return {
      selectedRDTotalGraph: ["recovered", "deaths"],
      selectedCATotalGraph: ["confirmed", "active"],
      cData: covidData,
      arrDates: [],
      arrConfirmed: [],
      dayConfirmed: [],
      weeklyConfirmed: [],
      arrActive: [],
      weeklyActive: [],
      dayActive: [],
      arrRecovered: [],
      weeklyRecovered: [],
      dayRecovered: [],
      arrDeaths: [],
      weeklyDeaths: [],
      dayDeaths: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      datasets: {
        recovered: {
          label: "Recovered",
          borderColor: "rgba(50, 115, 220, 0.5)",
          backgroundColor: "rgba(50, 115, 220, 0.1)",
          data: []
        },
        deaths: {
          label: "Deaths",
          borderColor: "rgba(255, 56, 96, 0.5)",
          backgroundColor: "rgba(255, 56, 96, 0.1)",
          data: []
        },
        confirmed: {
          label: "Confirmed",
          borderColor: "rgba(50, 115, 220, 0.5)",
          backgroundColor: "rgba(50, 115, 220, 0.1)",
          data: []
        },
        active: {
          label: "Active",
          borderColor: "rgba(255, 56, 96, 0.5)",
          backgroundColor: "rgba(255, 56, 96, 0.1)",
          data: []
        },
        dayRecovered: {
          label: "Daily Recovered",
          borderColor: "rgba(50, 115, 220, 0.5)",
          backgroundColor: "rgba(50, 115, 220, 0.1)",
          data: []
        },
        dayDeaths: {
          label: "Daily Deaths",
          borderColor: "rgba(255, 56, 96, 0.5)",
          backgroundColor: "rgba(255, 56, 96, 0.1)",
          data: []
        },
        dayConfirmed: {
          label: "Daily Confirmed",
          borderColor: "rgba(50, 115, 220, 0.5)",
          backgroundColor: "rgba(50, 115, 220, 0.1)",
          data: []
        },
        dayActive: {
          label: "Daily Active",
          borderColor: "rgba(255, 56, 96, 0.5)",
          backgroundColor: "rgba(255, 56, 96, 0.1)",
          data: []
        }
      }
    };
  },
  computed: {
    displayedRDTotalDatasets() {
      return this.selectedRDTotalGraph.map(graph => this.datasets[graph]);
    },
    displayedCATotalDatasets() {
      return this.selectedCATotalGraph.map(graph => this.datasets[graph]);
    },
    getDates() {
      return this.arrDates;
    }
  },
  methods: {
    fillRecoveredData(arr) {
      this.datasets.recovered.data = arr;
    },
    fillDeathData(arr) {
      this.datasets.deaths.data = arr;
    },
    fillConfirmedData(arr) {
      this.datasets.confirmed.data = arr;
    },
    fillActiveData(arr) {
      this.datasets.active.data = arr;
    },
    fillDayRecoveredData(arr) {
      this.datasets.dayRecovered.data = arr;
    },
    fillDayDeathData(arr) {
      this.datasets.dayDeaths.data = arr;
    },
    fillDayConfirmedData(arr) {
      this.datasets.dayConfirmed.data = arr;
    },
    fillDayActiveData(arr) {
      this.datasets.dayActive.data = arr;
    }
  },
  created() {
    let dataIndex = 1;
    let prevConfirmed = 0;
    let currentConfirmed = 0;
    let prevActive = 0;
    let currentActive = 0;
    let prevDeaths = 0;
    let currentDeaths = 0;
    let prevRecovered = 0;
    let currentRecovered = 0;

    this.cData.forEach(d => {
      const date = moment(d.Date).format("MM/DD");
      let { Confirmed, Deaths, Recovered, Active } = d;
      this.arrConfirmed.push(Confirmed);
      this.arrDeaths.push(Deaths);
      this.arrActive.push(Active);
      this.arrDates.push(date);
      this.arrRecovered.push(Recovered);
      currentConfirmed = Confirmed - prevConfirmed;
      prevConfirmed = Confirmed;
      this.dayConfirmed.push(currentConfirmed);
      currentActive = Active - prevActive;
      prevActive = Active;
      this.dayActive.push(currentActive);
      currentDeaths = Deaths - prevDeaths;
      prevDeaths = Deaths;
      this.dayDeaths.push(currentDeaths);
      currentRecovered = Recovered - prevRecovered;
      prevRecovered = Recovered;
      this.dayRecovered.push(currentRecovered);

      if (dataIndex % 7 === 0) {
        this.weeklyConfirmed.push({ date, total: Confirmed });
        this.weeklyDeaths.push({ date, total: Deaths });
        this.weeklyActive.push({ date, total: Active });
        this.weeklyRecovered.push({ date, total: Recovered });
      }
      dataIndex++;
    });
    this.fillRecoveredData(this.arrRecovered);
    this.fillDeathData(this.arrDeaths);
    this.fillConfirmedData(this.arrConfirmed);
    this.fillActiveData(this.arrActive);
    this.fillDayRecoveredData(this.dayRecovered);
    this.fillDayDeathData(this.dayDeaths);
    this.fillDayConfirmedData(this.dayConfirmed);
    this.fillDayActiveData(this.dayActive);
  }
};
</script>
<style scoped>
.graph {
  height: 100vh;
  width: 90vw;
  align-content: center;
}
</style>