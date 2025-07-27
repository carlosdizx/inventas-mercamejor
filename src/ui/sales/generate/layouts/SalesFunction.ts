import { Sale } from "@/domain/model/sale/Sale";

export const generatePageToPrint = (
  sale: Sale,
  nameCompany: string
): string => {
  const client =
    sale.sur_client !== ""
      ? "<h4>Cliente: " + sale.nam_client + " " + sale.sur_client + "</h4>"
      : "";
  let elements = "";
  for (const saleOf of sale.sales) {
    elements +=
      "<tr> " +
      "<td>" +
      saleOf.amount +
      "." +
      saleOf.name +
      "</td>" +
      "</tr> " +
      "<tr> " +
      "<td>" +
      saleOf.subtotal +
      "</td>" +
      "</tr>";
  }
  return `
  <div class="factura">
  <div class="encabezado">
    <h3>${nameCompany}</h3>
    <p>Fecha: ${formatearFecha(sale.created_at)}</p>
  </div>
  <div class="detalles">
    <div class="cliente">
      ${client}
    </div>
    <table>
      <thead>
        <tr>
          <th>Productos</th>
        </tr>
      </thead>
      <tbody>${elements}</tbody>
    </table>
  </div>
  <div>
    <p>Total a pagar: ${sale.total}</p>
  </div>
</div>
  `;
};

export const formatearFecha = (fecha: Date) => {
  const day = String(fecha.getDate()).padStart(2, "0");
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const year = fecha.getFullYear();
  const hours = String(fecha.getHours()).padStart(2, "0");
  const minutes = String(fecha.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
