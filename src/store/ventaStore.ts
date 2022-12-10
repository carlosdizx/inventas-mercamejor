import { IVenta } from "./../models/Venta";
import Vue from "vue";
import Vuex from "vuex";
import { ETiposVenta } from "@/generals/Constantes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    compra: {
      nombres: "",
      apellidos: "",
      documento: "",
      productos: [],
      tipo_compra: ETiposVenta.CONTADO,
      subtotal: 0,
      descuento: 0,
      total: 0,
    } as IVenta,
  },
  mutations: {
    actualizarCompra(state, payload) {
      state.compra = payload;
    },
  },
  actions: {
    cambarColor: async ({ commit }, color: IVenta) => {
      commit("actualizarCompra", color);
    },
  },
  modules: {},
});
