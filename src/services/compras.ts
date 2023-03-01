import { ACTUALIZAR } from "./crud";
import { ETiposContadoCredito, PREF_COMPRA } from "./../generals/Constantes";
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
import { REGISTRAR_NUEVA_CUENTAPORPAGAR } from "@/services/cuentasxpagar";
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
  const numeroDeFactura = PREF_COMPRA + compra.cod_factura;
  if (!(await IS_NUM_FACTURA_EXISTE(numeroDeFactura))) {
    await GUARDAR(coleccionCompras, compra);
    const inventario: IInventario = {
      fecha_factura: compra.fec_documento,
      created_at: new Date(),
      updated_at: new Date(),
      cedula_nit: compra.doc_proveedor,
      nombres: compra.nom_proveedor,
      apellidos: compra.ape_proveedor,
      tipo_factura: compra.tipo_compra,
      caja: compra.caja,
      productos: compra.compras.map((pCompra: IProductoCompra) => {
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
    if (compra.tipo_pago === ETiposContadoCredito.CREDITO) {
      const cuentaPorPagar: ICuentaPorPagar = {
        createdAt: new Date(),
        updatedAt: new Date(),
        fecha_compra: compra.fec_documento,
        cedula_proveedor: compra.doc_proveedor,
        nom_proveedor: compra.nom_proveedor,
        ape_proveedor: compra.ape_proveedor,
        codigo_factura: numeroDeFactura,
        valor_total: Number(compra.total),
        valor_debido: Number(compra.total),
        estado: EstadoCuentaPorPagar.PENDIENTE,
      };
      await REGISTRAR_NUEVA_CUENTAPORPAGAR(cuentaPorPagar);
    }
    await ACTUALIZAR_UNIDADES(compra);
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

const ACTUALIZAR_UNIDADES = async (nuevaCompra: ICompra): Promise<void> => {
  for (const itemCompra of nuevaCompra.compras) {
    await ACTUALIZAR_UNIDADES_PRODUCTO(
      Number(itemCompra.cod_barras),
      itemCompra.cantidad,
      "ADICIONAR"
    );
  }
};

export const ANULAR_COMPRA = async (idCompra: string): Promise<void> => {
  await ACTUALIZAR(coleccionCompras, idCompra, { estado: "Cancelado" });
};
