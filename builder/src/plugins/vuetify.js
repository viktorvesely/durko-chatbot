import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  options: {
    customProperties: true
  }
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#32d2db',
        secondary: '#FFFFFF',
        accent: '#121414',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        background: "#b0e5e8",
        message: "#32d2db"
      },
    },
  },
});
