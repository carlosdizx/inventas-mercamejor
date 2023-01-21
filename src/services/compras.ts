import { ETiposContadoCredito } from "./../generals/Constantes";
import {
  BORRAR_MOVIMIENTO_INVENTARIO,
  BUSCAR_MOVIMIENTOS_INVENTARIO,
  GUARDAR_INVENTARIO,
  GUARDAR_MOVIMIENTO_INVENTARIO,
} from "./movInventarios";
import { getFechaDesdeInput } from "@/generals/formats";
import { EDITAR, GUARDAR, LISTAR_IN } from "@/services/crud";
import { ICompra } from "@/models/Compra";
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
import { IProductoCompra } from "@/models/ProductoCompra";

const coleccionCompras = "compras";

export const IS_NUM_FACTURA_EXISTE = async (
  codigoFactura: string
): Promise<boolean> => {
  let existe = false;
  const res = await LISTAR_IN(coleccionCompras, "cod_factura", codigoFactura);
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
  const numeroDeFactura = "C-" + compra.cod_factura;
  if (!(await IS_NUM_FACTURA_EXISTE(numeroDeFactura))) {
    await GUARDAR(coleccionCompras, compra);
    const inventario: IInventario = {
      fecha_factura: compra.fecha_documento,
      created_at: new Date(),
      updated_at: new Date(),
      cedula_nit: compra.documento_proveedor,
      nombres: compra.nombres_proveedor,
      apellidos: compra.apellidos_proveedor,
      tipo_factura: compra.tipo_compra,
      caja: compra.caja,
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
    await GUARDAR_INVENTARIO(inventario);
    if (compra.tipo_pago === ETiposContadoCredito.CONTADO) {
      const cuentaPorPagar: ICuentaPorPagar = {
        createdAt: new Date(),
        updatedAt: new Date(),
        fecha_compra: compra.fecha_documento,
        cedula_proveedor: compra.documento_proveedor,
        nombres_proveedor: compra.nombres_proveedor,
        apellidos_proveedor: compra.apellidos_proveedor,
        codigo_factura: numeroDeFactura,
        valor_total: Number(compra.total),
        valor_debido: Number(compra.total),
        estado: EstadoCuentaPorPagar.PENDIENTE,
      };
      await GUARDAR("cuentas_por_pagar", cuentaPorPagar);
    }
    await ACTUALIZAR_MOVIMIENTOS_INVENTARIO_NUEVOS(compra);
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

const ACTUALIZAR_MOVIMIENTOS_INVENTARIO_NUEVOS = async (
  nuevaCompra: ICompra
): Promise<void> => {
  for (const itemCompra of nuevaCompra.compras) {
    await ACTUALIZAR_UNIDADES_PRODUCTO(
      Number(itemCompra.codigo_barras),
      itemCompra.cantidad,
      "ADICIONAR"
    );
  }
};

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
      fecha_compra: nuevaCompra.fecha_documento,
      cedula_proveedor: nuevaCompra.documento_proveedor,
      nombres_proveedor: nuevaCompra.nombres_proveedor,
      apellidos_proveedor: nuevaCompra.apellidos_proveedor,
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
      fecha_compra: nuevaCompra.fecha_documento,
      cedula_proveedor: nuevaCompra.documento_proveedor,
      nombres_proveedor: nuevaCompra.nombres_proveedor,
      apellidos_proveedor: nuevaCompra.apellidos_proveedor,
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

export const ACTUALIZAR_COMPRA = async (
  nuevaCompra: ICompra,
  compraAnterior: ICompra,
  idCompra: string
): Promise<boolean> => {
  const numeroDeFacturaNuevo = "C-" + nuevaCompra.cod_factura;
  const isNumFacturaAnterior =
    numeroDeFacturaNuevo === compraAnterior.cod_factura;
  if (
    isNumFacturaAnterior ||
    (!isNumFacturaAnterior &&
      !(await IS_NUM_FACTURA_EXISTE(numeroDeFacturaNuevo)))
  ) {
    await ACTUALIZAR_MOVIMIENTOS_INVENTARIO_ANTERIORES(
      compraAnterior.cod_factura
    );
    await ACTUALIZAR_MOVIMIENTOS_INVENTARIO_NUEVOS({ ...nuevaCompra });
    await ACTUALIZAR_CUENTAS_PAGAR_NUMFACTURA(
      nuevaCompra,
      compraAnterior,
      numeroDeFacturaNuevo
    );
    await EDITAR(coleccionCompras, idCompra, nuevaCompra);
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
