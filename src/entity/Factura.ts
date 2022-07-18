import { Producto } from "@/entity/Producto";
import { Cliente } from "@/entity/Cliente";

export class Factura {
  private readonly _cliente: Cliente;

  private readonly _tipo: string;

  private readonly _productos: Producto[];

  private readonly _subtotal: number;

  private readonly _descuento: number;

  private readonly _total: number;

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
