import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import es from "vuetify/src/locale/es";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#007BFF",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        color_a: "#557B83",
        color_c: "#39AEA9",
        color_b: "#A2D5AB",
        color_d: "#E5EFC1",
      },
    },
  },
  lang: {
    locales: { es },
    current: "es",
  },
});
