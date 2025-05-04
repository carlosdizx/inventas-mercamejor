import { createStore } from 'vuex';

export default createStore({
  state: {
    color: localStorage.getItem("color")
      ? localStorage.getItem("color")
      : "teal",
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
