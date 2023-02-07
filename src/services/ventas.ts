import {
  BORRAR_MOVIMIENTO_INVENTARIO,
  BUSCAR_MOVIMIENTOS_INVENTARIO,
  GUARDAR_MOVIMIENTO_INVENTARIO,
} from "./movInventarios";
import { getFechaDesdeInput } from "@/generals/formats";
import { EDITAR, GUARDAR, LISTAR_IN } from "@/services/crud";
import { ICompra, EstadoCompra } from "@/models/Compra";
import Swal from "sweetalert2";
import { IInventario, IProductosInventario } from "@/models/Inventarios";
import { ACTUALIZAR_UNIDADES_PRODUCTO } from "@/UseCases/ProductosUseCases";
import {
  ICuentaPorPagar,
  EstadoCuentaPorPagar,
} from "@/models/CuentasPorPagar";
import {
  ACTUALIZAR_CUENTA_PAGAR,
  BUSCAR_CUENTA_POR_PAGAR,
  ELIMINAR_CUENTA_PORPAGAR,
  REGISTRAR_NUEVA_CUENTAPORPAGAR,
} from "@/services/cuentasxpagar";
import { PREF_COMPRA } from "@/generals/Constantes";
import { IProductoCompra } from "@/models/ProductoCompra";

const coleccionVentas = "ventas";

export const IS_NUM_FACTURA_VENTA_EXISTE = async (
  codigoFactura: string
): Promise<boolean> => {
  let existe = false;
  const res = await LISTAR_IN(coleccionVentas, "cod_factura", codigoFactura);
  res.forEach((val: any) => {
    if (val.exists) {
      existe = true;
    }
  });
  return existe;
};

