import { LOGOUT } from "../services/auth";
import { OBTENER_ESTADO } from "../services/usuarios";
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { onAuthStateChanged } from "firebase/auth";
import { AUTH } from "@/infrastructure/firebase/config/config";
import Swal from "sweetalert2";

const routes: Array<RouteRecordRaw> = [
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
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: () => import("../views/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
