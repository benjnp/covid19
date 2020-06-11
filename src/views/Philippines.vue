<template>
  <div class="box ml-10 mr-10">
    <v-row>
      <v-card class="mx-auto" max-width="200" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Total Confirmed Cases</div>
            <v-list-item-title class="headline mb-1">{{displayTotalConfirmed}}</v-list-item-title>
            <v-list-item-subtitle>+{{displayLastDayConfirmed}} from yesterday</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-card class="mx-auto" max-width="200" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Total Recoveries</div>
            <v-list-item-title class="headline mb-1">{{displayTotalRecoveries}}</v-list-item-title>
            <v-list-item-subtitle>+{{displayLastDayRecovered}} from yesterday</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-card class="mx-auto" max-width="200" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Total Deaths</div>
            <v-list-item-title class="headline mb-1">{{displayTotalDeaths}}</v-list-item-title>
            <v-list-item-subtitle>+{{displayLastDayDeaths}} from yesterday</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-card class="mx-auto" max-width="200" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Mortality Rate</div>
            <v-list-item-title class="headline mb-1">{{phMortality}} %</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-row>
    <div>
      <v-row>
        <v-col cols="3" class="ml-10">
          <v-select v-model="choiceDropdown" :items="dropDown" @change="onDropdownChange()"></v-select>
        </v-col>
      </v-row>
    </div>
    <CovidTotalChart
      :key="choiceDropdown"
      :dates="arrDates"
      :displayDataset1="displayedRDDatasets"
      :displayDataset2="displayedCADatasets"
      :displayDataset3="displayedRMDatasets"
      :graphTitle1="graphTitle1"
      :graphTitle2="graphTitle2"
      :graphTitle3="graphTitle3"
    ></CovidTotalChart>
  </div>
</template>

