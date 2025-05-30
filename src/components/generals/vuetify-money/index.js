import vuetifyMoney from "./VuetifyMoney.vue";

export default {
  install: (app) => {
    app.component("vuetify-money", vuetifyMoney);
  }
};
