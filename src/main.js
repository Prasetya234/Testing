import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toasted from "vue-toasted";
import VueLoading from "vue-loading-overlay";
import { BootstrapVue, VBModal } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.use(VueLoading);
Vue.use(Toasted);
Vue.directive("b-modal", VBModal);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
