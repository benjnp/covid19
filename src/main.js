import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import router from "./router";
import 'vuetify/dist/vuetify.min.css';
import { store } from "./store.js";

import vuetify from "./plugins/vuetify";


Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
