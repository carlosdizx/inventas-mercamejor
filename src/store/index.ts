import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    color: localStorage.getItem("color")
      ? localStorage.getItem("color")
      : "indigo",
  },
  mutations: {
    actualizarColor(state, payload) {
      state.color = payload;
    },
  },
  actions: {
    cambarColor: async ({ commit }, color: string) => {
      localStorage.setItem("color", color);
      commit("actualizarColor", color);
    },
  },
  modules: {},
});
