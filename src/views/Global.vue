<template>
  <div class="box ml-10 mr-10">
    <h2>Global</h2>
    <v-row>
      <v-card class="mx-auto" max-width="200" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Total Confirmed Cases</div>
            <v-list-item-title class="headline mb-1">{{globalCases.Global.TotalConfirmed.toLocaleString()}}</v-list-item-title>
            <v-list-item-subtitle>+{{globalCases.Global.NewConfirmed.toLocaleString()}} from yesterday</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-card class="mx-auto" max-width="200" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Total Recoveries</div>
            <v-list-item-title class="headline mb-1">{{globalCases.Global.TotalRecovered.toLocaleString()}}</v-list-item-title>
            <v-list-item-subtitle>+{{globalCases.Global.NewRecovered.toLocaleString()}} from yesterday</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-card class="mx-auto" max-width="200" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Total Deaths</div>
            <v-list-item-title class="headline mb-1">{{globalCases.Global.TotalDeaths.toLocaleString()}}</v-list-item-title>
            <v-list-item-subtitle>+{{globalCases.Global.NewDeaths.toLocaleString()}} from yesterday</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-card class="mx-auto" max-width="200" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Mortality Rate</div>
            <v-list-item-title class="headline mb-1">{{globalMortality.toFixed(2)}} %</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
  </v-row>
      <v-spacer></v-spacer>
      <v-card-title>
     List of countries
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="globalCases.Countries"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :search="search"
      :items-per-page="10"
      class="elevation-1"
    ></v-data-table>
    
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      mortalityRate: 0,
      sortBy: "TotalConfirmed",
      sortDesc: true,
      search: "",
      snackbar: false,
      headers: [
        { text: "Country", value: "Country" },
        { text: "Total Confirmed", value: "TotalConfirmed", align: "start" },
        { text: "Total Deaths", value: "TotalDeaths" },
        { text: "Total Recovered", value: "TotalRecovered" },
        { text: "Death %", value: "Mortality" }
      ]
      // runners: runnersData
    };
  },
  methods: {},
  computed: {
    ...mapState(["globalCases", "globalMortality", "sortedCases"])
  }
};
</script>