export const REGISTRAR_NUEVA_COMPRA = async (
  compra: ICompra
): Promise<boolean> => {
  const numeroDeFactura = PREF_COMPRA + compra.cod_factura;
  if (!(await IS_NUM_FACTURA_VENTA_EXISTE(numeroDeFactura))) {
    const nuevaCompra: ICompra = {
      created_at: new Date(),
      updated_at: new Date(),
      doc_proveedor: compra.doc_proveedor,
      fec_documento: getFechaDesdeInput(String(compra.fec_documento)),
      fecha_pago: getFechaDesdeInput(String(compra.fecha_pago)),
      fecha_llegada: getFechaDesdeInput(String(compra.fecha_llegada)),
      caja: "",
      compras: compra.compras,
      nom_proveedor: compra.nom_proveedor,
      ape_proveedor: compra.ape_proveedor,
      cod_factura: numeroDeFactura,
      tipo_compra: compra.tipo_compra,
      tipo_pago: compra.tipo_pago,
      subtotal: compra.subtotal,
      descuento: compra.descuento,
      impuesto: compra.impuesto,
      total: compra.total,
      estado: EstadoCompra.APROBADO,
    };
    await GUARDAR(coleccionVentas, nuevaCompra);
    const inventarios: Array<IInventario> = [];
    nuevaCompra.compras.forEach((itemCompra) => {
      const inventario: IInventario = {
        fecha_factura: getFechaDesdeInput(String(compra.fec_documento)),
        created_at: new Date(),
        updated_at: new Date(),
        cedula_nit: nuevaCompra.doc_proveedor,
        nombres: nuevaCompra.nom_proveedor,
        apellidos: nuevaCompra.ape_proveedor,
        caja: "",
        tipo_factura: nuevaCompra.tipo_compra,
        productos: compra.compras.map((pCompra: IProductoCompra) => {
          return {
            bodega: pCompra.bodega,
            codigo_barras: pCompra.codigo_barras,
            descripcion: pCompra.descripcion_producto,
            entradas: pCompra.cantidad,
            salidas: 0,
          } as IProductosInventario;
        }),
      };
      inventarios.push(inventario);
    });
    // for (const item of inventarios) {
    //   await GUARDAR_MOVIMIENTO_INVENTARIO(item);
    //   await ACTUALIZAR_UNIDADES_PRODUCTO(
    //     Number(item.codigo_barras),
    //     item.entradas,
    //     "ADICIONAR"
    //   );
    // }
    if (nuevaCompra.tipo_pago === "Credito") {
      const cuentaPorPagar: ICuentaPorPagar = {
        createdAt: new Date(),
        updatedAt: new Date(),
        fecha_compra: getFechaDesdeInput(String(compra.fec_documento)),
        cedula_proveedor: nuevaCompra.doc_proveedor,
        nom_proveedor: nuevaCompra.nom_proveedor,
        ape_proveedor: nuevaCompra.ape_proveedor,
        codigo_factura: numeroDeFactura,
        valor_total: Number(nuevaCompra.total),
        valor_debido: Number(nuevaCompra.total),
        estado: EstadoCuentaPorPagar.PENDIENTE,
      };
      await GUARDAR("cuentas_por_pagar", cuentaPorPagar);
    }
    await Swal.fire({
      title: "Compra registrada con éxito",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
    return true;
  } else {
    await Swal.fire({
      title: "Número de factura ya existe",
      icon: "warning",
      timer: 1000,
      showConfirmButton: false,
    });
    return false;
  }
};

const ACTUALIZAR_MOVIMIENTOS_INVENTARIO_ANTERIORES = async (
  cod_factura: string
): Promise<void> => {
  const movInventarios = await BUSCAR_MOVIMIENTOS_INVENTARIO(cod_factura);
  for (const movimientoInv of movInventarios) {
    await ACTUALIZAR_UNIDADES_PRODUCTO(
      movimientoInv.codigo_barras,
      movimientoInv.entradas,
      "RESTAR"
    );
    await BORRAR_MOVIMIENTO_INVENTARIO(movimientoInv);
  }
};

// const ACTUALIZAR_MOVIMIENTOS_INVENTARIO_NUEVOS = async (
//   nuevaCompra: ICompra,
//   cod_factura: string
// ): Promise<void> => {
//   for (const itemCompra of nuevaCompra.compras) {
//     const inventario: IInventario = {
//       created_at: new Date(),
//       updated_at: new Date(),
//       fecha_factura: getFechaDesdeInput(String(nuevaCompra.fec_documento)),
//       cedula_nit: nuevaCompra.doc_proveedor,
//       nombres: nuevaCompra.nom_proveedor,
//       apellidos: nuevaCompra.ape_proveedor,
//       tipo_factura: nuevaCompra.tipo_compra,
//       documento: cod_factura,
//       bodega: itemCompra.bodega,
//       producto: itemCompra.descripcion_producto,
//       codigo_barras: itemCompra.codigo_barras,
//       salidas: 0,
//       entradas: itemCompra.cantidad,
//       caja: "",
//     };
//     await GUARDAR_MOVIMIENTO_INVENTARIO(inventario);
//     await ACTUALIZAR_UNIDADES_PRODUCTO(
//       Number(inventario.codigo_barras),
//       inventario.entradas,
//       "ADICIONAR"
//     );
//   }
// };

export const ACTUALIZAR_CUENTAS_PAGAR_NUMFACTURA = async (
  nuevaCompra: ICompra,
  compraAnterior: ICompra,
  codFactura: string
): Promise<void> => {
  if (
    nuevaCompra.tipo_pago === "Credito" &&
    compraAnterior.tipo_pago === "Credito"
  ) {
    const cuentaAnterior = await BUSCAR_CUENTA_POR_PAGAR(
      compraAnterior.cod_factura
    );
    const nuevaCuentaPagar: ICuentaPorPagar = {
      updatedAt: new Date(),
      createdAt: cuentaAnterior.cuenta.createdAt,
      fecha_compra: nuevaCompra.fec_documento,
      cedula_proveedor: nuevaCompra.doc_proveedor,
      nom_proveedor: nuevaCompra.nom_proveedor,
      ape_proveedor: nuevaCompra.ape_proveedor,
      codigo_factura: codFactura,
      valor_total: Number(nuevaCompra.total),
      valor_debido:
        nuevaCompra.total -
        (cuentaAnterior.cuenta.valor_total -
          cuentaAnterior.cuenta.valor_debido),
      estado: cuentaAnterior.cuenta.estado,
    };
    await ACTUALIZAR_CUENTA_PAGAR(cuentaAnterior.id, nuevaCuentaPagar);
  } else if (
    nuevaCompra.tipo_pago === "Credito" &&
    compraAnterior.tipo_pago === "Contado"
  ) {
    const nuevaCuentaPagar: ICuentaPorPagar = {
      updatedAt: new Date(),
      createdAt: new Date(),
      fecha_compra: nuevaCompra.fec_documento,
      cedula_proveedor: nuevaCompra.doc_proveedor,
      nom_proveedor: nuevaCompra.nom_proveedor,
      ape_proveedor: nuevaCompra.ape_proveedor,
      codigo_factura: codFactura,
      valor_total: Number(nuevaCompra.total),
      valor_debido: Number(nuevaCompra.total),
      estado: EstadoCuentaPorPagar.PENDIENTE,
    };
    await REGISTRAR_NUEVA_CUENTAPORPAGAR(nuevaCuentaPagar);
  } else if (
    nuevaCompra.tipo_pago === "Contado" &&
    compraAnterior.tipo_pago === "Credito"
  ) {
    const cuentaAnterior = await BUSCAR_CUENTA_POR_PAGAR(
      compraAnterior.cod_factura
    );
    await ELIMINAR_CUENTA_PORPAGAR({
      ...cuentaAnterior.cuenta,
      id: cuentaAnterior.id,
    });
  }
};
