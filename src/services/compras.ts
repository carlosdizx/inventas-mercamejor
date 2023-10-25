import { ACTUALIZAR } from "./crud";
import { ETiposContadoCredito, PREF_COMPRA } from "./../generals/Constantes";
import { GUARDAR, LISTAR_IN } from "@/services/crud";
import { ICompra } from "@/models/Compra";
import Swal from "sweetalert2";
import { EInventoryState, Inventory } from "@/models/Inventarios";
import { ACTUALIZAR_UNIDADES_PRODUCTO } from "@/UseCases/ProductosUseCases";
import {
  ICuentaPorPagar,
  EstadoCuentaPorPagar,
} from "@/models/CuentasPorPagar";
import { REGISTRAR_NUEVA_CUENTAPORPAGAR } from "@/services/cuentasxpagar";
import { IProductoCompra } from "@/models/ProductoCompra";
import { DocumentData } from "firebase/firestore";

const coleccionCompras = "compras";

export const IS_NUM_FACTURA_EXISTE = async (
  codigoFactura: string
): Promise<boolean> => {
  let existe = false;
  const res = await LISTAR_IN(coleccionCompras, "cod_factura", codigoFactura);
  res.forEach((val: DocumentData) => {
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
  //if (!(await IS_NUM_FACTURA_EXISTE(numeroDeFactura))) {
  await GUARDAR(coleccionCompras, compra);
  const inventario: Inventory = {
    id: "",
    cod_invoice: compra.cod_factura,
    date: compra.fecha_llegada,
    products: compra.compras.map((pCompra: IProductoCompra) => {
      return {
        input: pCompra.cantidad,
        output: 0,
        bar_code: pCompra.cod_barras,
        store: pCompra.bodega,
        description: pCompra.descripcion,
      };
    }),
    created_at: new Date(),
    updated_at: new Date(),
    state: EInventoryState.APROBADO,
  };
  //await GUARDAR_INVENTARIO(inventario);
  if (compra.tipo_compra === ETiposContadoCredito.CREDITO) {
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
      pagos: [],
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
  //  return true;
  //} else {
  //  await Swal.fire({
  //    title: "Número de factura ya existe",
  //    icon: "warning",
  //    timer: 1000,
  //    showConfirmButton: false,
  //  });
  //  return false;
  //}
  return true;
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
