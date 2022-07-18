import { Cliente } from "@/entity/Cliente";
import { Producto } from "@/entity/Producto";
import { Factura } from "@/entity/Factura";

export class Venta {
  private readonly _cliente: Cliente;
  private readonly _tipo: string;
  private readonly _productos: Producto[];
  private readonly _factura: Factura;

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
