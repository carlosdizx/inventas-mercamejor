import { getFechaDesdeInput } from "./../generals/formats";
import { GUARDAR, LISTAR_IN } from "@/services/crud";
import { Compra, EstadoCompra } from "./../interfaces/Compra";
import Swal from "sweetalert2";
import { Inventarios } from "@/models/Inventarios";
import { ACTUALIZAR_UNIDADES_PRODUCTO } from "@/UseCases/ProductosUseCases";
import { CuentaPorPagar, EstadoCuentaPorPagar } from "@/models/CuentasPorPagar";

export const REGISTRAR_NUEVA_COMPRA = async (
  compra: Compra
): Promise<boolean> => {
  const numeroDeFactura = "C-" + compra.cod_factura;

  let existe = false;
  const res = await LISTAR_IN("compras", "cod_factura", numeroDeFactura);
  res.forEach((val: any) => {
    console.log(val.exists);
    if (val.exists) {
      existe = true;
    }
  });

  if (!existe) {
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
    await GUARDAR("compras", nuevaCompra);
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
      await GUARDAR("inventarios", item);
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

export const ACTUALIZAR_COMPRA = async (
  compra: Compra,
  compraAnterior: Compra
): Promise<void> => {
  const numeroDeFacturaNuevo = "C-" + compra.cod_factura;

  const res = await LISTAR_IN("compras", "cod_factura", numeroDeFacturaNuevo);
  let validacionCodigoFactura = true;
  if (numeroDeFacturaNuevo !== compraAnterior.cod_factura) {
    res.forEach((val: any) => {
      if (val.exist()) {
        console.log(val.exist());
        console.log(2, val.exist);
        validacionCodigoFactura = false;
      }
    });
  }
  if (validacionCodigoFactura) {
    console.log("pasa");
    // const nuevaCompra: Compra = {
    //   created_at: new Date(),
    //   updated_at: new Date(),
    //   documento_proveedor: compra.documento_proveedor,
    //   fecha_documento: getFechaDesdeInput(String(compra.fecha_documento)),
    //   fecha_pago: getFechaDesdeInput(String(compra.fecha_pago)),
    //   fecha_llegada_producto: getFechaDesdeInput(
    //     String(compra.fecha_llegada_producto)
    //   ),
    //   compras: compra.compras,
    //   nombres_proveedor: compra.nombres_proveedor,
    //   apellidos_proveedor: compra.apellidos_proveedor,
    //   cod_factura: numeroDeFactura,
    //   tipo_compra: compra.tipo_compra,
    //   tipo_pago: compra.tipo_pago,
    //   subtotal: compra.subtotal,
    //   descuento: compra.descuento,
    //   impuesto: compra.impuesto,
    //   total: compra.total,
    //   estado: EstadoCompra.APROBADO,
    // };
    // await GUARDAR("compras", nuevaCompra);
    // const inventarios: Array<Inventarios> = [];
    // nuevaCompra.compras.forEach((itemCompra) => {
    //   const inventario: Inventarios = {
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //     fecha_factura: getFechaDesdeInput(String(compra.fecha_documento)),
    //     cedula_nit: nuevaCompra.documento_proveedor,
    //     nombres: nuevaCompra.nombres_proveedor,
    //     apellidos: nuevaCompra.apellidos_proveedor,
    //     tipo_factura: nuevaCompra.tipo_compra,
    //     documento: numeroDeFactura,
    //     bodega: itemCompra.bodega,
    //     producto: itemCompra.descripcion_producto,
    //     codigo_barras: itemCompra.codigo_barras,
    //     salidas: 0,
    //     entradas: itemCompra.cantidad,
    //     caja: "",
    //   };
    //   inventarios.push(inventario);
    // });
    // for (const item of inventarios) {
    //   await GUARDAR("inventarios", item);
    //   await ACTUALIZAR_UNIDADES_PRODUCTO(
    //     Number(item.codigo_barras),
    //     item.entradas,
    //     "ADICIONAR"
    //   );
    // }
    // if (nuevaCompra.tipo_pago === "Credito") {
    //   const cuentaPorPagar: CuentaPorPagar = {
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     fecha_compra: getFechaDesdeInput(String(compra.fecha_documento)),
    //     cedula_proveedor: nuevaCompra.documento_proveedor,
    //     nombres_proveedor: nuevaCompra.nombres_proveedor,
    //     apellidos_proveedor: nuevaCompra.apellidos_proveedor,
    //     codigo_factura: numeroDeFactura,
    //     valor_total: Number(nuevaCompra.total),
    //     valor_debido: Number(nuevaCompra.total),
    //     estado: EstadoCuentaPorPagar.PENDIENTE,
    //   };
    //   await GUARDAR("cuentas_por_pagar", cuentaPorPagar);
    // }
    // await Swal.fire({
    //   title: "Compra registrada con éxito",
    //   icon: "success",
    //   timer: 1000,
    //   showConfirmButton: false,
    // });
  } else {
    await Swal.fire({
      title: "Número de factura ya existe",
      icon: "warning",
      timer: 1000,
      showConfirmButton: false,
    });
  }
};
