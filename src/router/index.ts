import { ISUSERAUT } from "./../services/auth";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import { onAuthStateChanged } from "firebase/auth";
import { AUTH } from "@/firebase/config";

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
  {
    path: "/registro",
    name: "Registro",
    component: () => import("../views/Registro.vue"),
  },
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
  onAuthStateChanged(AUTH, (user) => {
    if (esRequerida && !user) {
      next("inicioSesion");
    } else if (!esRequerida && user) {
      next("/");
    } else next();
  });
});

export default router;
