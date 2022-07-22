import { Factura } from "@/entity/Factura";
import { AbonoCuentas } from "@/dto/AbonoCuentas";
import { Cliente } from "@/entity/Cliente";
import { Producto } from "@/entity/Producto";

export const TIPO_COBRAR = "por cobrar";
export const TIPO_PAGAR = "por pagar";
export class CuentaPor {
  private readonly _factura: Factura;
  private readonly _cliente: Cliente | Producto;
  private readonly _consecutivo: string;
  private readonly _abonos: AbonoCuentas[];
  private readonly _fecha: Date;
  private readonly _tipo: string;

  constructor(
    factura: Factura,
    cliente: Cliente,
    consecutivo: string,
    tipo: number
  ) {
    this._factura = factura;
    this._cliente = cliente;
    this._consecutivo = consecutivo;
    this._abonos = [];
    this._fecha = new Date();
    this._tipo = tipo === 1 ? TIPO_COBRAR : TIPO_PAGAR;
  }

  get factura(): Factura {
    return this._factura;
  }

  get cliente(): Cliente | Producto {
    return this._cliente;
  }

  get consecutivo(): string {
    return this._consecutivo;
  }

  get abonos(): AbonoCuentas[] {
    return this._abonos;
  }

  get fecha(): Date {
    return this._fecha;
  }

  get tipo(): string {
    return this._tipo;
  }

  agregarAbono(abono: AbonoCuentas): void {
    this._abonos.push(abono);
  }

  darTotalAbonos(): number {
    let total = 0;
    this._abonos.forEach((abono) => (total += abono.valor));
    return total;
  }

  darTotalDeuda(): string {
    let msg;
    if (this._tipo === TIPO_COBRAR) {
      msg = `El cliente adeuda: ${this._factura.total - this.darTotalAbonos()}`;
    } else {
      msg = `Al proveedor se le adeuda: ${
        this._factura.total - this.darTotalAbonos()
      }`;
    }
    return msg;
  }
}
