import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VuetifyMoney from "@/plugins/vuetify-money";

// Styles
import 'vuetify/styles'
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

// ---------------------- REGLAS VALIDACIÓN CAMPOS ----------------------
import { defineRule, configure } from "vee-validate";
import { required, min, max, email, numeric, digits } from "@vee-validate/rules";
import { Form as VeeForm, Field as VeeField, ErrorMessage } from 'vee-validate';

// Register rules
defineRule('required', required);
defineRule('min', min);
defineRule('max', max);
defineRule('email', email);
defineRule('numeric', numeric);
defineRule('digits', digits);

// Configure vee-validate
configure({
  generateMessage: (context) => {
    const messages: Record<string, string> = {
      required: `${context.field} no puede estar vacio, o es un valor errado`,
      min: `${context.field} requiere mas caracteres, minimo ${Array.isArray(context.rule?.params) ? context.rule.params[0] : ''}`,
      max: `${context.field} cantidad de caracteres superada, maximo ${Array.isArray(context.rule?.params) ? context.rule.params[0] : ''}`,
      email: "Correo con formato incorrecto",
      numeric: "Numero incorrecto",
      digits: `${context.field}: Se necesita ${Array.isArray(context.rule?.params) ? context.rule.params[0] : ''} digitos. (${context.value})`,
    };
    return messages[context.rule?.name ?? ''] || `${context.field} es inválido`;
  },
});

const app = createApp(App);

// Register validation components globally
app.component('VeeForm', VeeForm);
app.component('VeeField', VeeField);
app.component('ErrorMessage', ErrorMessage);

app.use(router)
   .use(store)
   .use(vuetify)
   .use(VuetifyMoney)
   .mount("#app");
