export const FUNCIONES: any[] = [
  {
    tipo: 1,
    titulo: "Modulo de compras",
    color: "color_c",
  },
  { id: 1, tipo: 2, icono: "mdi-cart-plus", titulo: "Comprar" },
  { id: 2, tipo: 2, icono: "mdi-account-group", titulo: "Proveedores" },
  { id: 3, tipo: 2, icono: "mdi-cash-minus", titulo: "Cuentas por pagar" },
  {
    tipo: 1,
    titulo: "Modulo de ventas",
    color: "color_c",
  },
  { id: 4, tipo: 2, icono: "mdi-cash-plus", titulo: "Vender" },
  { id: 5, tipo: 2, icono: "mdi-account-group", titulo: "Clientes" },
  { id: 6, tipo: 2, icono: "mdi-cash-plus", titulo: "Cuentas por cobrar" },
  {
    tipo: 1,
    titulo: "Modulo de inventario",
    color: "color_c",
  },
  { id: 7, tipo: 2, icono: "mdi-shape-plus", titulo: "Productos" },
  { id: 8, tipo: 2, icono: "mdi-warehouse", titulo: "Bodegas" },
  {
    tipo: 1,
    titulo: "Modulo de usuarios",
    color: "color_c",
  },
  {
    id: 9,
    tipo: 2,
    icono: "mdi-account-multiple",
    titulo: "Registrar empleados",
  },
  {
    id: 10,
    tipo: 2,
    icono: "mdi-account-multiple",
    titulo: "Actualizar empleados",
  },
  {
    id: 11,
    tipo: 2,
    icono: "mdi-account-multiple",
    titulo: "Cajas",
  },
  {
    tipo: 1,
    titulo: "Modulo de Desarrolladores",
    color: "color_c",
  },
  {
    id: 12,
    tipo: 2,
    icono: "mdi-calendar-account",
    titulo: "Sprints",
  },
  {
    tipo: 1,
    titulo: "Modulo de pruebas",
    color: "color_c",
  },
  {
    id: 13,
    tipo: 2,
    icono: "mdi-angular",
    titulo: "Categorias",
  },
  {
    id: 14,
    tipo: 2,
    icono: "mdi-vuejs",
    titulo: "Bodegas",
  },
  {
    id: 15,
    tipo: 2,
    icono: "mdi-react",
    titulo: "Marcas de productos",
  },
  {
    id: 16,
    tipo: 2,
    icono: "mdi-bootstrap",
    titulo: "Movimientos",
  },
  {
    id: 17,
    tipo: 2,
    icono: "mdi-ticket-confirmation",
    titulo: "Comrpobantes",
  },
];

export const FUNCIONES_DASHBOARD: any[] = [
  {
    titulo: "Modulo de compras",
    roles: ["Admin", "Empleado"],
    items: [
      {
        id: 1,
        icono: "mdi-cart-plus",
        titulo: "Comprar",
        roles: ["Admin", "Empleado"],
      },
      {
        id: 2,
        icono: "mdi-account-group",
        titulo: "Proveedores",
        roles: ["Admin", "Empleado"],
      },
      {
        id: 3,
        icono: "mdi-cash-minus",
        titulo: "Cuentas por pagar",
        roles: ["Admin", "Empleado"],
      },
    ],
  },
  {
    titulo: "Modulo de ventas",
    rol: ["Admin", "Empleado"],
    items: [
      {
        id: 4,
        icono: "mdi-cash-plus",
        titulo: "Vender",
        roles: ["Admin", "Empleado"],
      },
      {
        id: 5,
        icono: "mdi-account-group",
        titulo: "Clientes",
        roles: ["Admin", "Empleado"],
      },
      {
        id: 6,
        icono: "mdi-cash-plus",
        titulo: "Cuentas por cobrar",
        roles: ["Admin", "Empleado"],
      },
    ],
  },
  {
    titulo: "Modulo de inventario",
    rol: ["Admin", "Empleado"],
    items: [
      {
        id: 7,
        icono: "mdi-shape-plus",
        titulo: "Productos",
        roles: ["Admin", "Empleado"],
      },
      {
        id: 8,
        icono: "mdi-warehouse",
        titulo: "Bodegas",
        roles: ["Admin", "Empleado"],
      },
    ],
  },
  {
    titulo: "Modulo de usuarios",
    rol: ["Admin", "Empleado"],
    items: [
      {
        id: 9,
        icono: "mdi-account-multiple",
        titulo: "Registrar empleados",
        roles: ["Admin", "Empleado"],
      },
      {
        id: 10,
        icono: "mdi-account-multiple",
        titulo: "Actualizar empleados",
        roles: ["Admin", "Empleado"],
      },
      {
        id: 11,
        icono: "mdi-account-multiple",
        titulo: "Cajas",
        roles: ["Admin", "Empleado"],
      },
    ],
  },
  {
    titulo: "Modulo de Desarrolladores",
    rol: ["Admin", "Empleado"],
    items: [
      {
        id: 13,
        icono: "mdi-angular",
        titulo: "Categorias",
        roles: ["Admin", "Empleado"],
      },
      {
        id: 14,
        icono: "mdi-vuejs",
        titulo: "Bodegas",
        roles: ["Admin", "Empleado"],
      },
      {
        id: 15,
        icono: "mdi-react",
        titulo: "Marcas de productos",
        roles: ["Admin", "Empleado"],
      },
      {
        id: 16,
        icono: "mdi-bootstrap",
        titulo: "Movimientos",
        roles: ["Admin", "Empleado"],
      },
      {
        id: 17,
        icono: "mdi-ticket-confirmation",
        titulo: "Comrpobantes",
        roles: ["Admin", "Empleado"],
      },
    ],
  },
];
