import { ETiposContadoCredito } from "./../generals/Constantes";
import { GUARDAR_INVENTARIO } from "./movInventarios";
import { GUARDAR, LISTAR_IN } from "@/services/crud";
import { ICompra } from "@/models/Compra";
import Swal from "sweetalert2";
import { IInventario, IProductosInventario } from "@/models/Inventarios";
import { ACTUALIZAR_UNIDADES_PRODUCTO } from "@/UseCases/ProductosUseCases";
import {
  ICuentaPorPagar,
  EstadoCuentaPorPagar,
} from "@/models/CuentasPorPagar";
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
