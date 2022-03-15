import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
// ---------------------- REGLAS VALIDACIÓN CAMPOS ----------------------
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, digits, email, max, min } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

extend("digits", {
  ...digits,
  message: "{_field_}: Se necesita {length} digitos. ({_value_})",
});
extend("required", {
  ...required,
  message: "{_field_}: no puede estar vacio",
});
extend("max", {
  ...max,
  message: "{_field_}: cantidad de caracteres superada, maximo {length}",
});
extend("min", {
  ...min,
  message: "{_field_}: requiere mas caracteres, minimo {length}",
});
extend("email", {
  ...email,
  message: "Correo con formato incorrecto",
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
