import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
// ---------------------- REGLAS VALIDACIÓN CAMPOS ----------------------
import { configure, ValidationObserver, ValidationProvider } from 'vee-validate';
import {
  digits,
  email,
  max,
  min,
  required,
  numeric,
} from 'vee-validate/dist/rules';

// Configuración de vee-validate
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

// Registro de reglas
const rules = {
  digits,
  email,
  max,
  min,
  required,
  numeric,
};

Object.keys(rules).forEach(rule => {
  configure({
    [rule]: {
      ...rules[rule],
      message: (field, params) => {
        const messages = {
          digits: `${field}: Se necesita ${params.length} digitos.`,
          required: `${field}: no puede estar vacio, o es un valor errado`,
          max: `${field}: cantidad de caracteres superada, maximo ${params.length}`,
          min: `${field}: requiere mas caracteres, minimo ${params.length}`,
          email: 'Correo con formato incorrecto',
          numeric: 'Numero incorrecto',
        };
        return messages[rule];
      },
    },
  });
});

// Importación y configuración de plugins adicionales
import VuetifyMoney from '@/plugins/vuetify-money';

const app = createApp(App);

// Registro de componentes globales
app.component('ValidationObserver', ValidationObserver);
app.component('ValidationProvider', ValidationProvider);

// Uso de plugins
app.use(router);
app.use(store);
app.use(vuetify);
app.use(VuetifyMoney);

app.mount('#app');
