import { IVenta } from "@/models/Venta";
import { ACTUALIZAR } from "./crud";
import { ETiposContadoCredito } from "./../generals/Constantes";
import { GUARDAR_INVENTARIO } from "./movInventarios";
import { GUARDAR } from "@/services/crud";
import Swal from "sweetalert2";
import { IInventario, IProductosInventario } from "@/models/Inventarios";
import { ACTUALIZAR_UNIDADES_PRODUCTO } from "@/UseCases/ProductosUseCases";
import {
  ICuentaPorPagar,
  EstadoCuentaPorPagar,
} from "@/models/CuentasPorPagar";
import { REGISTRAR_NUEVA_CUENTAPORPAGAR } from "@/services/cuentasxpagar";
import { IProductoCompra } from "@/models/ProductoCompra";

const coleccionVentas = "ventas";

export const REGISTRAR_NUEVA_VENTA = async (
  venta: IVenta
): Promise<boolean> => {
  await GUARDAR(coleccionVentas, venta);
  const inventario: IInventario = {
    fecha_factura: venta.fec_documento,
    created_at: new Date(),
    updated_at: new Date(),
    cedula_nit: venta.doc_cliente,
    nombres: venta.nom_cliente,
    apellidos: venta.ape_cliente,
    tipo_factura: venta.tipo_compra,
    caja: venta.caja,
    productos: venta.ventas.map((pCompra: IProductoCompra) => {
      return {
        bodega: pCompra.bodega,
        codigo_barras: pCompra.cod_barras,
        descripcion: pCompra.descripcion,
        entradas: pCompra.cantidad,
        salidas: 0,
      } as IProductosInventario;
    }),
  };
  await GUARDAR_INVENTARIO(inventario);
  if (venta.tipo_pago === ETiposContadoCredito.CREDITO) {
    const cuentaPorPagar: ICuentaPorPagar = {
      createdAt: new Date(),
      updatedAt: new Date(),
      fecha_compra: venta.fec_documento,
      cedula_proveedor: venta.doc_cliente,
      nom_proveedor: venta.nom_cliente,
      ape_proveedor: venta.ape_cliente,
      codigo_factura: venta.cod_factura,
      valor_total: Number(venta.total),
      valor_debido: Number(venta.total),
      estado: EstadoCuentaPorPagar.PENDIENTE,
    };
    await REGISTRAR_NUEVA_CUENTAPORPAGAR(cuentaPorPagar);
  }
  await ACTUALIZAR_UNIDADES(venta);
  await Swal.fire({
    title: "Compra registrada con éxito",
    icon: "success",
    timer: 1000,
    showConfirmButton: false,
  });
  return true;
};

const ACTUALIZAR_UNIDADES = async (nuevaVenta: IVenta): Promise<void> => {
  for (const itemCompra of nuevaVenta.ventas) {
    await ACTUALIZAR_UNIDADES_PRODUCTO(
      Number(itemCompra.cod_barras),
      itemCompra.cantidad,
      "RESTAR"
    );
  }
};

export const ANULAR_VENTA = async (idCompra: string): Promise<void> => {
  await ACTUALIZAR(coleccionVentas, idCompra, { estado: "Cancelado" });
};
