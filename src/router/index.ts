import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/asistance",
    name: "Asistance",
    component: () => import("../views/Asistance.vue"),
  },
  {
    path: "/requirements",
    name: "Requirements",
    component: () => import("../views/Requirements.vue"),
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: () => import("../views/Usuarios.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
