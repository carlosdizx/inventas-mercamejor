import { Producto } from "@/class/Producto";
import { Cliente } from "@/class/Cliente";

export class Factura {
  private _cliente: Cliente;

  private _tipo: string;

  private _productos: Producto[];

  private _subtotal: number;

  private _descuento: number;

  private _total: number;

  constructor(cliente: Cliente, tipo: string, productos: Producto[]) {
    this._cliente = cliente;
    this._tipo = tipo;
    this._productos = productos;
    this._subtotal = 0;
    this._descuento = 0;
    this._total = 0;
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

  get subtotal(): number {
    return this._subtotal;
  }

  get descuento(): number {
    return this._descuento;
  }

  get total(): number {
    return this._total;
  }
}
