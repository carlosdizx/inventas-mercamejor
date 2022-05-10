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
    roles: ["Admin", "Empleado"],
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
    roles: ["Admin", "Empleado"],
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
    roles: ["Admin"],
    items: [
      {
        id: 9,
        icono: "mdi-account-multiple",
        titulo: "Registrar empleados",
        roles: ["Admin"],
      },
      {
        id: 10,
        icono: "mdi-account-multiple",
        titulo: "Actualizar empleados",
        roles: ["Admin"],
      },
      {
        id: 11,
        icono: "mdi-account-multiple",
        titulo: "Cajas",
        roles: ["Admin"],
      },
    ],
  },
  {
    titulo: "Otros",
    roles: ["Admin", "Empleado"],
    items: [
      {
        id: 13,
        icono: "mdi-shape",
        titulo: "Categorias",
        roles: ["Admin", "Empleado"],
      },
      {
        id: 14,
        icono: "mdi-format-list-bulleted-type",
        titulo: "Marcas de productos",
        roles: ["Admin", "Empleado"],
      },
      {
        id: 15,
        icono: "mdi-clock",
        titulo: "Movimientos",
        roles: ["Admin"],
      },
      {
        id: 16,
        icono: "mdi-ticket-confirmation",
        titulo: "Comrpobantes",
        roles: ["Admin", "Empleado"],
      },
    ],
  },
];
