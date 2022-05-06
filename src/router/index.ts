import { LOGOUT } from "./../services/auth";
import { OBTENER_ESTADO } from "./../services/usuarios";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import { onAuthStateChanged } from "firebase/auth";
import { AUTH } from "@/firebase/config";

import Swal from "sweetalert2";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: {
      requiereAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/inicioSesion",
    name: "InicioSesion",
    component: () => import("../views/InicioSesion.vue"),
  },
  // {
  //   path: "/registro",
  //   name: "Registro",
  //   component: () => import("../views/Registro.vue"),
  // },
  {
    path: "*",
    name: "PageNotFound",
    component: () => import("../views/PageNotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const esRequerida = to.matched.some((ruta) => ruta.meta.requiereAuth);
  onAuthStateChanged(AUTH, async (user) => {
    const estado = await OBTENER_ESTADO();
    if (esRequerida && !user) {
      next("inicioSesion");
    } else if (!esRequerida && user) {
      next("/");
    } else if (estado === "Desabilitado") {
      await Swal.fire({
        title: "No tiene acceso",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
      await LOGOUT();
      next("inicioSesion");
    } else next();
  });
});

export default router;
