import { Factura } from "@/entity/Factura";
import { AbonoCuentas } from "@/dto/AbonoCuentas";
import { Cliente } from "@/entity/Cliente";
import { Producto } from "@/entity/Producto";

export class CuentaPor {
  private _factura: Factura;
  private _cliente: Cliente | Producto;
  private _consecutivo: string;
  private _abonos: AbonoCuentas[];
  private _fecha: Date;
  private _tipo: string;

  constructor(factura: Factura, cliente: Cliente, consecutivo: string) {
    this._factura = factura;
    this._cliente = cliente;
    this._consecutivo = consecutivo;
    this._abonos = [];
    this._fecha = new Date();
    this._tipo = "por cobrar";
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
}
