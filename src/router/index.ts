import { LOGOUT } from "./../services/auth";
import { OBTENER_ESTADO } from "./../services/usuarios";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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
    children: [
      {
        path: "consultar-ventas",
        name: "ConsultarVentas",
        component: () => import("../components/dashboard/modules/sales/consultsales/ConsultSales.vue"),
      },
      {
        path: "cuadre-cuentas",
        name: "CuadreCuentas",
        component: () => import("../components/dashboard/modules/cuandre_cuentas/CuadreCuentas.vue"),
      },
      {
        path: "productos",
        name: "Productos",
        component: () => import("../components/dashboard/modules/Productos.vue"),
      },
      {
        path: "categorias",
        name: "Categorias",
        component: () => import("../components/dashboard/modules/Categorias.vue"),
      },
      {
        path: "marcas",
        name: "Marcas",
        component: () => import("../components/dashboard/modules/Marcas.vue"),
      },
      {
        path: "proveedores",
        name: "Proveedores",
        component: () => import("../components/dashboard/modules/Proveedores.vue"),
      },
      {
        path: "clientes",
        name: "Clientes",
        component: () => import("../components/dashboard/modules/Clientes.vue"),
      },
      {
        path: "comprar",
        name: "Comprar",
        component: () => import("@/components/dashboard/modules/shops/shop/Comprar.vue"),
      },
      {
        path: "cuentas-por-pagar",
        name: "CuentasPorPagar",
        component: () => import("../components/dashboard/modules/shops/cuentasporpagar/CuentasOpcion.vue"),
      },
      {
        path: "bodegas",
        name: "Bodegas",
        component: () => import("../components/dashboard/modules/Bodegas.vue"),
      }
    ]
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const esRequerida = to.matched.some((ruta) => ruta.meta.requiereAuth);

  return new Promise((resolve) => {
    onAuthStateChanged(AUTH, async (user) => {
      try {
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
        } else {
          next();
        }
        resolve(true);
      } catch (error) {
        console.error('Error en la navegación:', error);
        next("inicioSesion");
        resolve(true);
      }
    });
  });
});

export default router;
