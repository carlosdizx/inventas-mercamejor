import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { es } from 'vuetify/locale';

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#007BFF',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          color_a: '#557B83',
          color_c: '#39AEA9',
          color_b: '#A2D5AB',
          color_d: '#E5EFC1',
        },
      },
    },
  },
  locale: {
    locale: 'es',
    messages: { es },
  },
});