<script>
// import covidData from "../assets/covid";
import moment from "moment";
import CovidTotalChart from "@/components/CovidTotalChart";
import { mapState } from "vuex";
export default {
  name: "Chart",
  components: {
    CovidTotalChart
  },
  data() {
    return {
      choiceDropdown: "",
      graphTitle1: "Recovered vs Deaths Total Cases",
      graphTitle2: "Confirmed vs Active Total Cases",
      graphTitle3: "Recovery vs Mortality Rate",
      displayTotalConfirmed: 0,
      displayTotalRecoveries: 0,
      displayTotalDeaths: 0,
      displayMortalityRate: 0,
      displayLastDayConfirmed: 0,
      displayLastDayRecovered: 0,
      displayLastDayDeaths: 0,
      Recovered: "Recovered",
      Deaths: "Deaths",
      Confirmed: "Confirmed",
      Active: "Active",
      Recovery: "Recovery",
      Mortality: "Mortality",
      dropDown: ["Total Line Chart", "Weekly Line Chart", "Daily Line Chart"],
      selectedRDTotalGraph: ["Recovered", "Deaths"],
      selectedCATotalGraph: ["Confirmed", "Active"],
      selectedRMRateGraph: ["Recovery", "Mortality"],
      cData: {},
      arrDates: [],
      dailyDates: [],
      weeklyDates: [],
      arrConfirmed: [],
      dailyConfirmed: [],
      weeklyConfirmed: [],
      arrActive: [],
      weeklyActive: [],
      dailyActive: [],
      arrRecovered: [],
      weeklyRecovered: [],
      dailyRecovered: [],
      arrDeaths: [],
      weeklyDeaths: [],
      dailyDeaths: [],
      totalRecovery: [],
      dailyRecovery: [],
      weeklyRecovery: [],
      totalMortality: [],
      dailyMortality: [],
      weeklyMortality: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      datasets: {
        Recovered: {
          label: "Recovered",
          borderColor: "rgba(50, 115, 220, 0.5)",
          backgroundColor: "rgba(50, 115, 220, 0.1)",
          data: []
        },
        Deaths: {
          label: "Deaths",
          borderColor: "rgba(255, 56, 96, 0.5)",
          backgroundColor: "rgba(255, 56, 96, 0.1)",
          data: []
        },
        Confirmed: {
          label: "Confirmed",
          borderColor: "rgba(50, 115, 220, 0.5)",
          backgroundColor: "rgba(50, 115, 220, 0.1)",
          data: []
        },
        Active: {
          label: "Active",
          borderColor: "rgba(255, 56, 96, 0.5)",
          backgroundColor: "rgba(255, 56, 96, 0.1)",
          data: []
        },
        Recovery: {
          label: "Recovery",
          borderColor: "rgba(50, 115, 220, 0.5)",
          backgroundColor: "rgba(50, 115, 220, 0.1)",
          data: []
        },
        Mortality: {
          label: "Mortality",
          borderColor: "rgba(255, 56, 96, 0.5)",
          backgroundColor: "rgba(255, 56, 96, 0.1)",
          data: []
        }
      }
    };
  },
  computed: {
    displayedRDDatasets() {
      return this.selectedRDTotalGraph.map(graph => this.datasets[graph]);
    },
    displayedCADatasets() {
      return this.selectedCATotalGraph.map(graph => this.datasets[graph]);
    },
    displayedRMDatasets() {
      return this.selectedRMRateGraph.map(graph => this.datasets[graph]);
    },
    getDates() {
      return this.arrDates;
    },
    ...mapState(["phData", "phMortality"])
  },
  methods: {
    onDropdownChange() {
      if (this.choiceDropdown === "Total Line Chart") {
        this.datasets.Recovered.data = [...this.arrRecovered];
        this.datasets.Deaths.data = [...this.arrDeaths];
        this.datasets.Confirmed.data = [...this.arrConfirmed];
        this.datasets.Active.data = [...this.arrActive];
        this.datasets.Recovery.data = [...this.totalRecovery];
        this.datasets.Mortality.data = [...this.totalMortality];
        this.arrDates = [...this.dailyDates];
        this.graphTitle1 = "Recovered vs Deaths Total Cases";
        this.graphTitle2 = "Confirmed vs Active Total Cases";
        this.graphTitle3 = "Recovery vs Mortality Rate";
      } else if (this.choiceDropdown === "Daily Line Chart") {
        this.datasets.Recovered.data = [...this.dailyRecovered];
        this.datasets.Deaths.data = [...this.dailyDeaths];
        this.datasets.Confirmed.data = [...this.dailyConfirmed];
        this.datasets.Active.data = [...this.dailyActive];
        this.datasets.Recovery.data = [...this.dailyRecovery];
        this.datasets.Mortality.data = [...this.dailyMortality];
        this.arrDates = [...this.dailyDates];
        this.graphTitle1 = "Recovered vs Deaths Daily New Cases";
        this.graphTitle2 = "Confirmed vs Active Daily New Cases";
        this.graphTitle3 = "Recovery vs Mortality Daily Rate";
      } else if (this.choiceDropdown === "Weekly Line Chart") {
        this.datasets.Recovered.data = [...this.weeklyRecovered];
        this.datasets.Deaths.data = [...this.weeklyDeaths];
        this.datasets.Confirmed.data = [...this.weeklyConfirmed];
        this.datasets.Active.data = [...this.weeklyActive];
        this.datasets.Recovery.data = [...this.weeklyRecovery];
        this.datasets.Mortality.data = [...this.weeklyMortality];
        this.arrDates = [...this.weeklyDates];
        this.graphTitle1 = "Recovered vs Deaths Weekly New Cases";
        this.graphTitle2 = "Confirmed vs Active Weekly New Cases";
        this.graphTitle3 = "Recovery vs Mortality Weekly Rate";
      } else {
        console.log("None selected");
      }
    }
  },
  created() {
    this.cData = this.phData;
    let dataIndex = 1;
    let prevConfirmed = 0;
    let currentConfirmed = 0;
    let prevActive = 0;
    let currentActive = 0;
    let prevDeaths = 0;
    let currentDeaths = 0;
    let prevRecovered = 0;
    let currentRecovered = 0;
    let thisWeekConfirmed = 0;
    let thisWeekActive = 0;
    let thisWeekRecovered = 0;
    let thisWeekDeaths = 0;
    let recovery = 0;
    let mortality = 0;
    let todayRecovery = 0;
    let todayMortality = 0;
    let thisWeekRecovery = 0;
    let thisWeekMortality = 0;
    this.cData.forEach(d => {
      const date = moment(d.Date).format("MM/DD");
      let { Confirmed, Deaths, Recovered, Active } = d;
      this.arrConfirmed.push(Confirmed);
      this.displayTotalConfirmed = Confirmed;
      this.arrDeaths.push(Deaths);
      this.displayTotalDeaths = Deaths;
      this.arrActive.push(Active);
      this.dailyDates.push(date);
      this.arrRecovered.push(Recovered);
      this.displayTotalRecoveries = Recovered;
      currentConfirmed = Confirmed - prevConfirmed;
      prevConfirmed = Confirmed;
      thisWeekConfirmed += currentConfirmed;
      this.dailyConfirmed.push(currentConfirmed);
      this.displayLastDayConfirmed = currentConfirmed;
      currentActive = Active - prevActive;
      prevActive = Active;
      thisWeekActive += currentActive;
      if (currentActive < 0) currentActive = 0;
      this.dailyActive.push(currentActive);
      currentDeaths = Deaths - prevDeaths;
      if (currentDeaths < 0) currentDeaths = 0;
      prevDeaths = Deaths;
      thisWeekDeaths += currentDeaths;
      this.dailyDeaths.push(currentDeaths);
      this.displayLastDayDeaths = currentDeaths;
      currentRecovered = Recovered - prevRecovered;
      prevRecovered = Recovered;
      thisWeekRecovered += currentRecovered;
      this.dailyRecovered.push(currentRecovered);

      if (date > "03/06") {
        recovery = (Recovered / Confirmed) * 100;
        mortality = (Deaths / Confirmed) * 100;
        thisWeekRecovery = (thisWeekRecovered / thisWeekConfirmed) * 100;
        thisWeekMortality = (thisWeekDeaths / thisWeekConfirmed) * 100;
        todayRecovery = (currentRecovered / currentConfirmed) * 100;
        todayMortality = (currentDeaths / currentConfirmed) * 100;
      } else {
        recovery = 0;
        mortality = 0;
        thisWeekRecovery = 0;
        thisWeekMortality = 0;
        todayRecovery = 0;
        todayMortality = 0;
      }
      this.totalRecovery.push(recovery.toFixed(2));
      this.totalMortality.push(mortality.toFixed(2));
      this.dailyRecovery.push(todayRecovery.toFixed(2));
      this.dailyMortality.push(todayMortality.toFixed(2));
      this.displayLastDayRecovered = currentRecovered;
      if (dataIndex % 7 === 0) {
        this.weeklyConfirmed.push(thisWeekConfirmed);
        this.weeklyActive.push(thisWeekActive);
        this.weeklyDeaths.push(thisWeekDeaths);
        this.weeklyRecovered.push(thisWeekRecovered);
        this.weeklyDates.push(date);
        this.weeklyRecovery.push(thisWeekRecovery.toFixed(2));
        this.weeklyMortality.push(thisWeekMortality.toFixed(2));
        thisWeekConfirmed = 0;
        thisWeekActive = 0;
        thisWeekRecovered = 0;
        thisWeekDeaths = 0;
        thisWeekRecovery = 0;
        thisWeekMortality = 0;
      }
      dataIndex++;
    });
    this.datasets.Recovered.data = [...this.arrRecovered];
    this.datasets.Deaths.data = [...this.arrDeaths];
    this.datasets.Confirmed.data = [...this.arrConfirmed];
    this.datasets.Active.data = [...this.arrActive];
    this.datasets.Recovery.data = [...this.totalRecovery];
    this.datasets.Mortality.data = [...this.totalMortality];
    this.arrDates = [...this.dailyDates];
    this.choiceDropdown = "Total Line Chart";
  }
};
</script>

<style scoped>
.dropdownContainer {
  margin-top: 150px;
}
</style>