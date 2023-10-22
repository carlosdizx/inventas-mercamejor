export class ProductoVenta {
  private readonly bar_code: number;
  private readonly name: string;
  private cantidad: number;
  private readonly sale_price: number;
  private readonly _descuento: number;
  private subtotal: number;

  constructor(
    codigo: number,
    nombre: string,
    cantidad: number,
    precio: number,
    descuento: number
  ) {
    this.bar_code = codigo;
    this.name = nombre;
    this.cantidad = cantidad;
    this.sale_price = precio;
    this._descuento = descuento;
    this.subtotal = precio * cantidad;
  }

  get getCantidad(): number {
    return this.cantidad;
  }

  set setCantidad(value: number) {
    this.cantidad = value;
  }

  get getSubtotal(): number {
    return this.subtotal;
  }

  set setSubtotal(value: number) {
    this.subtotal = value;
  }

  get codigo(): number {
    return this.bar_code;
  }

  get nombre(): string {
    return this.name;
  }

  get precio(): number {
    return this.precio;
  }

  get descuento(): number {
    return this._descuento;
  }
}
