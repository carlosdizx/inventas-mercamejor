import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
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

export default router;
