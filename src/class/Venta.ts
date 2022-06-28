import { Cliente } from "@/class/Cliente";
import { Producto } from "@/class/Producto";

export class Venta {
  private cliente: Cliente;
  private tipo: string;
  private productos: Producto[];

  constructor(cliente: Cliente, tipo: string, productos: Producto[]) {
    this.cliente = cliente;
    this.tipo = tipo;
    this.productos = productos;
  }

  darCliente(): Cliente {
    return this.cliente;
  }

  darTipo(): string {
    return this.tipo;
  }

  darproductos(): Producto[] {
    return this.productos;
  }
}
