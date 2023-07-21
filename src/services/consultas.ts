import { FIRESTORE } from "../infrastructure/driven-adapters/firebase/config/config";
import { collection, getDocs, query, where } from "firebase/firestore";

const ref = collection(FIRESTORE, "compras");

export const CONSULTAR_COMPRAS: any = async (
  fechaInicial: string,
  fechaFinal: string,
  provIncial: any,
  provFinal: any
) => {
  const fecIni = new Date(fechaInicial);
  const fecFin = new Date(fechaFinal);

  fecFin.setDate(fecFin.getDate() + 1);

  const querys = query(
    ref,
    where("created_at", ">=", new Date(fecIni)),
    where("created_at", "<=", new Date(fecFin))
  );

  const datos: any = await getDocs(querys);
  const res: any = [];
  datos.forEach((doc: any) => {
    const compra = doc.data();
    const products: any = compra.compras;
    if (provIncial !== "") {
      if (
        compra.doc_proveedor >= Number(provIncial) &&
        compra.doc_proveedor <= Number(provFinal)
      ) {
        products.forEach((product: any) => {
          const datDompra = {
            created_at: compra.created_at,
            doc_proveedor: compra.doc_proveedor,
            nombre_proveedor: compra.nombre_proveedor,
            cod_factura: compra.cod_factura,
            tipo_compra: compra.tipo_compra,
            tipo_pago: compra.tipo_pago,
            fecha_pago: compra.fecha_pago,
            fecha_llegada_producto: compra.fecha_llegada_producto,
            codigo_barras: product.codigo_barras,
            descripcion_producto: product.descripcion_producto,
            bodega: product.bodega,
            cantidad: Number(product.cantidad),
            precio_compra: Number(product.precio_compra),
            precio_venta: Number(product.precio_venta),
            impuesto: Number(product.impuesto),
            descuento: Number(product.descuento),
            subtotal: Number(product.subtotal),
          };
          res.push(datDompra);
        });
      }
    } else {
      products.forEach((product: any) => {
        const datDompra = {
          created_at: compra.created_at,
          doc_proveedor: compra.doc_proveedor,
          nombre_proveedor: compra.nombre_proveedor,
          cod_factura: compra.cod_factura,
          tipo_compra: compra.tipo_compra,
          tipo_pago: compra.tipo_pago,
          fecha_pago: compra.fecha_pago,
          fecha_llegada_producto: compra.fecha_llegada_producto,
          codigo_barras: product.codigo_barras,
          descripcion_producto: product.descripcion_producto,
          bodega: product.bodega,
          cantidad: Number(product.cantidad),
          precio_compra: Number(product.precio_compra),
          precio_venta: Number(product.precio_venta),
          impuesto: Number(product.impuesto),
          descuento: Number(product.descuento),
          subtotal: Number(product.subtotal),
        };
        res.push(datDompra);
      });
    }
  });
  return res;
};
