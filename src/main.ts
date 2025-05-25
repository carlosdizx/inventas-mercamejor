import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
// ---------------------- REGLAS VALIDACIÓN CAMPOS ----------------------
import { defineRule, configure } from "vee-validate";
import * as rules from "@vee-validate/rules";

// Register all rules
Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule]);
});

// Configure vee-validate
configure({
  generateMessage: (context: any) => {
    const messages = {
      required: `${context.field} no puede estar vacio, o es un valor errado`,
      min: `${context.field} requiere mas caracteres, minimo ${context.rule.params[0]}`,
      max: `${context.field} cantidad de caracteres superada, maximo ${context.rule.params[0]}`,
      email: "Correo con formato incorrecto",
      numeric: "Numero incorrecto",
      digits: `${context.field}: Se necesita ${context.rule.params[0]} digitos. (${context.value})`,
    };
    return messages[context.rule.name] || `${context.field} es inválido`;
  },
});

import VuetifyMoney from "@/plugins/vuetify-money";

// Styles
import 'vuetify/styles'
import './assets/styles/main.css'

const app = createApp(App);

app.use(router)
   .use(store)
   .use(vuetify)
   .use(VuetifyMoney)
   .mount("#app");
