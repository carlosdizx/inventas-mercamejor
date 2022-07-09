export class ProductoVenta {
  private readonly _codigo: number;
  private readonly _nombre: string;
  private _cantidad: number;
  private readonly _precio: number;
  private readonly _descuento: number;
  private _subtotal: number;

  constructor(
    codigo: number,
    nombre: string,
    cantidad: number,
    precio: number,
    descuento: number
  ) {
    this._codigo = codigo;
    this._nombre = nombre;
    this._cantidad = cantidad;
    this._precio = precio;
    this._descuento = descuento;
    this._subtotal = precio * cantidad;
  }

  get cantidad(): number {
    return this._cantidad;
  }

  set cantidad(value: number) {
    this._cantidad = value;
  }

  get subtotal(): number {
    return this._subtotal;
  }

  set subtotal(value: number) {
    this._subtotal = value;
  }

  get codigo(): number {
    return this._codigo;
  }

  get nombre(): string {
    return this._nombre;
  }

  get precio(): number {
    return this._precio;
  }

  get descuento(): number {
    return this._descuento;
  }
}
