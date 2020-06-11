import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

// handle page reload


export const store = new Vuex.Store({
    state: {
        globalCases: {},
        globalMortality: 0,
        sortedCases: [],
        phMortality: 0,
    },
    actions: {
        fetchGlobalData({ commit }) {
            axios
                .get("https://api.covid19api.com/summary")
                .then(response => {
                    let mortality = response.data.Global.TotalDeaths / response.data.Global.TotalConfirmed * 100;
                    response.data.Countries.map(country => {
                        delete country.CountryCode;
                        delete country.Slug;
                        delete country.Date;
                        delete country.NewConfirmed;
                        delete country.NewDeaths;
                        delete country.NewRecovered;
                        country.Mortality = (country.TotalDeaths / country.TotalConfirmed * 100).toFixed(2);
                        if (country.Country === "Philippines")
                            commit("setPhMortalityData", country.Mortality);
                    })
                    commit("setGlobalData", response.data);
                    commit("setMortalityData", mortality);

                    console.log(response.data.Countries);
                });
        },
        fetchPhData({ commit }) {
            axios
                .get("https://api.covid19api.com/country/philippines")
                .then(response => {
                    commit("setPhData", response.data);
                });
        },
    },
    mutations: {
        setGlobalData(state, val) {
            state.globalCases = val;
        },
        setMortalityData(state, val) {
            state.globalMortality = val;
        },
        setPhMortalityData(state, val) {
            state.phMortality = val;
        },
        setPhData(state, val) {
            state.phData = val;
        },
    }
});
