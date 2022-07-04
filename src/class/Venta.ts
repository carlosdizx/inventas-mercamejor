import { Cliente } from "@/class/Cliente";
import { Producto } from "@/class/Producto";
import { Factura } from "@/class/Factura";

export class Venta {
  private _cliente: Cliente;
  private _tipo: string;
  private _productos: Producto[];
  private _factura: Factura;

  constructor(cliente: Cliente, tipo: string, productos: Producto[]) {
    this._cliente = cliente;
    this._tipo = tipo;
    this._productos = productos;
    this._factura = new Factura(cliente, tipo, productos);
  }

  get cliente(): Cliente {
    return this._cliente;
  }

  get tipo(): string {
    return this._tipo;
  }

  get productos(): Producto[] {
    return this._productos;
  }
}
