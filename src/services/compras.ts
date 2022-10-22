import { EDITAR } from "./crud";
import {
  BORRAR_MOVIMIENTO_INVENTARIO,
  GUARDAR_MOVIMIENTO_INVENTARIO,
} from "./movInventarios";
import { getFechaDesdeInput } from "./../generals/formats";
import { GUARDAR, LISTAR_IN } from "@/services/crud";
import { Compra, EstadoCompra } from "./../interfaces/Compra";
import Swal from "sweetalert2";
import { Inventarios } from "@/models/Inventarios";
import { ACTUALIZAR_UNIDADES_PRODUCTO } from "@/UseCases/ProductosUseCases";
import { CuentaPorPagar, EstadoCuentaPorPagar } from "@/models/CuentasPorPagar";
import { ProductoCompra } from "@/interfaces/ProductoCompra";

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
  compra: Compra
): Promise<boolean> => {
  const numeroDeFactura = "C-" + compra.cod_factura;
  if (!(await IS_NUM_FACTURA_EXISTE(numeroDeFactura))) {
    const nuevaCompra: Compra = {
      created_at: new Date(),
      updated_at: new Date(),
      documento_proveedor: compra.documento_proveedor,
      fecha_documento: getFechaDesdeInput(String(compra.fecha_documento)),
      fecha_pago: getFechaDesdeInput(String(compra.fecha_pago)),
      fecha_llegada_producto: getFechaDesdeInput(
        String(compra.fecha_llegada_producto)
      ),
      compras: compra.compras,
      nombres_proveedor: compra.nombres_proveedor,
      apellidos_proveedor: compra.apellidos_proveedor,
      cod_factura: numeroDeFactura,
      tipo_compra: compra.tipo_compra,
      tipo_pago: compra.tipo_pago,
      subtotal: compra.subtotal,
      descuento: compra.descuento,
      impuesto: compra.impuesto,
      total: compra.total,
      estado: EstadoCompra.APROBADO,
    };
    await GUARDAR(coleccionCompras, nuevaCompra);
    const inventarios: Array<Inventarios> = [];
    nuevaCompra.compras.forEach((itemCompra) => {
      const inventario: Inventarios = {
        created_at: new Date(),
        updated_at: new Date(),
        fecha_factura: getFechaDesdeInput(String(compra.fecha_documento)),
        cedula_nit: nuevaCompra.documento_proveedor,
        nombres: nuevaCompra.nombres_proveedor,
        apellidos: nuevaCompra.apellidos_proveedor,
        tipo_factura: nuevaCompra.tipo_compra,
        documento: numeroDeFactura,
        bodega: itemCompra.bodega,
        producto: itemCompra.descripcion_producto,
        codigo_barras: itemCompra.codigo_barras,
        salidas: 0,
        entradas: itemCompra.cantidad,
        caja: "",
      };
      inventarios.push(inventario);
    });
    for (const item of inventarios) {
      await GUARDAR_MOVIMIENTO_INVENTARIO(item);
      await ACTUALIZAR_UNIDADES_PRODUCTO(
        Number(item.codigo_barras),
        item.entradas,
        "ADICIONAR"
      );
    }
    if (nuevaCompra.tipo_pago === "Credito") {
      const cuentaPorPagar: CuentaPorPagar = {
        createdAt: new Date(),
        updatedAt: new Date(),
        fecha_compra: getFechaDesdeInput(String(compra.fecha_documento)),
        cedula_proveedor: nuevaCompra.documento_proveedor,
        nombres_proveedor: nuevaCompra.nombres_proveedor,
        apellidos_proveedor: nuevaCompra.apellidos_proveedor,
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
  comprasAnteriores: ProductoCompra[],
  cod_factura: string
): Promise<void> => {
  console.log(comprasAnteriores, cod_factura);
};

const ACTUALIZAR_MOVIMIENTOS_INVENTARIO_NUEVOS = async (
  comprasAnteriores: ProductoCompra[],
  cod_factura: string
): Promise<void> => {
  console.log(comprasAnteriores, cod_factura);
};

export const ACTUALIZAR_UNIDADES_PRODUCTOS = async (
  nuevasCompras: ProductoCompra[],
  comprasAnteriores: ProductoCompra[]
): Promise<void> => {
  console.log(nuevasCompras);
  console.log(comprasAnteriores);
  for (const movInv of comprasAnteriores) {
    await BORRAR_MOVIMIENTO_INVENTARIO(movInv);
  }
};

export const ACTUALIZAR_CUENTASXPAGAR_NUMFACTURA = async (
  codFactura: string
): Promise<void> => {
  console.log(codFactura);
};

export const ACTUALIZAR_COMPRA = async (
  nuevaCompra: Compra,
  compraAnterior: Compra
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
      [...compraAnterior.compras],
      compraAnterior.cod_factura
    );
    await ACTUALIZAR_MOVIMIENTOS_INVENTARIO_NUEVOS(
      [...nuevaCompra.compras],
      compraAnterior.cod_factura
    );
    await ACTUALIZAR_CUENTASXPAGAR_NUMFACTURA(nuevaCompra.cod_factura);
    await EDITAR(coleccionCompras, compraAnterior.id, nuevaCompra);
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
